import { motion } from 'framer-motion'

interface Props {
  items: string[]
  className?: string
  compact?: boolean
}

/**
 * Lista de integrações/serviços com dots lime pulsantes + texto mono.
 * Stagger fade-in quando entra no viewport.
 */
export function IntegrationsList({ items, className = '', compact = false }: Props) {
  return (
    <ul className={`flex flex-col gap-2 ${className}`}>
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.35, delay: i * 0.06, ease: 'easeOut' }}
          className={`flex items-center gap-3 mz-mono text-white/85 ${
            compact ? 'text-[11px]' : 'text-xs'
          }`}
        >
          <span className="mz-dot" />
          <span>{item}</span>
        </motion.li>
      ))}
    </ul>
  )
}
