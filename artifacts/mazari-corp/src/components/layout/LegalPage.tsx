import type { ReactNode } from 'react'
import { Link } from 'wouter'
import { ArrowLeft } from 'lucide-react'
import { Footer } from '@/components/layout/Footer'

interface Props {
  eyebrow: string
  title: string
  updatedAt: string
  children: ReactNode
}

/** Casca compartilhada das páginas jurídicas (/privacidade e /termos). */
export function LegalPage({ eyebrow, title, updatedAt, children }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-6 sm:pt-32">
        <Link
          href="/"
          className="mz-mono inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/50 transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar para a home
        </Link>

        <span className="mz-tag mt-8 inline-block text-[9px] sm:text-xs">{eyebrow}</span>

        <h1 className="mt-5 text-[32px] font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
          {title}
        </h1>

        <p className="mz-mono mt-4 text-[11px] uppercase tracking-widest text-white/40">
          Última atualização: {updatedAt}
        </p>

        <div className="legal-prose mt-12 flex flex-col gap-8">{children}</div>
      </main>

      <Footer />
    </div>
  )
}

interface SectionProps {
  title: string
  children: ReactNode
}

export function LegalSection({ title, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-white/70 sm:text-[15px]">
        {children}
      </div>
    </section>
  )
}
