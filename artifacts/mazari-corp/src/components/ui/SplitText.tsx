import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div'
  delay?: number
  stagger?: number
  once?: boolean
  children?: ReactNode
}

/**
 * Quebra o texto em palavras e chars. Cada char faz fade-in com um stagger
 * aleatório sutil quando a palavra entra no viewport. Preserva espaços.
 */
export function SplitText({
  text,
  className = '',
  as: Tag = 'span',
  delay = 0,
  stagger = 0.018,
  once = true,
}: Props) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  if (reduce) {
    return <Tag className={className}>{text}</Tag>
  }

  let charIndex = 0
  return (
    <Tag className={className}>
      {words.map((word, wi) => (
        <span
          key={`${word}-${wi}`}
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
        >
          {word.split('').map((char) => {
            const i = charIndex++
            const randomDelay = delay + i * stagger + Math.random() * 0.05
            return (
              <motion.span
                key={`${char}-${i}`}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once, margin: '0px' }}
                transition={{ duration: 0.4, delay: randomDelay, ease: 'easeOut' }}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            )
          })}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
