import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const html = await readFile('dist/index.html', 'utf8');
assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, 'Debe existir un solo h1 en el HTML inicial.');
for (const text of ['Coctelería para', 'Básico', 'Intermedio', 'Premium', 'Galería', 'Tlaxcala']) {
  assert.ok(html.includes(text), `Falta contenido prerenderizado: ${text}`);
}
assert.ok(html.includes('rel="canonical" href="https://coctelerostlx.com/"'));
for (const property of ['og:title', 'og:description', 'og:image', 'og:url', 'og:image:width', 'og:image:height']) {
  assert.equal((html.match(new RegExp(`property="${property}"`, 'g')) || []).length, 1, `Metadato ausente o duplicado: ${property}`);
}
const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert.ok(schema['@graph'].some(node => node['@type'] === 'Service'));
assert.ok(!JSON.stringify(schema).includes('aggregateRating'), 'No publicar puntuaciones no verificadas en datos estructurados.');
const image = await readFile('dist/img/cocteleros-social-v1.jpg');
assert.equal(image[0], 0xff);
assert.equal(image[1], 0xd8);
assert.ok((await stat('dist/img/cocteleros-social-v1.jpg')).size < 500_000);
for (const file of ['robots.txt', 'sitemap.xml']) {
  assert.ok((await readFile(`dist/${file}`, 'utf8')).includes('https://coctelerostlx.com/'));
}
console.log('SEO verificado: HTML, canonical, Open Graph, JSON-LD, imagen, robots y sitemap.');
