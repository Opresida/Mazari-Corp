import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { SplitText } from './SplitText'

interface Props {
  text: string
  accent?: string
  children?: ReactNode
  className?: string
  tag?: string
  subhead?: string
}

/**
 * Heading central com setas decorativas laterais que convergem para o centro
 * conforme scroll. Texto animado letra-por-letra. Suporta um trecho em accent
 * (cor primary + italic serif) ao final.
 */
export function DecoratedHeading({
  text,
  accent,
  children,
  className = '',
  tag,
  subhead,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  // Setas começam afastadas e convergem ao centro da seção
  const leftX = useTransform(scrollYProgress, [0, 1], ['-60%', '0%'])
  const rightX = useTransform(scrollYProgress, [0, 1], ['60%', '0%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 1])

  return (
    <div ref={ref} className={`relative flex flex-col items-center text-center ${className}`}>
      {/* Setas decorativas */}
      <motion.svg
        style={{ x: leftX, opacity }}
        className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 text-primary/40"
        width="80"
        height="14"
        viewBox="0 0 80 14"
        fill="none"
        aria-hidden="true"
      >
        <path d="M0 7 L70 7 M60 1 L70 7 L60 13" stroke="currentColor" strokeWidth="1.5" />
      </motion.svg>
      <motion.svg
        style={{ x: rightX, opacity }}
        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 text-primary/40"
        width="80"
        height="14"
        viewBox="0 0 80 14"
        fill="none"
        aria-hidden="true"
      >
        <path d="M80 7 L10 7 M20 1 L10 7 L20 13" stroke="currentColor" strokeWidth="1.5" />
      </motion.svg>

      {tag && <div className="mz-tag mb-5">{tag}</div>}

      <h2 className="text-[30px] sm:text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight max-w-4xl px-1">
        <SplitText text={text} as="span" />
        {accent && (
          <>
            {' '}
            <span className="text-primary italic font-serif font-medium text-glow">
              <SplitText text={accent} as="span" delay={0.3} />
            </span>
          </>
        )}
      </h2>

      {subhead && (
        <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-white/60 max-w-2xl leading-relaxed px-1">
          {subhead}
        </p>
      )}

      {children}
    </div>
  )
}
