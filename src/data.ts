export const navigation = [ ['inicio', 'Inicio'], ['nosotros', 'Nosotros'], ['menu', 'Menú'], ['paquetes', 'Paquetes'], ['ubicacion', 'Ubicación'], ['contacto', 'Contacto'] ] as const;
export const events = [
  { title: 'Bodas', image: 'optimized/bodas-800.webp', subtitle: 'Un brindis por su historia', drinks: ['Mojitos', 'Piña Colada', 'Clericot', 'Margarita'] },
  { title: 'XV años', image: 'optimized/xv-800.webp', subtitle: 'Una noche para recordar', drinks: ['Barbies', 'Mojito de fresa', 'Tequila Sunrise', 'Cantaritos'] },
  { title: 'Bautizos', image: 'optimized/bautizos-800.webp', subtitle: 'Celebrar en familia', drinks: ['Limonadas minerales', 'Sin alcohol', 'Shirley Temple', 'Cantaritos'] },
  { title: 'Fiestas privadas', image: 'optimized/fiestas-800.webp', subtitle: 'Tu motivo, nuestra barra', drinks: ['Cantaritos', 'Palomas', 'Mojitos', 'Mojito de Coco'] },
];
export const packages = [
  { name: 'Básico', subtitle: 'Ideal para reuniones pequeñas', people: '50', features: ['2 cocteles a elegir', '2 horas de servicio', 'Barra móvil sencilla', '1 bartender'], ideal: 'cumpleaños · reuniones · eventos familiares', featured: false },
  { name: 'Intermedio', subtitle: 'El más solicitado', people: '100', features: ['4 cocteles a elegir', '3 horas de servicio', 'Barra decorada', 'Shots de bienvenida', '1 bartender + apoyo'], ideal: 'XV años · fiestas · eventos medianos', featured: true },
  { name: 'Premium', subtitle: 'Experiencia más completa', people: '200', features: ['6 cocteles a elegir', '4 horas de servicio', 'Barra decorada premium', 'Cocteles personalizados', 'Shots de bienvenida', 'Opciones sin alcohol', '2 bartenders'], ideal: 'bodas · eventos grandes · celebraciones especiales', featured: false },
];
export const gallery = [ ['coctel-1-960.webp', 'Tequila Sunrise'], ['coctel-2-960.webp', 'Pantera Rosa'], ['coctel-3-960.webp', 'Mojito'], ['coctel-4-960.webp', 'Piña Colada'], ['coctel-55-960.webp', 'Clericot'], ['coctel-6-960.webp', 'Cantaritos'] ] as const;
export function whatsapp(message = 'Hola, quiero cotizar un evento con Cocteleros') { return `https://wa.me/5212461756788?text=${encodeURIComponent(message)}`; }
