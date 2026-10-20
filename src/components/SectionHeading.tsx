import { motion, useReducedMotion } from 'motion/react';

type Props = { eyebrow: string; title: string; description?: string; center?: boolean };
export default function SectionHeading({ eyebrow, title, description, center = false }: Props) {
  const reduceMotion = useReducedMotion();
  return <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduceMotion ? 0 : 0.45 }} className={`mb-12 ${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}><p className="eyebrow">{eyebrow}</p><h2 className="section-title">{title}</h2>{description && <p className="mt-5 leading-7 text-muted">{description}</p>}</motion.div>;
}
