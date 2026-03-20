# Portfolio Performance Notes

## Image Optimization

Generate responsive AVIF and WEBP assets:

```bash
npm run optimize:images
```

Generated files are stored in public folders and referenced via URL strings so they are not bundled into the initial JavaScript chunk.

## Optional CDN Delivery

Set a CDN base URL to serve all optimized images from a transformer/CDN endpoint:

```bash
VITE_IMAGE_CDN_BASE=https://cdn.example.com
```

If unset, assets are served from the local public directory.

## Build Compression

The Vite build now emits precompressed gzip and brotli assets. Configure your host to serve .br first, then .gz, and enable long cache lifetimes for hashed assets.

## Fonts

Keep typography lightweight: use one font family and at most one or two weights to reduce render-blocking CSS and font transfer size.
