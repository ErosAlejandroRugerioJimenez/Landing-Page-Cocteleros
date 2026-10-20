import { useEffect, useRef, useState } from 'react';
import { gallery } from '../data';
import SectionHeading from './SectionHeading';

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const opened = active !== null;
  useEffect(() => {
    if (!opened) return;
    dialog.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.current?.close();
      document.body.style.overflow = previousOverflow;
      lastTrigger.current?.focus({ preventScroll: true });
    };
  }, [opened]);
  const move = (direction: number) => setActive(current => current === null ? null : (current + direction + gallery.length) % gallery.length);
  return <section id="galeria" className="section-space bg-cream text-pine"><div className="page-width"><div className="flex flex-wrap items-end justify-between gap-4"><SectionHeading eyebrow="Un vistazo a nuestra barra" title="El arte de un buen coctel" description="Seis formas de empezar la celebración. Toca una foto para verla de cerca." /><span className="mb-12 text-xs tracking-widest text-pine/60">LA GALERÍA / 01—06</span></div><div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">{gallery.map(([image, name], i) => <button type="button" key={image} aria-label={`Ampliar ${name}`} onClick={e => { lastTrigger.current = e.currentTarget; setActive(i); }} className={`group relative overflow-hidden rounded-xl text-left ${i % 3 === 1 ? 'md:translate-y-8' : ''}`}><img src={`/img/optimized/${image}`} srcSet={`/img/optimized/${image.replace('-960', '-480')} 480w, /img/optimized/${image} ${image.includes('55') ? 831 : 960}w`} sizes="(min-width: 768px) 33vw, 50vw" alt={name} loading="lazy" decoding="async" className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105 group-focus-visible:scale-105" /><span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-pine/40 text-cream backdrop-blur" aria-hidden="true">↗</span><span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 to-transparent px-5 pb-5 pt-16 text-cream"><span className="text-[10px] tracking-[.2em] text-gold">0{i + 1} / COCTELEROS</span><span className="mt-1 block font-display text-xl sm:text-3xl">{name}</span></span></button>)}</div></div>
    <dialog ref={dialog} aria-labelledby="gallery-title" onCancel={() => setActive(null)} onClick={e => { if (e.target === e.currentTarget) setActive(null); }} onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); move(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); } }} onClose={() => setActive(null)} className="gallery-dialog m-auto max-h-[94dvh] w-[min(94vw,60rem)] overflow-auto rounded-2xl border border-cream/20 bg-pine p-4 text-cream shadow-2xl backdrop:bg-black/85 sm:p-6">
      {active !== null && <><div className="mb-4 flex items-center justify-between gap-4"><div><p className="text-xs tracking-widest text-gold">{String(active + 1).padStart(2, '0')} / 06</p><h3 id="gallery-title" className="mt-1 font-display text-2xl">{gallery[active][1]}</h3></div><button type="button" autoFocus onClick={() => setActive(null)} aria-label="Cerrar fotografía" className="min-h-11 rounded-full border border-cream/30 px-4 text-sm">Cerrar ✕</button></div><img src={`/img/optimized/${gallery[active][0]}`} alt={gallery[active][1]} className="max-h-[65dvh] w-full rounded-lg object-contain" /><p className="mt-3 text-center text-[11px] leading-5 text-muted">{gallery[active][1] === 'Clericot' ? <>Foto: <a className="underline" href="https://commons.wikimedia.org/wiki/File:Clericot_-_Puebla.jpg" target="_blank" rel="noopener noreferrer">MX</a> · <a className="underline" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> · Adaptada a WebP</> : gallery[active][1] === 'Cantaritos' ? <>Foto: <a className="underline" href="https://commons.wikimedia.org/wiki/File:Cantarito.jpg" target="_blank" rel="noopener noreferrer">Photo.MarioVG</a> · <a className="underline" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> · Adaptada a WebP</> : null}</p><div className="mt-4 flex justify-between gap-4"><button type="button" onClick={() => move(-1)} className="button-outline py-3">← Anterior</button><button type="button" onClick={() => move(1)} className="button-outline py-3">Siguiente →</button></div></>}
    </dialog>
  </section>;
}

