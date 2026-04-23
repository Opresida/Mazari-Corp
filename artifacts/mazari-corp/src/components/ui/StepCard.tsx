import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export interface SubTask {
  title: string
  detail?: string
}

interface Props {
  stepNumber: number
  title: string
  icon?: ReactNode
  description?: string
  subtasks: SubTask[]
  className?: string
}

/**
 * Card estilo TensorStax "Plan N." — header com tag numérica + título
 * e sub-cards listando as entregas da etapa.
 */
export function StepCard({
  stepNumber,
  title,
  icon,
  description,
  subtasks,
  className = '',
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`flex flex-col gap-4 ${className}`}
    >
      {/* Top: tag + ícone + título */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="mz-tag">Step {String(stepNumber).padStart(2, '0')}.</span>
          {icon && (
            <span className="text-primary mz-glow">{icon}</span>
          )}
        </div>
        <h3 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h3>
        {description && (
          <p className="text-sm text-white/60 leading-relaxed">{description}</p>
        )}
      </div>

      {/* Sub-cards das entregas */}
      <div className="flex flex-col gap-2 mt-2">
        {subtasks.map((sub, i) => (
          <motion.div
            key={sub.title}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            className="mz-card-soft p-3 flex items-center justify-between gap-3 hover:border-primary/30 transition-colors"
          >
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-xs md:text-[13px] text-white/90 mz-mono leading-tight">
                {sub.title}
              </span>
              {sub.detail && (
                <span className="text-[10px] text-white/45 leading-tight">
                  {sub.detail}
                </span>
              )}
            </div>
            <span className="mz-dot flex-shrink-0" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
