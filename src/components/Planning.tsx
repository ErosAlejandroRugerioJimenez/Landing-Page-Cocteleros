import { ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';

const steps = [
  ['Cuéntanos tu idea', 'Comparte fecha, lugar, tipo de evento y número de invitados.'],
  ['Elige tu experiencia', 'Revisa los paquetes y cuéntanos qué cocteles y estilo de barra buscas.'],
  ['Confirma los detalles', 'Consulta disponibilidad y cotización por WhatsApp antes de reservar.'],
];
const questions = [
  ['¿Qué tipo de eventos atienden?', 'Bodas, XV años, bautizos, cumpleaños, reuniones, fiestas privadas y eventos empresariales.'],
  ['¿En dónde dan servicio?', 'En Tlaxcala y alrededores. Compártenos la ubicación de tu evento para confirmar cobertura y cotización.'],
  ['¿Tienen opciones sin alcohol?', 'Sí. Hay opciones sin alcohol en nuestras recomendaciones para eventos y están incluidas en el paquete Premium. Consulta cuáles se pueden adaptar a tu celebración.'],
  ['¿Cuántas horas dura el servicio?', 'El paquete Básico contempla 2 horas, Intermedio 3 horas y Premium 4 horas. Consulta directamente cualquier ajuste que necesites.'],
  ['¿Cómo sé cuánto cuesta mi evento?', 'Comparte la fecha, ubicación, número de invitados y paquete de interés por WhatsApp para solicitar una cotización. La página no confirma precios ni disponibilidad.'],
];
export function Planning() {
  return <section className="section-space bg-cream text-pine" aria-labelledby="planning-title"><div className="page-width"><p className="eyebrow">De la idea al brindis</p><h2 id="planning-title" className="section-title max-w-2xl">Organizarlo puede ser así de sencillo.</h2><ol className="mt-12 grid gap-8 md:grid-cols-3">{steps.map(([title, text], index) => <li key={title} className="border-t border-pine/20 pt-6"><span className="font-display text-5xl text-[#82602e]">0{index + 1}</span><h3 className="mt-5 font-display text-2xl">{title}</h3><p className="mt-3 max-w-sm text-sm leading-7 text-pine/70">{text}</p></li>)}</ol></div></section>;
}
export function FAQ() {
  return <section id="preguntas" className="section-space border-t border-cream/10"><div className="page-width grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div><SectionHeading eyebrow="Antes de brindar" title="¿Algo más que quieras saber?" description="Resolvemos las primeras dudas para que planees tu evento con más claridad." /><a href="/" data-section="contacto" className="inline-block border-b border-gold/40 pb-2 text-sm text-gold">Hablemos de tu evento <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.75} className="inline-block shrink-0 align-middle" /></a></div><div>{questions.map(([question, answer]) => <details key={question} className="group border-b border-cream/15 py-5 first:border-t"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-base font-medium"><span>{question}</span><span aria-hidden="true" className="text-2xl text-gold transition-transform group-open:rotate-45">+</span></summary><p className="max-w-xl pb-2 pt-3 text-sm leading-7 text-muted">{answer}</p></details>)}</div></div></section>;
}
