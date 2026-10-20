import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type SelectOption = { value: string; description: string; icon: LucideIcon };
type Props = { label: string; value: string; options: SelectOption[]; onChange: (value: string) => void };

export default function SelectField({ label, value, options, onChange }: Props) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef({ text: '', time: 0 });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const selectedIndex = Math.max(0, options.findIndex(option => option.value === value));
  const selected = options[selectedIndex];
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);
  useEffect(() => {
    if (open) document.getElementById(`${id}-option-${active}`)?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }, [open, active, id]);
  function choose(index: number) {
    onChange(options[index].value);
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  }
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Tab') { setOpen(false); return; }
    if (event.key === 'Escape') { if (open) event.stopPropagation(); setOpen(false); return; }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      setOpen(true);
      setActive(current => event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : !open ? selectedIndex : (current + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length);
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (open) choose(active); else { setActive(selectedIndex); setOpen(true); }
      return;
    }
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      const now = Date.now();
      search.current = { text: (now - search.current.time < 700 ? search.current.text : '') + event.key.toLocaleLowerCase('es'), time: now };
      const index = options.findIndex(option => option.value.toLocaleLowerCase('es').startsWith(search.current.text));
      if (index >= 0) { setActive(index); setOpen(true); }
    }
  }
  return <div ref={root} className={`relative min-w-0 ${open ? 'z-20' : ''}`} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false); }}>
    <label id={`${id}-label`} htmlFor={`${id}-trigger`} className="mb-2 block text-xs font-semibold tracking-wide text-pine/75">{label}</label>
    <button ref={trigger} id={`${id}-trigger`} type="button" role="combobox" aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? `${id}-list` : undefined} aria-labelledby={`${id}-label ${id}-value`} aria-activedescendant={open ? `${id}-option-${active}` : undefined} onKeyDown={onKeyDown} onClick={() => { setActive(selectedIndex); setOpen(!open); }} className={`select-trigger flex min-h-17 w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-all ${open ? 'border-[#92703e] bg-white shadow-[0_0_0_3px_#dfb77730]' : 'border-pine/15 bg-white/75 hover:border-[#92703e]/60 hover:bg-white'}`}>
      <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-pine/5 text-lg text-[#82602e]"><selected.icon size={18} strokeWidth={1.7} /></span><span className="min-w-0 flex-1"><span id={`${id}-value`} className="block truncate text-sm font-semibold">{selected.value}</span><span className="mt-0.5 block truncate text-[11px] text-pine/55">{selected.description}</span></span><ChevronDown aria-hidden="true" size={16} className={`shrink-0 text-pine/60 transition-transform ${open ? 'rotate-180' : ''}`} />
    </button>
    {open && <ul id={`${id}-list`} role="listbox" aria-labelledby={`${id}-label`} className="absolute inset-x-0 top-full mt-2 max-h-64 overflow-y-auto overscroll-contain rounded-2xl border border-pine/10 bg-[#fffdf8] p-1.5 shadow-[0_18px_50px_-12px_#171b1645]">
      {options.map((option, index) => <li key={option.value} id={`${id}-option-${index}`} role="option" aria-selected={value === option.value} onPointerMove={() => setActive(index)} onPointerDown={event => event.preventDefault()} onClick={() => choose(index)} className={`flex min-h-15 cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 ${index === active ? 'bg-pine text-cream' : 'text-pine'}`}><span aria-hidden="true" className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${index === active ? 'bg-white/10 text-gold' : 'bg-pine/5 text-[#82602e]'}`}><option.icon size={17} strokeWidth={1.7} /></span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{option.value}</span><span className={`mt-0.5 block text-[11px] ${index === active ? 'text-cream/65' : 'text-pine/60'}`}>{option.description}</span></span>{value === option.value && <span aria-hidden="true" className={index === active ? 'text-gold' : 'text-[#82602e]'}><Check size={16} strokeWidth={2} /></span>}</li>)}
    </ul>}
  </div>;
}
