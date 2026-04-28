import { useEffect, useState, type ComponentType } from 'react'
import { Link } from 'wouter'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Compass,
  Sparkles,
  Palette,
  Type,
  MessageSquareQuote,
  Box,
  Grid3x3,
  Layers,
  Zap,
  Layout,
  FileText,
  Download,
  ChevronRight,
} from 'lucide-react'
import { GradientSplitter } from '@/components/ui/GradientSplitter'
import { TabFoundation } from '@/components/brandbook/TabFoundation'
import { TabLogo } from '@/components/brandbook/TabLogo'
import { TabColor } from '@/components/brandbook/TabColor'
import { TabTypography } from '@/components/brandbook/TabTypography'
import { TabVoice } from '@/components/brandbook/TabVoice'
import { TabIconography } from '@/components/brandbook/TabIconography'
import { TabGrid } from '@/components/brandbook/TabGrid'
import { TabComponents } from '@/components/brandbook/TabComponents'
import { TabMotion } from '@/components/brandbook/TabMotion'
import { TabApplications } from '@/components/brandbook/TabApplications'
import { TabProposal } from '@/components/brandbook/TabProposal'
import { TabDownloads } from '@/components/brandbook/TabDownloads'

interface TabDef {
  id: string
  label: string
  shortLabel: string
  icon: typeof Compass
  number: string
  Component: ComponentType
}

const TABS: TabDef[] = [
  { id: 'foundation', label: 'Fundação', shortLabel: 'Fundação', icon: Compass, number: '01', Component: TabFoundation },
  { id: 'logo', label: 'Logo', shortLabel: 'Logo', icon: Sparkles, number: '02', Component: TabLogo },
  { id: 'color', label: 'Cor', shortLabel: 'Cor', icon: Palette, number: '03', Component: TabColor },
  { id: 'typography', label: 'Tipografia', shortLabel: 'Tipo', icon: Type, number: '04', Component: TabTypography },
  { id: 'voice', label: 'Voz & Tom', shortLabel: 'Voz', icon: MessageSquareQuote, number: '05', Component: TabVoice },
  { id: 'iconography', label: 'Iconografia', shortLabel: 'Ícones', icon: Box, number: '06', Component: TabIconography },
  { id: 'grid', label: 'Grid & Layout', shortLabel: 'Grid', icon: Grid3x3, number: '07', Component: TabGrid },
  { id: 'components', label: 'Componentes', shortLabel: 'Comp.', icon: Layers, number: '08', Component: TabComponents },
  { id: 'motion', label: 'Movimento', shortLabel: 'Motion', icon: Zap, number: '09', Component: TabMotion },
  { id: 'applications', label: 'Aplicações', shortLabel: 'Apps', icon: Layout, number: '10', Component: TabApplications },
  { id: 'proposal', label: 'Proposta Comercial', shortLabel: 'Proposta', icon: FileText, number: '11', Component: TabProposal },
  { id: 'downloads', label: 'Downloads', shortLabel: 'Assets', icon: Download, number: '12', Component: TabDownloads },
]

function getInitialTab(): string {
  if (typeof window === 'undefined') return 'foundation'
  const hash = window.location.hash.replace('#', '')
  if (TABS.some((t) => t.id === hash)) return hash
  return 'foundation'
}

