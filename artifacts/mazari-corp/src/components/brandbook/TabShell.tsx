import type { ReactNode } from 'react'
import { GradientSplitter } from '@/components/ui/GradientSplitter'

interface Props {
  number: string
  eyebrow: string
  title: string
  accent?: string
  lead: string
  children: ReactNode
}

export function TabShell({ number, eyebrow, title, accent, lead, children }: Props) {
  return (
    <article className="flex flex-col gap-10">
      {/* Header da aba */}
      <header className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <span className="mz-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
            {number} / {eyebrow}
          </span>
          <span className="mz-tag">Brandbook</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight">
          {title}
          {accent && (
            <>
              <br className="hidden md:block" />
              <span className="text-primary italic font-serif font-medium text-glow">
                {' '}
                {accent}
              </span>
            </>
          )}
        </h1>
        <p className="text-base md:text-lg text-white/65 leading-relaxed max-w-2xl">
          {lead}
        </p>
        <GradientSplitter className="mt-2" />
      </header>

      {/* Conteúdo */}
      <div className="flex flex-col gap-10">{children}</div>
    </article>
  )
}

interface BlockProps {
  tag?: string
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function Block({ tag, title, subtitle, children, className = '' }: BlockProps) {
  return (
    <section className={`mz-card-soft p-5 sm:p-6 md:p-8 ${className}`}>
      {(tag || title) && (
        <header className="flex flex-col gap-2 mb-5">
          {tag && <span className="mz-tag w-fit">{tag}</span>}
          {title && (
            <h2 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm md:text-base text-white/60 leading-relaxed">
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  )
}

interface TwoColProps {
  children: ReactNode
  className?: string
}

export function TwoCol({ children, className = '' }: TwoColProps) {
  return (
    <div className={`grid md:grid-cols-2 gap-5 md:gap-6 ${className}`}>{children}</div>
  )
}

interface RuleProps {
  status: 'do' | 'dont'
  text: string
}

export function Rule({ status, text }: RuleProps) {
  const isDo = status === 'do'
  return (
    <div
      className={`flex items-start gap-3 p-3.5 rounded-md border ${
        isDo
          ? 'border-primary/25 bg-primary/[0.04]'
          : 'border-red-500/25 bg-red-500/[0.04]'
      }`}
    >
      <span
        className={`mz-mono text-[10px] uppercase tracking-widest font-bold flex-shrink-0 mt-0.5 ${
          isDo ? 'text-primary' : 'text-red-400'
        }`}
      >
        {isDo ? 'Faça' : 'Evite'}
      </span>
      <span className="text-sm text-white/80 leading-relaxed">{text}</span>
    </div>
  )
}
