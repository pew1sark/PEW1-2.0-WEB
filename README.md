# SARKPEW1 · PEW1 2.0

Landing estática para `home.sarkpew1.com`, conectable a Shopify Storefront API de `www.sarkpew1.com`.

## Deploy

Cada push a `main` ejecuta `.github/workflows/deploy-pages.yml` y publica por GitHub Pages.

## Admin

Abrir:

```txt
https://home.sarkpew1.com/#admin
```

El panel permite editar textos, imágenes, links y secciones visibles de la landing.

- `Editar`: activa edición directa sobre textos e imágenes.
- `Links`: muestra todos los enlaces editables y permite cambiar su destino.
- `Secciones`: permite ocultar, duplicar o quitar secciones.
- `Config`: guarda la configuración para publicar por GitHub API.
- `Publicar`: crea o actualiza `pew1-content.json` en `main`; GitHub Pages publica el cambio automáticamente.
- `Exportar`: descarga `pew1-content.json` como respaldo manual.

Para publicar automático, configura una vez un GitHub token fine-grained con permiso `Contents: Read and write` sobre `pew1sark/SARKPEW1`. El token queda guardado solo en el `localStorage` del navegador del administrador.
