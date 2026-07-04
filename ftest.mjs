import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errs = [];
page.on('pageerror', e => errs.push(String(e).slice(0,100)));
await page.goto('http://127.0.0.1:8781/final.html', { waitUntil: 'load' });
await page.waitForTimeout(8000);
const r = await page.evaluate(() => {
  const root = document.querySelector('[data-content-root]');
  const orden = root ? [...root.children]
    .filter(el => (el.hasAttribute('data-edsec')||el.hasAttribute('data-pew1-fixed-banner')) && getComputedStyle(el).display!=='none')
    .map(el => el.getAttribute('data-edsec')||'banner') : [];
  return {
    errBoxVisible: !!document.getElementById('__bundler_err'),
    react: !!window.React, canvas: !!document.querySelector('canvas'),
    orden,
    sarkpew1: [...document.querySelectorAll('h2')].some(h=>h.textContent.trim()==='SARKPEW1'),
    presentacion: document.body.innerText.includes('trayectoria internacional en Chile, Argentina, Brasil'),
    ctaHero: document.body.innerText.includes('Ver obras originales'),
    reviews: document.body.innerText.includes('Encargué un retrato') || document.body.innerText.includes('mural transformó'),
    plantillas: /\{\{\s*\w/.test(document.body.innerText),
  };
});
console.log(JSON.stringify(r,null,1));
console.log('pageerrors:', errs.length?errs.slice(0,4):'NINGUNO');
await page.screenshot({ path: 'final-shot.png', fullPage: true });
await browser.close();
