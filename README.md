# Cocteleros

Landing migrada de Angular a React + TypeScript + Vite + Tailwind CSS.

    npm install
    npm run dev

`npm run build` verifica TypeScript y genera `dist`. `npm run preview` sirve esa compilación localmente.

Consulta `docs/MIGRACION.md` para las equivalencias, decisiones y cambios de despliegue.

## SEO y compartir enlaces
El build prerenderiza la landing y ejecuta las comprobaciones SEO. Consulta docs/SEO.md para el dominio, los metadatos, la imagen social y los pasos de publicación. npm run check:seo repite la verificación de dist.


## Vercel
Configuración de producción en vercel.json. Pasos y comprobaciones en docs/VERCEL.md. El respaldo de Angular está fuera de este proyecto.

