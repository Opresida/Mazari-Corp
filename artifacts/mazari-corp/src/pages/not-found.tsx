import { Link } from 'wouter'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { useSEO } from '@/lib/seo'
import { CONTACT_EMAIL } from '@/lib/contact'

export default function NotFound() {
  useSEO({
    title: 'Página não encontrada — Mazari Corp',
    description: 'A página que você procura não existe ou foi movida.',
    path: '/404',
    noindex: true,
  })

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground px-5">
      <div className="w-full max-w-lg flex flex-col items-start gap-6">
        <span className="mz-tag text-[9px] sm:text-xs">Erro 404</span>

        <h1 className="text-[32px] sm:text-5xl font-extrabold leading-[1.08] tracking-tight">
          Esta página não existe
        </h1>

        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          O endereço que você acessou foi movido ou nunca existiu. Volte para a home e siga a partir
          dali — ou fale direto com a gente.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-black font-semibold text-sm px-5 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a home
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 border border-white/15 text-white/80 text-sm px-5 py-3 rounded-full hover:border-primary/50 hover:text-white transition-colors"
          >
            Falar com a Mazari
          </a>
        </div>

        <div className="flex items-center gap-2 text-white/30 text-xs mz-mono pt-2">
          <AlertCircle className="h-3.5 w-3.5" />
          mazari.core · route not found
        </div>
      </div>
    </div>
  )
}
