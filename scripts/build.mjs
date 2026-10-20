import { build } from 'vite';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Genera archivos estáticos: el hosting no necesita ejecutar un servidor Node.
await build();
await build({
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: '.prerender',
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } },
  },
});
const { render } = await import(pathToFileURL(resolve('.prerender/entry-server.mjs')).href);
const file = resolve('dist/index.html');
const template = await readFile(file, 'utf8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error('No se encontró el contenedor para prerenderizar.');
await writeFile(file, template.replace(marker, () => `<div id="root">${render()}</div>`));
console.log('HTML prerenderizado para buscadores y vista previa social.');
await import('./verify-seo.mjs');