export default function Brandbook() {
  const [activeTab, setActiveTab] = useState<string>(getInitialTab)

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (TABS.some((t) => t.id === hash)) setActiveTab(hash)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const handleSelect = (id: string) => {
    setActiveTab(id)
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${id}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const activeIndex = TABS.findIndex((t) => t.id === activeTab)
  const ActiveComponent = TABS[activeIndex]?.Component ?? TabFoundation
  const nextTab = TABS[activeIndex + 1]
  const activeMeta = TABS[activeIndex]

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      {/* Top bar — minimal, próprio do brandbook */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="group flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/55 hover:text-primary transition-colors">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Voltar</span>
              </a>
            </Link>
            <span className="hidden sm:inline-block w-px h-4 bg-white/15" />
            <div className="hidden sm:flex items-baseline gap-0.5">
              <span className="mz-mono text-base font-extrabold tracking-tight text-white">
                MAZARI
              </span>
              <span className="mz-mono text-base font-extrabold text-primary">.</span>
              <span className="ml-2 mz-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                / brandbook
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-1.5 mz-mono text-[10px] uppercase tracking-widest text-white/40">
              <span className="mz-dot" style={{ width: 5, height: 5 }} />
              v1.0 · 2026
            </span>
            <span className="mz-tag" style={{ fontSize: 9 }}>
              {activeMeta?.number} / {TABS.length.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </header>

      {/* Mobile pill bar — sticky abaixo do header */}
      <nav
        aria-label="Brandbook tabs (mobile)"
        className="lg:hidden sticky top-14 z-30 border-b border-white/10 bg-background/90 backdrop-blur"
      >
        <div className="overflow-x-auto scrollbar-thin" style={{ scrollbarWidth: 'none' }}>
          <div className="flex items-center gap-1.5 px-4 py-2.5 min-w-max">
            {TABS.map((t) => {
              const active = t.id === activeTab
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleSelect(t.id)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md mz-mono text-[10px] uppercase tracking-widest whitespace-nowrap transition-all ${
                    active
                      ? 'bg-primary/10 border border-primary/40 text-primary'
                      : 'border border-white/10 text-white/55 hover:border-white/25 hover:text-white/85'
                  }`}
                >
                  <span className={active ? 'text-primary/80' : 'text-white/30'}>
                    {t.number}
                  </span>
                  <span>{t.shortLabel}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main grid: sidebar (desktop) + content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-[260px,1fr] gap-8 lg:gap-12">
          {/* Sidebar (desktop) */}
          <aside
            aria-label="Brandbook tabs"
            className="hidden lg:block"
          >
            <div className="sticky top-24 flex flex-col gap-1">
              <div className="mb-4 flex items-center gap-2 mz-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                <span className="mz-dot" style={{ width: 5, height: 5 }} />
                Índice
              </div>
              {TABS.map((t) => {
                const active = t.id === activeTab
                const Icon = t.icon
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelect(t.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-all ${
                      active
                        ? 'bg-primary/8 border border-primary/30 text-primary'
                        : 'border border-transparent text-white/55 hover:bg-white/[0.03] hover:text-white/90'
                    }`}
                  >
                    <span
                      className={`mz-mono text-[10px] tracking-widest flex-shrink-0 ${
                        active ? 'text-primary/80' : 'text-white/30'
                      }`}
                    >
                      {t.number}
                    </span>
                    <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="text-sm flex-1 truncate">{t.label}</span>
                    {active && (
                      <motion.span
                        layoutId="activeTabIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r"
                        style={{ boxShadow: '0 0 8px rgba(210,255,40,0.6)' }}
                      />
                    )}
                  </button>
                )
              })}

              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/40">
                <div className="flex items-center justify-between">
                  <span>Versão</span>
                  <span className="text-white/70">1.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Atualizado</span>
                  <span className="text-white/70">04 / 2026</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="min-w-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <ActiveComponent />

              {/* Footer da aba: navegação contextual */}
              <div className="mt-20">
                <GradientSplitter />
                <div className="mt-8 flex items-center justify-between gap-4">
                  <div className="mz-mono text-[10px] uppercase tracking-widest text-white/40">
                    Mazari Brandbook · {activeMeta?.number} {activeMeta?.label}
                  </div>
                  {nextTab ? (
                    <button
                      type="button"
                      onClick={() => handleSelect(nextTab.id)}
                      className="group flex items-center gap-2 mz-mono text-[11px] uppercase tracking-widest text-white/70 hover:text-primary transition-colors"
                    >
                      <span className="text-white/40">Próximo:</span>
                      <span>{nextTab.label}</span>
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ) : (
                    <Link href="/">
                      <a className="group flex items-center gap-2 mz-mono text-[11px] uppercase tracking-widest text-white/70 hover:text-primary transition-colors">
                        <span>Fim — voltar ao site</span>
                        <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}
