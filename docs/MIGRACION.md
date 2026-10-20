# Caso práctico: Angular → React

## Qué conserva la migración
Las siete secciones de contenido, los cuatro tipos de eventos, los tres paquetes completos, las seis fotos de galería, el logo, el mapa y los contactos originales. Todas las imágenes originales permanecen en public/img.

## Equivalencias
| Angular | React |
| --- | --- |
| bootstrapApplication(App) | createRoot(...).render(<App />) |
| templateUrl y clase @Component | Función que devuelve JSX |
| *ngFor | array.map(), con key estable |
| (click) | onClick |
| [class.activo] | className calculado a partir del estado |
| menuAbierto | useState(false) |
| @HostListener('window:scroll') | useEffect con addEventListener y limpieza |
| SCSS por componente | Utilidades Tailwind y tokens en @theme |
| Angular CLI | Vite |

## Decisiones
React controla el estado del menú y limpia los listeners cuando se desmonta el componente. Los datos repetidos se centralizan en src/data.ts. Los componentes de sección permanecen en App.tsx y la navegación y encabezados reutilizables tienen archivos propios.

Se usan anclas nativas porque es una landing de una sola página. No necesita router ni estado global. El loader original ocultaba el contenido durante tres segundos: se elimina para dar acceso inmediato. Se sustituyen AOS y Font Awesome por transiciones CSS y símbolos simples, sin dependencias adicionales. Se respeta la preferencia de movimiento reducido.

El diseño usa verde muy oscuro, crema y dorado, tipografía editorial, tarjetas adaptables y botones de cotización por paquete. El cambio visual es una decisión de diseño, no un efecto automático de React.

## Cambio en despliegue
Angular estaba configurado con SSR y Express. Esta versión genera una SPA estática en dist con Vite: no incluye servidor Node ni SSR. Se mantiene el título y la descripción en index.html; el contenido se renderiza en el navegador. Si se requiere HTML completo por petición para SEO, será necesario añadir prerenderizado o una solución SSR.

## Pendientes de negocio
Se conserva TikTok con su URL original genérica; reemplazarla cuando exista un perfil confirmado. Las fuentes de Google y el mapa requieren conexión. No hay backend ni envío de formularios: las cotizaciones abren WhatsApp.

## Cómo ejecutarlo
Requiere Node.js 22.14 o compatible con las versiones instaladas.

    npm install
    npm run dev
    npm run build
    npm run preview

El respaldo de Angular se movió fuera de la raíz del proyecto. Git conserva también la versión anterior en su historial. La carpeta legacy-angular está excluida como protección; el despliegue publica únicamente dist.

## Verificación realizada
- TypeScript y compilación de producción correctos.
- npm audit: 0 vulnerabilidades después de actualizar dependencias compatibles.
- Inspección visual de escritorio y móvil (390 px), navegación por anclas y apertura/cierre del menú móvil.
- No se enviaron mensajes a WhatsApp ni se publicó el sitio.


## Mejoras posteriores a la migración
- Cotización guiada con estado React: invitados, fecha opcional, tipo, ubicación y paquete. La recomendación usa capacidad; no garantiza disponibilidad. Se muestra el mensaje antes de abrir WhatsApp y no se envía automáticamente.
- Galería con dialog nativo, navegación entre imágenes, Escape y recuperación del foco.
- Preguntas frecuentes con details nativo y pasos para solicitar servicio.
- Sección de opiniones con ejemplos explícitamente etiquetados; reemplazarlos por testimonios autorizados antes de usarlos como prueba social.
- Navegación activa y apertura directa de secciones mediante hash.
- Compilación comprobada y prueba del formulario con 80 invitados: recomendación Intermedio y mensaje preparado correctamente. Visor de fotos comprobado en navegador.


## Prerenderizado añadido
La versión actual genera HTML completo durante npm run build y lo hidrata con React en el navegador. Esto actualiza la decisión inicial de SPA sin HTML prerenderizado. El hosting continúa sirviendo archivos estáticos desde dist; no requiere un proceso de servidor React en producción.


