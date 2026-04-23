import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface Props {
  side: 'left' | 'right'
  children: ReactNode
  className?: string
}

/**
 * Card grande com parallax horizontal: entra da lateral conforme scroll passa
 * pela seção, atinge centro no meio da viewport, volta a afastar na saída.
 */
export function FloatingCard({ side, children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const dirSign = side === 'left' ? -1 : 1
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [`${6 * dirSign}%`, '0%', `${-6 * dirSign}%`],
  )
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.03, 0.96])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ x, scale }} className="mz-card-soft p-6 md:p-8 h-full">
        {children}
      </motion.div>
    </div>
  )
}
