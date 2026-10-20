import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import SectionHeading from './SectionHeading';
import { whatsapp } from '../data';

const samples = [
  { name: 'Sofía N.', initials: 'SN', occasion: 'Boda', quote: '¡Todo estuvo muy bueno! Los cocteles estaban deliciosos y nuestros invitados quedaron encantados.' },
  { name: 'Daniela M.', initials: 'DM', occasion: 'XV años', quote: 'Nos encantó la barra y la atención. Los mojitos fueron los favoritos de la fiesta. ¡Muchas gracias!' },
  { name: 'Carlos R.', initials: 'CR', occasion: 'Celebración familiar', quote: 'Muy buen servicio y bebidas riquísimas. Le dieron un toque especial a nuestra reunión.' },
];

export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  return <section id="opiniones" className="section-space border-y border-cream/10 bg-sage"><div className="page-width"><div className="flex flex-wrap items-end justify-between gap-6"><SectionHeading eyebrow="Historias alrededor de la barra" title="Lo que nuestros clientes dicen" description="Cada celebración tiene su propia historia." /></div><div className="grid gap-6 lg:grid-cols-3">{samples.map((sample, index) => <motion.figure initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.08 }} key={sample.occasion} className="flex flex-col rounded-2xl border border-cream/15 bg-pine/40 p-7 sm:p-8"><div role="img" aria-label="5 de 5 estrellas" className="flex items-center justify-between gap-4"><span aria-hidden="true" className="text-xl tracking-[.18em] text-gold">★★★★★</span></div><blockquote className="mt-4 flex-1 font-display text-2xl leading-relaxed text-cream/90">{sample.quote}</blockquote><figcaption className="mt-8 border-t border-cream/15 pt-5"><div className="flex items-center gap-3"><span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-sm font-semibold text-gold">{sample.initials}</span><div><span className="block text-base font-semibold text-cream">{sample.name}</span><span className="mt-1 block text-xs text-gold">{sample.occasion}</span></div></div></figcaption></motion.figure>)}</div><div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-cream/15 pt-7"><p className="text-sm text-muted">¿Ya brindaste con nosotros? Nos encantará conocer tu experiencia.</p><a href={whatsapp('Hola, celebré un evento con Cocteleros y quiero compartir mi experiencia.')} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-6 text-sm text-gold">Compartir mi experiencia <span aria-hidden="true"><ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.75} className="inline-block shrink-0 align-middle" /></span></a></div></div></section>;
}


