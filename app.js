const SITE_DEFAULTS = {
  shopDomain: "www.sarkpew1.com",
  storefrontToken: "",
  collectionHandle: "frontpage",
  kicker: "PEW1 2.0 · tienda en borrador",
  title: "SARK PEW1",
  subtitle: "Landing viva para arte, ropa personalizada y piezas limitadas conectadas al storefront de Shopify.",
  primaryCta: "Ver drop",
  secondaryCta: "Ir a tienda",
  studioText: "Mueve el cursor o toca la pantalla: el fondo responde en tiempo real. El panel admin permite cambiar textos, colores, fuentes, dominio Shopify, token Storefront y colección sin editar archivos.",
  displayFont: '"Anton", Impact, sans-serif',
  bodyFont: '"Inter", system-ui, sans-serif',
  bg: "#090909",
  ink: "#f7f3eb",
  accent: "#ff4a2f",
  wallpaperPower: 58
};

const STORAGE_KEY = "pew1-landing-admin";
const FALLBACK_PRODUCTS = [
  { title: "Prenda Personalizada", price: "$19.990 - $49.990", url: "https://www.sarkpew1.com/products/prenda-personalizada" },
  { title: "Obra Original", price: "Edicion unica", url: "https://www.sarkpew1.com/collections/all" },
  { title: "Print PEW1", price: "Drop limitado", url: "https://www.sarkpew1.com/collections/all" },
  { title: "Hoodie ZIP", price: "$49.990", url: "https://www.sarkpew1.com/products/prenda-personalizada" }
];

let state = loadState();

function loadState() {
  try {
    return { ...SITE_DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return { ...SITE_DEFAULTS };
  }
}

function saveState(next) {
  state = { ...state, ...next };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state, null, 2));
  applyState();
}

function applyState() {
  document.documentElement.style.setProperty("--bg", state.bg);
  document.documentElement.style.setProperty("--ink", state.ink);
  document.documentElement.style.setProperty("--accent", state.accent);
  document.documentElement.style.setProperty("--display-font", state.displayFont);
  document.documentElement.style.setProperty("--body-font", state.bodyFont);
  document.documentElement.style.setProperty("--wallpaper-power", state.wallpaperPower);

  document.querySelectorAll("[data-field]").forEach((node) => {
    const key = node.dataset.field;
    if (state[key]) node.textContent = state[key];
  });

  const shopUrl = `https://${state.shopDomain.replace(/^https?:\/\//, "")}`;
  document.querySelectorAll("[data-shop-link]").forEach((link) => { link.href = shopUrl; });
  document.querySelector("[data-cart-link]").href = `${shopUrl}/cart`;
  fillAdminForm();
}

function fillAdminForm() {
  const form = document.querySelector("[data-admin-form]");
  if (!form) return;
  [...form.elements].forEach((field) => {
    if (field.name && state[field.name] !== undefined) field.value = state[field.name];
  });
}

function moneyRange(product) {
  const range = product.priceRange?.minVariantPrice;
  if (!range) return "";
  const amount = Number(range.amount || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: range.currencyCode || "CLP",
    maximumFractionDigits: 0
  });
  return amount;
}

function normalizeProduct(edge) {
  const product = edge.node;
  return {
    title: product.title,
    price: moneyRange(product),
    url: product.onlineStoreUrl || `https://${state.shopDomain}/products/${product.handle}`,
    image: product.featuredImage?.url,
    alt: product.featuredImage?.altText || product.title
  };
}

