import { useEffect, useId, useRef, useState } from 'react';
import { CalendarDays, ChevronDown, X } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { es } from 'react-day-picker/locale';
import 'react-day-picker/style.css';

type Props = { value: string; onChange: (value: string) => void };
export default function DateField({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = value ? new Date(`${value}T12:00:00`) : undefined;
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open]);
  function close() { setOpen(false); trigger.current?.focus({ preventScroll: true }); }
  return <div ref={root} className={`relative min-w-0 ${open ? 'z-30' : ''}`} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false); }} onKeyDown={event => { if (event.key === 'Escape' && open) { event.preventDefault(); event.stopPropagation(); close(); } }}>
    <label htmlFor={`${id}-trigger`} className="mb-2 block text-xs font-semibold tracking-wide text-pine/75">Fecha <span className="font-normal text-pine/60">(opcional)</span></label>
    <button type="button" id={`${id}-trigger`} ref={trigger} aria-haspopup="dialog" aria-expanded={open} aria-controls={open ? `${id}-calendar` : undefined} onClick={() => setOpen(!open)} className={`select-trigger flex min-h-17 w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-all ${open ? 'border-[#92703e] bg-white shadow-[0_0_0_3px_#dfb77730]' : 'border-pine/15 bg-white/75 hover:border-[#92703e]/60 hover:bg-white'}`}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pine/5 text-[#82602e]"><CalendarDays aria-hidden="true" size={18} strokeWidth={1.7} /></span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{selected ? selected.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Elige una fecha'}</span><span className="mt-0.5 block truncate text-[11px] text-pine/55">{selected ? 'Fecha de tu celebración' : 'También puede quedar por definir'}</span></span><ChevronDown aria-hidden="true" size={16} className={`shrink-0 text-pine/60 transition-transform ${open ? 'rotate-180' : ''}`} />
    </button>
    {open && <div role="dialog" aria-label="Elegir fecha del evento" id={`${id}-calendar`} className="event-calendar absolute left-0 top-full mt-2 w-[min(20rem,calc(100vw-6rem))] rounded-2xl border border-pine/10 bg-[#fffdf8] p-4 text-pine shadow-[0_18px_50px_-12px_#171b1645]">
      <div className="mb-3 flex items-center justify-between border-b border-pine/10 pb-3"><span className="text-xs font-semibold text-[#82602e]">¿Cuándo celebramos?</span><button type="button" aria-label="Cerrar calendario" onClick={close} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-pine/5"><X aria-hidden="true" size={16} /></button></div>
      <DayPicker autoFocus mode="single" locale={es} weekStartsOn={1} selected={selected} defaultMonth={selected ?? today} startMonth={new Date(today.getFullYear(), today.getMonth(), 1)} disabled={{ before: today }} showOutsideDays fixedWeeks onSelect={day => { if (!day) return; onChange(`${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`); close(); }} />
      <div className="mt-3 flex items-center justify-between gap-3 border-t border-pine/10 pt-3"><span className="text-[10px] leading-4 text-pine/55">Consulta disponibilidad<br />por WhatsApp.</span><button type="button" onClick={() => { onChange(''); close(); }} className="rounded-full border border-pine/15 px-3 py-2 text-xs font-semibold hover:bg-pine/5">Por definir</button></div>
    </div>}
  </div>;
}
