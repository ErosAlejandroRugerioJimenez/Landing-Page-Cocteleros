# Publicación de Cocteleros en Vercel

## Repositorio local comprobado
- Origin: https://github.com/ErosAlejandroRugerioJimenez/Landing-Page-Cocteleros.git
- Rama actual: main; seguimiento: origin/main.
- La conexión y rama de producción del panel Vercel requieren confirmación en una sesión autenticada. El remoto local no demuestra por sí solo la configuración del hosting.

## Configuración versionada
vercel.json fija Vite, npm ci, npm run build y salida dist. La raíz en Vercel debe ser la carpeta de este package.json. Quitar overrides antiguos de Angular si contradicen esta configuración.

No utilizar vite build directamente: npm run build comprueba TypeScript, prerenderiza la página y valida el SEO. No hace falta un servidor Node en producción. Esta landing no usa rutas de cliente, por lo que no requiere un rewrite global.

## Archivos
Subir fuentes React, public, scripts, index.html, package.json, package-lock.json, tsconfig.json, vite.config.ts y vercel.json. Git ya ignora node_modules, dist y .prerender; Vercel los genera. No excluir scripts ni src/entry-server.tsx: se utilizan durante el build.

Angular se conserva como respaldo fuera del proyecto y en el historial Git. .gitignore y .vercelignore evitan reincorporar legacy-angular por accidente. Los borrados del antiguo código Angular sí deben formar parte del commit de migración.

## Flujo de publicación
1. Revisar git diff y crear un commit con los cambios de migración, incluidos los borrados de Angular.
2. Subir a una rama de revisión para obtener un Preview del proyecto Vercel existente.
3. Verificar diseño móvil, formulario, edición del resumen, enlaces WhatsApp y consola.
4. Integrar en la rama de producción confirmada en Vercel. No asumir que es main sin revisar el panel.
5. Confirmar https://coctelerostlx.com/, /robots.txt, /sitemap.xml y /img/cocteleros-social-v1.jpg. Revisar la vista previa de WhatsApp después de publicar; puede conservar caché.

Conservar el proyecto y el dominio actuales evita modificar DNS de Namecheap. Comprobar en Vercel que coctelerostlx.com sigue asignado y elegir una sola variante canónica (la configurada es sin www).

El formulario prepara un mensaje y abre WhatsApp; el visitante debe enviarlo. No requiere variables secretas ni backend para ese flujo.
