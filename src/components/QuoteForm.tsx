import { motion, useReducedMotion } from 'motion/react';
import { useId, useLayoutEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { packages, whatsapp } from '../data';
import SelectField from './SelectField';
import DateField from './DateField';
import { Heart, Sparkles, Flower2, CakeSlice, PartyPopper, BriefcaseBusiness, Plus, WandSparkles, GlassWater, Martini, Crown, ArrowUpRight, ArrowLeft } from 'lucide-react';

const eventOptions = [
  { value: 'Boda', description: 'Un brindis por su historia', icon: Heart },
  { value: 'XV años', description: 'Una noche para recordar', icon: Sparkles },
  { value: 'Bautizo', description: 'Para celebrar en familia', icon: Flower2 },
  { value: 'Cumpleaños', description: 'Una vuelta más al sol', icon: CakeSlice },
  { value: 'Fiesta privada', description: 'Tu motivo, nuestra barra', icon: PartyPopper },
  { value: 'Evento empresarial', description: 'Un encuentro especial', icon: BriefcaseBusiness },
  { value: 'Otro', description: 'Cuéntanos qué estás planeando', icon: Plus },
];
const packageOptions = [
  { value: 'Ayúdenme a elegir', description: 'Encontramos una opción para ti', icon: WandSparkles },
  { value: 'Básico', description: 'Hasta 50 personas · 2 horas', icon: GlassWater },
  { value: 'Intermedio', description: 'Hasta 100 personas · 3 horas', icon: Martini },
  { value: 'Premium', description: 'Hasta 200 personas · 4 horas', icon: Crown },
];

export default function QuoteForm() {
  const reduceMotion = useReducedMotion();
  const formId = useId();
  const [errors, setErrors] = useState<{ guests?: string; place?: string }>({});
  const [attempted, setAttempted] = useState(false);
  const guestInput = useRef<HTMLInputElement>(null);
  const placeInput = useRef<HTMLInputElement>(null);
  const [guests, setGuests] = useState('');
  const [event, setEvent] = useState('Boda');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [selected, setSelected] = useState('Ayúdenme a elegir');
  const [prepared, setPrepared] = useState(false);
  const fields = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLFormElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(false);
  useLayoutEffect(() => {
    if (previousStep.current === prepared) return;
    previousStep.current = prepared;
    card.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
    if (prepared) heading.current?.focus({ preventScroll: true });
    else fields.current?.querySelector('button')?.focus({ preventScroll: true });
  }, [prepared]);
  function editDetails() { setPrepared(false); }
  const count = Number(guests);
  const recommendation = count > 0 ? packages.find(pack => count <= Number(pack.people)) : undefined;
  function validate(guestValue: string, placeValue: string) {
    const next: { guests?: string; place?: string } = {};
    const number = Number(guestValue);
    if (!guestValue.trim()) next.guests = 'Indica cuántas personas asistirán a tu evento.';
    else if (!Number.isInteger(number) || number < 1 || number > 10000) next.guests = 'Escribe un número entero entre 1 y 10,000.';
    if (!placeValue.trim()) next.place = 'Escribe el municipio o salón. Si aún no lo sabes, escribe «por definir».';
    else if (placeValue.trim().length > 180) next.place = 'Usa un máximo de 180 caracteres para el lugar.';
    return next;
  }
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAttempted(true);
    const nextErrors = validate(guests, place);
    setErrors(nextErrors);
    if (nextErrors.guests || nextErrors.place) {
      const firstInvalid = nextErrors.guests ? guestInput.current : placeInput.current;
      firstInvalid?.focus();
      return;
    }
    setPrepared(true);
  }
  const formattedDate = date ? new Date(`${date}T12:00:00`).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Por definir';
  const message = `Hola, quiero cotizar un evento con Cocteleros.\n\nEvento: ${event}\nFecha: ${formattedDate}\nLugar: ${place.trim()}\nInvitados: ${guests}\nPaquete: ${selected}\n\n¿Me pueden compartir disponibilidad y cotización?`;
  return <form noValidate ref={card} onSubmit={submit} onChange={() => setPrepared(false)} className="quote-form rounded-[1.75rem] border border-gold/30 bg-cream text-left text-pine shadow-2xl">
    <div className="rounded-t-[1.75rem] border-b border-pine/10 bg-linear-to-br from-white/80 to-gold/10 px-6 pb-7 pt-7 sm:px-9 sm:pt-9"><div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Diseñemos tu celebración</p><h3 ref={heading} tabIndex={-1} className="mt-3 font-display text-3xl outline-none sm:text-4xl">{prepared ? 'Tu mensaje está listo' : 'Un brindis a tu medida.'}</h3></div><span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#82602e]/25 text-2xl text-[#82602e]"><ArrowUpRight size={20} strokeWidth={1.7} /></span></div><p className="mt-3 text-sm leading-6 text-pine/65">{prepared ? 'Revisa los datos de tu evento antes de continuar.' : 'Los detalles hacen la diferencia. Empecemos por los tuyos.'}</p><div className="mt-6 flex items-center gap-3 text-[11px] font-semibold"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-pine text-cream">1</span><span>Tu evento</span><span aria-hidden="true" className="h-px flex-1 bg-pine/15" /><span className={`flex h-6 w-6 items-center justify-center rounded-full ${prepared ? 'bg-pine text-cream' : 'border border-pine/20 text-pine/50'}`}>2</span><span className={prepared ? '' : 'text-pine/50'}>Revisa y envía</span></div></div>
    <motion.div key={prepared ? 'summary' : 'form'} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.24 }} className="p-6 sm:p-9">
    {!prepared && <>{(errors.guests || errors.place) && <p role="alert" className="mb-5 rounded-xl border border-[#a3332a]/20 bg-[#a3332a]/5 px-4 py-3 text-sm leading-6 text-[#8c2923]">Revisa los campos señalados para preparar tu cotización.</p>}<div ref={fields} className="grid gap-5 sm:grid-cols-2">
      <SelectField label="Tipo de evento" value={event} options={eventOptions} onChange={value => { setEvent(value); setPrepared(false); }} />
      <label className="field-label">Número de invitados<input ref={guestInput} aria-required="true" aria-invalid={Boolean(errors.guests)} aria-describedby={errors.guests ? `${formId}-guests-error` : undefined} className="form-field" type="number" inputMode="numeric" min="1" max="10000" step="1" required placeholder="Ej. 80" value={guests} onChange={e => { setGuests(e.target.value); if (attempted) setErrors(validate(e.target.value, place)); }} />{errors.guests && <span id={`${formId}-guests-error`} className="field-error">{errors.guests}</span>}</label>
      <DateField value={date} onChange={value => { setDate(value); setPrepared(false); }} />
      <SelectField label="Paquete" value={selected} options={packageOptions} onChange={value => { setSelected(value); setPrepared(false); }} />
      <label className="field-label sm:col-span-2">Lugar del evento<input ref={placeInput} aria-required="true" aria-invalid={Boolean(errors.place)} aria-describedby={`${formId}-place-help${errors.place ? ` ${formId}-place-error` : ''}`} className="form-field" type="text" required pattern={'.*\\S.*'} maxLength={180} placeholder="Municipio o nombre del salón" value={place} onChange={e => { setPlace(e.target.value); if (attempted) setErrors(validate(guests, e.target.value)); }} /><span id={`${formId}-place-help`} className="text-[11px] font-normal text-pine/55">Si aún no tienes lugar, escribe «por definir».</span>{errors.place && <span id={`${formId}-place-error`} className="field-error">{errors.place}</span>}</label>
    </div>
    <p aria-live="polite" className="mt-5 min-h-12 rounded-xl bg-pine/5 px-4 py-3 text-sm leading-6 text-pine/75">{count > 0 ? recommendation ? `Por capacidad, el paquete ${recommendation.name} puede ser un buen punto de partida. Confirma los detalles con nosotros.` : 'Para más de 200 invitados, consulta las opciones de servicio directamente con nosotros.' : 'Indica cuántos invitados esperas y te orientamos con un paquete por capacidad.'}</p>
    <button type="submit" className="mt-6 flex w-full items-center justify-between rounded-full bg-pine px-6 py-4 text-sm font-semibold text-cream transition-colors hover:bg-sage">Preparar mi cotización <span aria-hidden="true"><ArrowUpRight size={20} strokeWidth={1.7} /></span></button>
    <p className="mt-3 text-center text-xs leading-5 text-pine/60">Revisarás el mensaje antes de abrir WhatsApp. Esto no confirma una reserva.</p></>}
    {prepared && <div role="status"><div className="flex flex-wrap items-center justify-between gap-3"><button type="button" onClick={editDetails} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-pine/20 px-4 py-2 text-sm font-semibold text-pine transition-colors hover:bg-pine/5"><ArrowLeft aria-hidden="true" size={16} />Editar datos del evento</button></div><p className="mt-3 whitespace-pre-line rounded-xl bg-pine/5 p-4 text-sm leading-6">{message}</p><a className="mt-4 flex items-center justify-between rounded-full bg-[#236b43] px-6 py-4 text-sm font-semibold text-white hover:bg-[#195231]" href={whatsapp(message)} target="_blank" rel="noopener noreferrer">Continuar en WhatsApp <span aria-hidden="true"><ArrowUpRight size={20} strokeWidth={1.7} /></span></a><p className="mt-3 text-xs leading-5 text-pine/60">WhatsApp abrirá el texto. Tú decides cuándo enviarlo.</p></div>}
    </motion.div>
  </form>;
}


