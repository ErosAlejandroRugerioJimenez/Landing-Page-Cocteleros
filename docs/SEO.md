# SEO y vista previa social

Dominio público: https://coctelerostlx.com/

## Implementación
- Título y descripción orientados a coctelería y barras móviles para eventos en Tlaxcala.
- Canonical y Open Graph en el HTML inicial, con URLs absolutas del dominio público.
- Imagen social JPEG de 1200 × 630, diseñada con una fotografía y el nombre del negocio. Se usa JPEG para la vista previa social; las imágenes de la web permanecen en WebP.
- Tarjeta summary_large_image compatible con servicios que leen los metadatos Twitter Card.
- JSON-LD de Organization, WebSite y Service. No se inventan domicilio, horarios, precios, puntuaciones ni reseñas verificadas.
- robots.txt y sitemap.xml con la página principal. Las secciones no son páginas independientes y no generan entradas de sitemap.
- Prerenderizado durante npm run build: el HTML incluye el contenido completo. React hidrata ese HTML para conservar las interacciones. El resultado sigue siendo un despliegue estático en dist.
- Las fuentes y las fotos mantienen sus créditos; la página de créditos está marcada noindex para no competir con la landing.

## Verificar
    npm run build
    npm run preview
    npm run check:seo

El build ejecuta la verificación de HTML, metadatos y archivos de rastreo. No comprueba el dominio publicado ni garantiza posiciones o una vista previa idéntica en todas las versiones de WhatsApp.

## Al publicar
1. Servir dist en https://coctelerostlx.com/ con HTTPS válido. Debe existir acceso público sin inicio de sesión.
2. Revisar /img/cocteleros-social-v1.jpg, /robots.txt y /sitemap.xml y confirmar respuestas HTTP 200 con tipos de contenido correctos.
3. Si se usa www, redirigir permanentemente www hacia la versión canónica sin www.
4. Verificar la propiedad en Google Search Console y enviar https://coctelerostlx.com/sitemap.xml. Requiere acceso del propietario; no se realizó desde esta tarea.
5. Probar el enlace público en un mensaje nuevo de WhatsApp. localhost no es accesible para su rastreador; los cambios pueden tardar en verse por la caché del servicio.
6. Para cambiar la imagen posteriormente, generar un archivo con nombre nuevo y actualizar og:image y twitter:image para evitar reutilizar la imagen anterior en caché.

La vista previa se prepara en el código; solo se puede verificar de extremo a extremo después del despliegue público.
