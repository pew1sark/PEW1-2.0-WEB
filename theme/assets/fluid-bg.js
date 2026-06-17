/* PEW1 — Liquid paint background.
   Compact GPU fluid simulation (stable-fluids / Navier-Stokes splat+advect+project).
   Subtle oil-marbling in spray-orange over a near-black navy base.
   Exposes window.PEW1Fluid.init(canvas, opts) -> { destroy }.
   Falls back gracefully (returns null) if WebGL is unavailable. */
(function () {
  'use strict';

  function init(canvas, opts) {
    opts = opts || {};
    const params = {
      SIM_RESOLUTION: opts.simRes || 128,
      DYE_RESOLUTION: opts.dyeRes || 512,
      DENSITY_DISSIPATION: opts.densityDissipation != null ? opts.densityDissipation : 0.985,
      VELOCITY_DISSIPATION: opts.velocityDissipation != null ? opts.velocityDissipation : 0.992,
      PRESSURE: 0.8,
      PRESSURE_ITERATIONS: 18,
      CURL: opts.curl != null ? opts.curl : 22,
      SPLAT_RADIUS: opts.splatRadius != null ? opts.splatRadius : 0.0022,
      SPLAT_FORCE: opts.splatForce != null ? opts.splatForce : 4200,
    };
    // Spray-orange ink, mixed toward bone-white. RGB 0..1 (pre-scaled small for subtlety).
    const INK = opts.ink || [1.0, 0.48, 0.0];
    const INK_HI = opts.inkHi || [1.0, 0.86, 0.62];

    const dpr = Math.min(window.devicePixelRatio || 1, opts.maxDPR || 1.5);

    let gl, ext;
    const glParams = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
    gl = canvas.getContext('webgl2', glParams);
    const isWebGL2 = !!gl;
    if (!gl) gl = canvas.getContext('webgl', glParams) || canvas.getContext('experimental-webgl', glParams);
    if (!gl) return null;

    function getExtensions() {
      let halfFloat, supportLinearFiltering;
      if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
      } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
      }
      const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : (halfFloat && halfFloat.HALF_FLOAT_OES);
      return { halfFloatTexType, supportLinearFiltering };
    }
    ext = getExtensions();
    const texType = ext.halfFloatTexType || gl.UNSIGNED_BYTE;

    function getFormat(internalFormat, format) {
      if (!isWebGL2) return { internalFormat: gl.RGBA, format: gl.RGBA };
      return { internalFormat, format };
    }
    const rgba = getFormat(isWebGL2 ? gl.RGBA16F : gl.RGBA, gl.RGBA);
    const rg = getFormat(isWebGL2 ? gl.RG16F : gl.RGBA, isWebGL2 ? gl.RG : gl.RGBA);
    const r = getFormat(isWebGL2 ? gl.R16F : gl.RGBA, isWebGL2 ? gl.RED : gl.RGBA);
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    // ---- shader plumbing ----
    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn('PEW1Fluid shader error:', gl.getShaderInfoLog(s));
      }
      return s;
    }
    function program(vs, fs) {
      const p = gl.createProgram();
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.linkProgram(p);
      const uniforms = {};
      const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) {
        const name = gl.getActiveUniform(p, i).name;
        uniforms[name] = gl.getUniformLocation(p, name);
      }
      return { program: p, uniforms };
    }
    const PREC = isWebGL2 ? '#version 300 es\n' : '';
    function vsrc(body) { return PREC + (isWebGL2 ? body.replace(/attribute/g, 'in').replace(/varying/g, 'out') : body); }
    function fsrc(body) {
      if (!isWebGL2) return body;
      var converted = body
        .replace(/varying/g, 'in')
        .replace(/texture2D/g, 'texture')
        .replace(/gl_FragColor/g, 'fragColor');
      // declare fragColor right after the first precision line
      if (/precision\s+mediump\s+float;/.test(converted)) {
        converted = converted.replace(/precision\s+mediump\s+float;/, 'precision mediump float;\nout vec4 fragColor;');
      } else if (/precision\s+highp\s+float;/.test(converted)) {
        converted = converted.replace(/precision\s+highp\s+float;/, 'precision highp float;\nout vec4 fragColor;');
      } else {
        converted = 'out vec4 fragColor;\n' + converted;
      }
      return PREC + converted;
    }

    const baseVert = compile(gl.VERTEX_SHADER, vsrc(`
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform vec2 texelSize;
      void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }`));

    const copyProg = program(baseVert, compile(gl.FRAGMENT_SHADER, fsrc(`
      precision mediump float; varying vec2 vUv; uniform sampler2D uTexture;
      void main () { gl_FragColor = texture2D(uTexture, vUv); }`)));

    const splatProg = program(baseVert, compile(gl.FRAGMENT_SHADER, fsrc(`
      precision highp float; varying vec2 vUv;
      uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color;
      uniform vec2 point; uniform float radius;
      void main () {
        vec2 p = vUv - point.xy; p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
      }`)));

    const advectionProg = program(baseVert, compile(gl.FRAGMENT_SHADER, fsrc(`
      precision highp float; varying vec2 vUv;
      uniform sampler2D uVelocity; uniform sampler2D uSource;
      uniform vec2 texelSize; uniform float dt; uniform float dissipation;
      void main () {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
      }`)));

    const divergenceProg = program(baseVert, compile(gl.FRAGMENT_SHADER, fsrc(`
      precision mediump float; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }`)));

    const curlProg = program(baseVert, compile(gl.FRAGMENT_SHADER, fsrc(`
      precision mediump float; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }`)));

    const vorticityProg = program(baseVert, compile(gl.FRAGMENT_SHADER, fsrc(`
      precision highp float; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt;
      void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;
        vec2 vel = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
      }`)));

    const pressureProg = program(baseVert, compile(gl.FRAGMENT_SHADER, fsrc(`
      precision mediump float; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform sampler2D uPressure; uniform sampler2D uDivergence;
      void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }`)));

    const gradientProg = program(baseVert, compile(gl.FRAGMENT_SHADER, fsrc(`
      precision mediump float; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform sampler2D uPressure; uniform sampler2D uVelocity;
      void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
      }`)));

    // Final display: dye over navy base, with vignette so text stays legible.
    const displayProg = program(baseVert, compile(gl.FRAGMENT_SHADER, fsrc(`
      precision highp float; varying vec2 vUv;
      uniform sampler2D uTexture; uniform vec3 baseA; uniform vec3 baseB; uniform float intensity;
      void main () {
        vec3 dye = texture2D(uTexture, vUv).rgb;
        // base gradient navy
        vec3 base = mix(baseA, baseB, clamp(vUv.y * 0.9 + 0.05, 0.0, 1.0));
        float a = clamp(max(dye.r, max(dye.g, dye.b)) * intensity, 0.0, 1.0);
        vec3 col = base + dye * intensity;
        // radial vignette toward center keeps mid-screen calm
        float d = distance(vUv, vec2(0.5));
        col *= (1.0 - 0.28 * smoothstep(0.2, 0.95, d));
        gl_FragColor = vec4(col, 1.0);
      }`)));

    // ---- geometry ----
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    const elem = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elem);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    function blit(target) {
      if (target == null) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    function createFBO(w, h, internalFormat, format, type, filter) {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const texelSizeX = 1.0 / w, texelSizeY = 1.0 / h;
      return {
        texture, fbo, width: w, height: h, texelSizeX, texelSizeY,
        attach(id) { gl.activeTexture(gl.TEXTURE0 + id); gl.bindTexture(gl.TEXTURE_2D, texture); return id; }
      };
    }
    function createDoubleFBO(w, h, internalFormat, format, type, filter) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, filter);
      let fbo2 = createFBO(w, h, internalFormat, format, type, filter);
      return {
        width: w, height: h, texelSizeX: fbo1.texelSizeX, texelSizeY: fbo1.texelSizeY,
        get read() { return fbo1; }, set read(v) { fbo1 = v; },
        get write() { return fbo2; }, set write(v) { fbo2 = v; },
        swap() { const t = fbo1; fbo1 = fbo2; fbo2 = t; }
      };
    }

    let dye, velocity, divergence, curlFBO, pressure;
    function initFramebuffers() {
      const simRes = getResolution(params.SIM_RESOLUTION);
      const dyeRes = getResolution(params.DYE_RESOLUTION);
      dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
      velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
      divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      curlFBO = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    }
    function getResolution(resolution) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
      const min = Math.round(resolution);
      const max = Math.round(resolution * aspectRatio);
      if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min };
      return { width: min, height: max };
    }

    function resize() {
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        initFramebuffers();
      }
    }
    canvas.width = Math.max(2, Math.floor(canvas.clientWidth * dpr));
    canvas.height = Math.max(2, Math.floor(canvas.clientHeight * dpr));
    initFramebuffers();

    // ---- sim steps ----
    function step(dt) {
      gl.disable(gl.BLEND);

      gl.useProgram(curlProg.program);
      gl.uniform2f(curlProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(curlProg.uniforms.uVelocity, velocity.read.attach(0));
      blit(curlFBO);

      gl.useProgram(vorticityProg.program);
      gl.uniform2f(vorticityProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(vorticityProg.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityProg.uniforms.uCurl, curlFBO.attach(1));
      gl.uniform1f(vorticityProg.uniforms.curl, params.CURL);
      gl.uniform1f(vorticityProg.uniforms.dt, dt);
      blit(velocity.write); velocity.swap();

      gl.useProgram(divergenceProg.program);
      gl.uniform2f(divergenceProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(divergenceProg.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);

      gl.useProgram(pressureProg.program);
      gl.uniform2f(pressureProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(pressureProg.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < params.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProg.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write); pressure.swap();
      }

      gl.useProgram(gradientProg.program);
      gl.uniform2f(gradientProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gradientProg.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradientProg.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write); velocity.swap();

      gl.useProgram(advectionProg.program);
      gl.uniform2f(advectionProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(advectionProg.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProg.uniforms.uSource, velocity.read.attach(0));
      gl.uniform1f(advectionProg.uniforms.dt, dt);
      gl.uniform1f(advectionProg.uniforms.dissipation, params.VELOCITY_DISSIPATION);
      blit(velocity.write); velocity.swap();

      gl.uniform1i(advectionProg.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProg.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(advectionProg.uniforms.dissipation, params.DENSITY_DISSIPATION);
      blit(dye.write); dye.swap();
    }

    function splat(x, y, dx, dy, color) {
      gl.useProgram(splatProg.program);
      gl.uniform1i(splatProg.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatProg.uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(splatProg.uniforms.point, x, y);
      gl.uniform3f(splatProg.uniforms.color, dx, dy, 0.0);
      gl.uniform1f(splatProg.uniforms.radius, params.SPLAT_RADIUS);
      blit(velocity.write); velocity.swap();

      gl.uniform1i(splatProg.uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(splatProg.uniforms.color, color[0], color[1], color[2]);
      blit(dye.write); dye.swap();
    }

    function render() {
      gl.disable(gl.BLEND);
      gl.useProgram(displayProg.program);
      gl.uniform1i(displayProg.uniforms.uTexture, dye.read.attach(0));
      gl.uniform3f(displayProg.uniforms.baseA, 0.0196, 0.0235, 0.039); // #05060A
      gl.uniform3f(displayProg.uniforms.baseB, 0.039, 0.059, 0.18);    // #0A0F2E
      gl.uniform1f(displayProg.uniforms.intensity, opts.intensity != null ? opts.intensity : 0.62);
      blit(null);
    }

    // ---- pointer + ambient drift ----
    let pointer = { x: 0.5, y: 0.5, dx: 0, dy: 0, moved: false };
    function inkColor(t) {
      const c = [
        INK[0] * (1 - t) + INK_HI[0] * t,
        INK[1] * (1 - t) + INK_HI[1] * t,
        INK[2] * (1 - t) + INK_HI[2] * t,
      ];
      const s = 0.26; // keep ink subtle
      return [c[0] * s, c[1] * s, c[2] * s];
    }
    function onMove(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = 1.0 - (clientY - rect.top) / rect.height;
      pointer.dx = (x - pointer.x) * params.SPLAT_FORCE;
      pointer.dy = (y - pointer.y) * params.SPLAT_FORCE;
      pointer.x = x; pointer.y = y; pointer.moved = true;
    }
    const mm = (e) => onMove(e.clientX, e.clientY);
    const tm = (e) => { if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY); };
    window.addEventListener('mousemove', mm, { passive: true });
    window.addEventListener('touchmove', tm, { passive: true });

    // seed a few splats so it isn't empty at load
    function seed() {
      for (let i = 0; i < 5; i++) {
        const x = 0.18 + Math.random() * 0.64;
        const y = 0.18 + Math.random() * 0.64;
        const ang = Math.random() * Math.PI * 2;
        splat(x, y, Math.cos(ang) * 1200, Math.sin(ang) * 1200, inkColor(Math.random() * 0.5));
      }
    }
    seed();

    // ambient slow wandering source (alive but calm even when mouse idle)
    let t0 = performance.now();
    let ambientTimer = 0;
    let lastTime = performance.now();
    let running = true, rafId = null;

    function frame(now) {
      if (!running) return;
      let dt = (now - lastTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastTime = now;
      resize();

      // pointer-driven ink
      if (pointer.moved) {
        const speed = Math.min(1, Math.hypot(pointer.dx, pointer.dy) / 3000);
        splat(pointer.x, pointer.y, pointer.dx, pointer.dy, inkColor(0.3 + speed * 0.6));
        pointer.moved = false;
      }
      // ambient drift — a slow lissajous wander injecting gentle ink
      ambientTimer += dt;
      if (ambientTimer > 0.55) {
        ambientTimer = 0;
        const tt = (now - t0) * 0.00009;
        const ax = 0.5 + 0.32 * Math.sin(tt * 1.3) * Math.cos(tt * 0.5);
        const ay = 0.5 + 0.30 * Math.sin(tt * 0.9 + 1.4);
        const fx = Math.cos(tt * 2.1) * 520;
        const fy = Math.sin(tt * 1.7) * 520;
        splat(ax, ay, fx, fy, inkColor(0.2));
      }

      step(dt);
      render();
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    function onVisibility() {
      if (document.hidden) { running = false; if (rafId) cancelAnimationFrame(rafId); }
      else if (!running) { running = true; lastTime = performance.now(); rafId = requestAnimationFrame(frame); }
    }
    document.addEventListener('visibilitychange', onVisibility);

    return {
      destroy() {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
        window.removeEventListener('mousemove', mm);
        window.removeEventListener('touchmove', tm);
        document.removeEventListener('visibilitychange', onVisibility);
        const lose = gl.getExtension('WEBGL_lose_context');
        if (lose) lose.loseContext();
      }
    };
  }

  window.PEW1Fluid = { init };
})();
