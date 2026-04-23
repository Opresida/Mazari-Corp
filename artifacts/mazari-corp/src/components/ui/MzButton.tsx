import { ArrowUpRight } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  children: ReactNode
  asLink?: string
}

/**
 * Botão Mazari com seta dupla animada (slide-out + slide-in) no hover.
 * - primary: fundo lime, texto preto
 * - ghost: borda lime, texto lime
 */
export function MzButton({
  variant = 'primary',
  children,
  asLink,
  className = '',
  ...rest
}: Props) {
  const base =
    'group relative inline-flex items-center gap-2 rounded-[4px] font-mono uppercase text-xs font-semibold tracking-wider transition-all duration-200 overflow-hidden'
  const sizing = 'pl-4 pr-1.5 py-1.5'
  const variants = {
    primary:
      'bg-primary text-primary-foreground hover:brightness-110 hover:shadow-[0_0_24px_rgba(210,255,40,0.45)]',
    ghost:
      'border border-primary/40 text-primary bg-primary/5 hover:bg-primary/10 hover:border-primary/80',
  }

  const arrowBox =
    'inline-flex items-center justify-center w-7 h-7 rounded-[3px] ' +
    (variant === 'primary'
      ? 'bg-background/15'
      : 'bg-primary/10 border border-primary/30')

  const content = (
    <>
      <span>{children}</span>
      <span className={arrowBox}>
        <span className="relative block w-3.5 h-3.5 overflow-hidden">
          <ArrowUpRight
            className="absolute inset-0 h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-3 group-hover:-translate-y-3"
            strokeWidth={2.5}
          />
          <ArrowUpRight
            className="absolute -translate-x-3 translate-y-3 h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
            strokeWidth={2.5}
          />
        </span>
      </span>
    </>
  )

  if (asLink) {
    return (
      <a
        href={asLink}
        className={`${base} ${sizing} ${variants[variant]} ${className}`}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      className={`${base} ${sizing} ${variants[variant]} ${className}`}
      {...rest}
    >
      {content}
    </button>
  )
}