async function fetchProducts() {
  const status = document.querySelector("[data-status]");
  if (!state.storefrontToken) {
    status.textContent = "Usando fallback local hasta configurar token publico de Storefront API en #admin.";
    return FALLBACK_PRODUCTS;
  }

  const endpoint = `https://${state.shopDomain.replace(/^https?:\/\//, "")}/api/2025-04/graphql.json`;
  const query = `
    query LandingCollection($handle: String!) {
      collection(handle: $handle) {
        products(first: 8) {
          edges {
            node {
              title
              handle
              onlineStoreUrl
              featuredImage { url altText }
              priceRange { minVariantPrice { amount currencyCode } }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": state.storefrontToken
      },
      body: JSON.stringify({ query, variables: { handle: state.collectionHandle } })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    const edges = json.data?.collection?.products?.edges || [];
    if (!edges.length) throw new Error("Coleccion vacia o handle incorrecto");
    status.textContent = `Productos cargados desde ${state.shopDomain}.`;
    return edges.map(normalizeProduct);
  } catch (error) {
    status.textContent = `No pude leer Storefront API (${error.message}). Mostrando fallback local.`;
    return FALLBACK_PRODUCTS;
  }
}

function renderProducts(products) {
  const grid = document.querySelector("[data-products]");
  grid.innerHTML = products.map((product) => `
    <article class="product-card">
      <a class="product-media" href="${product.url}">
        ${product.image ? `<img src="${product.image}" alt="${product.alt || product.title}" loading="lazy">` : `<div class="product-fallback" aria-hidden="true"></div>`}
      </a>
      <div class="product-info">
        <h3>${product.title}</h3>
        <p>${product.price}</p>
        <a class="button ghost" href="${product.url}">Abrir</a>
      </div>
    </article>
  `).join("");
}

function setupAdmin() {
  const panel = document.querySelector("[data-admin-panel]");
  const form = document.querySelector("[data-admin-form]");
  const open = () => panel.classList.add("open");
  const close = () => panel.classList.remove("open");

  if (location.hash === "#admin") open();
  window.addEventListener("hashchange", () => {
    if (location.hash === "#admin") open();
  });
  document.querySelector("[data-admin-link]").addEventListener("click", open);
  document.querySelector("[data-close-admin]").addEventListener("click", close);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const next = Object.fromEntries(new FormData(form).entries());
    saveState(next);
    renderProducts(await fetchProducts());
  });

  document.querySelector("[data-reset]").addEventListener("click", async () => {
    localStorage.removeItem(STORAGE_KEY);
    state = { ...SITE_DEFAULTS };
    applyState();
    renderProducts(await fetchProducts());
  });

  document.querySelector("[data-export]").addEventListener("click", () => {
    document.querySelector("[data-export-box]").value = JSON.stringify(state, null, 2);
  });
}

function setupWallpaper() {
  const canvas = document.getElementById("wallpaper");
  const ctx = canvas.getContext("2d");
  const pointer = { x: .5, y: .5 };
  let time = 0;

  function resize() {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.floor(innerWidth * ratio);
    canvas.height = Math.floor(innerHeight * ratio);
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function move(event) {
    const point = event.touches?.[0] || event;
    pointer.x = point.clientX / innerWidth;
    pointer.y = point.clientY / innerHeight;
  }

  function draw() {
    time += 0.006;
    const power = Number(state.wallpaperPower || 58) / 100;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = state.bg;
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < 18; i += 1) {
      const x = (Math.sin(time + i * 1.7) * .5 + .5) * innerWidth;
      const y = (Math.cos(time * 1.2 + i * 1.13) * .5 + .5) * innerHeight;
      const pullX = (pointer.x * innerWidth - x) * .18 * power;
      const pullY = (pointer.y * innerHeight - y) * .18 * power;
      const radius = 80 + (i % 5) * 36;
      const gradient = ctx.createRadialGradient(x + pullX, y + pullY, 0, x + pullX, y + pullY, radius);
      gradient.addColorStop(0, i % 3 === 0 ? `${state.accent}55` : "rgba(255,255,255,.13)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x + pullX, y + pullY, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = "rgba(255,255,255,.08)";
    ctx.lineWidth = 1;
    for (let y = -80; y < innerHeight + 80; y += 42) {
      ctx.beginPath();
      for (let x = -40; x < innerWidth + 40; x += 24) {
        const wave = Math.sin(x * .012 + time * 3 + y * .02) * 8 * power;
        const py = y + wave + (pointer.y - .5) * 22;
        if (x === -40) ctx.moveTo(x, py);
        else ctx.lineTo(x, py);
      }
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  }

  addEventListener("resize", resize);
  addEventListener("pointermove", move);
  addEventListener("touchmove", move, { passive: true });
  resize();
  draw();
}

async function init() {
  applyState();
  setupAdmin();
  setupWallpaper();
  renderProducts(await fetchProducts());
}

init();
