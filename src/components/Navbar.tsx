import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navigation } from '../data';

const links = [...navigation.slice(0, 4), ['galeria', 'Galería'] as const, ...navigation.slice(4)];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('inicio');
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const current = [...links].reverse().find(([id]) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= 160;
      });
      setActive(current?.[0] ?? 'inicio');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled || open ? 'border-white/10 bg-pine/95 backdrop-blur-xl' : 'border-white/15 bg-black/10'}`}>
    <nav aria-label="Navegación principal" className="page-width flex min-h-22 flex-wrap items-center justify-between gap-4 py-4">
      <a href="/" data-section="inicio" onClick={() => setOpen(false)} className="flex items-center gap-3"><img src="/img/logo.png" alt="" className="h-11 w-11 rounded-full object-cover" /><span className="font-display text-2xl tracking-tight">Cocteleros<span className="text-gold">.</span></span></a>
      <button type="button" aria-expanded={open} aria-controls="main-menu" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)} className="rounded-full border border-white/25 px-4 py-2 text-sm lg:hidden">{open ? <>Cerrar <X aria-hidden="true" size={18} className="inline-block align-middle" /></> : <>Menú <Menu aria-hidden="true" size={18} className="inline-block align-middle" /></>}</button>
      <ul id="main-menu" className={`${open ? 'flex' : 'hidden'} max-h-[calc(100dvh-6rem)] w-full flex-col gap-1 overflow-y-auto pb-3 lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-5 lg:overflow-visible lg:pb-0`}>
        {links.map(([id, label]) => <li key={id}><a aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)} href="/" data-section={id} className={`nav-link block py-3 text-sm transition-colors hover:text-gold ${id === 'contacto' ? 'lg:rounded-full lg:border lg:border-gold/50 lg:px-5 text-gold' : active === id ? 'text-gold' : 'text-cream/85'}`}>{label}</a></li>)}
      </ul>
    </nav>
  </header>;
}

