import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  title: string
  caption?: string
  description: string
  visual: ReactNode
  delay?: number
  className?: string
}

/**
 * Card grande no padrão "asset_card" da referência:
 * — topo: título + caption entre parênteses + descrição curta
 * — base: visualização (SVG inline ou outra "mini-aplicação" da Mazari)
 */
export function AssetCard({
  title,
  caption,
  description,
  visual,
  delay = 0,
  className = '',
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      className={`mz-card-soft p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-5 h-full relative overflow-hidden ${className}`}
    >
      {/* Topo: título + descrição */}
      <div className="relative flex flex-col gap-3 z-10">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg sm:text-xl md:text-[22px] font-bold leading-tight tracking-tight">
            {title}
          </h3>
          {caption && (
            <span className="mz-mono text-[11px] text-primary/75">({caption})</span>
          )}
        </div>
        <p className="text-sm text-white/60 leading-relaxed">{description}</p>
      </div>

      {/* Base: visualização */}
      <div className="relative z-10 mt-auto pt-2">{visual}</div>
    </motion.div>
  )
}
