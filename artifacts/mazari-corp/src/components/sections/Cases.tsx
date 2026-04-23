import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'
import { ExternalLink, Monitor, Code2, Users, FileCheck, Zap, TrendingUp, Globe, Server, ArrowRight } from 'lucide-react'
import { DecoratedHeading } from '../ui/DecoratedHeading'
import { GradientSplitter } from '../ui/GradientSplitter'
import { FloatingCard } from '../ui/FloatingCard'
import { MzButton } from '../ui/MzButton'

/* ═══════════ VISUAIS POR CASE ═══════════ */

function VizIdasamDashboard() {
  const stakeholders = [
    { label: 'PJ', count: 142, pct: 92 },
    { label: 'PF', count: 387, pct: 68 },
    { label: 'DOADOR', count: 214, pct: 78 },
    { label: 'ÓRGÃO PÚB', count: 47, pct: 34 },
    { label: 'PESQUISADOR', count: 96, pct: 54 },
  ]
  return (
    <div className="flex flex-col gap-4 h-full relative overflow-hidden">
      <div
        className="absolute -inset-6 mz-grid-bg opacity-40 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/50">
          <Users className="h-3 w-3" />
          idasam / crm
        </div>
        <span className="mz-tag">LIVE</span>
      </div>

      <div className="relative grid grid-cols-3 gap-3">
        {[
          { label: 'STAKEHOLDERS', value: '886' },
          { label: 'DOCS ASSINADOS', value: '1.2k' },
          { label: 'UPTIME', value: '99.9%' },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-md border border-white/10 bg-background/60 p-3"
          >
            <div className="text-xl font-bold text-primary text-glow">{m.value}</div>
            <div className="mz-mono text-[9px] uppercase tracking-wider text-white/40 mt-1">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-[9px] mz-mono uppercase tracking-widest text-white/40">
          <span>STAKEHOLDERS_POR_TIPO</span>
          <span>Q1 2026</span>
        </div>
        {stakeholders.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="mz-mono text-[9px] text-white/55 w-24 uppercase tracking-wider">
              {s.label}
            </span>
            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-primary shadow-[0_0_8px_rgba(210,255,40,0.5)]"
              />
            </div>
            <span className="mz-mono text-[10px] text-primary w-10 text-right">
              {s.count}
            </span>
          </div>
        ))}
      </div>

      <div className="relative flex items-center gap-2 pt-2 border-t border-white/10 mz-mono text-[10px] text-white/55">
        <FileCheck className="h-3 w-3 text-primary" />
        <span>Suíte documental + assinatura digital em produção</span>
      </div>
    </div>
  )
}

function VizI2taPerformance() {
  const scores = [
    { label: 'Performance', value: 98 },
    { label: 'Accessibility', value: 100 },
    { label: 'Best Practices', value: 96 },
    { label: 'SEO', value: 100 },
  ]
  return (
    <div className="flex flex-col gap-4 h-full relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/50">
          <Zap className="h-3 w-3" />
          i2ta / lighthouse
        </div>
        <span className="mz-tag">AUDIT</span>
      </div>

      {/* Círculos de score */}
      <div className="grid grid-cols-4 gap-3">
        {scores.map((s) => {
          const circumference = 2 * Math.PI * 18
          const offset = circumference - (s.value / 100) * circumference
          return (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <div className="relative w-14 h-14">
                <svg className="absolute inset-0" viewBox="0 0 44 44">
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="3"
                  />
                  <motion.circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke="#D2FF28"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: offset }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    style={{
                      transform: 'rotate(-90deg)',
                      transformOrigin: '22px 22px',
                      filter: 'drop-shadow(0 0 6px rgba(210,255,40,0.6))',
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary">
                  {s.value}
                </div>
              </div>
              <span className="mz-mono text-[9px] uppercase tracking-wider text-white/55 text-center leading-tight">
                {s.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Gráfico de crescimento */}
      <div className="rounded-md border border-white/10 bg-background/60 p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] mz-mono uppercase tracking-widest text-white/40">
            Tráfego orgânico (90d)
          </span>
          <span className="text-[10px] mz-mono text-primary flex items-center gap-1">
            <TrendingUp className="h-2.5 w-2.5" /> +412%
          </span>
        </div>
        <svg viewBox="0 0 400 60" className="w-full h-12" preserveAspectRatio="none">
          <defs>
            <linearGradient id="i2taGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D2FF28" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#D2FF28" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,55 L40,52 L80,48 L120,44 L160,38 L200,32 L240,22 L280,18 L320,12 L360,7 L400,4 L400,60 L0,60 Z"
            fill="url(#i2taGrad)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
          />
          <motion.path
            d="M0,55 L40,52 L80,48 L120,44 L160,38 L200,32 L240,22 L280,18 L320,12 L360,7 L400,4"
            stroke="#D2FF28"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
          />
        </svg>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-white/10 mz-mono text-[10px] text-white/55">
        <span>Arquitetura preparada pra</span>
        <span className="text-primary font-bold">10× growth</span>
        <span>sem refactor.</span>
      </div>
    </div>
  )
}

function VizZeusDefi() {
  const trades = [
    { route: 'RAY→USDC→SOL→RAY', profit: '+$847', ms: '180' },
    { route: 'ORCA→USDC→JUP→ORCA', profit: '+$312', ms: '220' },
    { route: 'mSOL→USDC→SOL→mSOL', profit: '+$1.2k', ms: '165' },
    { route: 'PYTH→USDC→SOL→PYTH', profit: '+$93', ms: '240' },
  ]
  return (
    <div className="flex flex-col gap-4 h-full relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/50">
          <Zap className="h-3 w-3" />
          zeus.solana / arbitrage
        </div>
        <span className="mz-tag">MAINNET</span>
      </div>

      {/* Stats principais */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'PROFIT 24H', value: '$12.4k' },
          { label: 'TRADES', value: '847' },
          { label: 'WIN RATE', value: '97.2%' },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-md border border-white/10 bg-background/60 p-2.5 text-center"
          >
            <div className="text-lg font-bold text-primary text-glow">{m.value}</div>
            <div className="mz-mono text-[9px] uppercase tracking-wider text-white/40 mt-0.5">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Flash loan status */}
      <div className="rounded-md border border-white/10 bg-background/60 p-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="mz-mono text-[9px] uppercase tracking-widest text-white/40">
            FLASH LOAN POOL
          </span>
          <span className="mz-tag" style={{ fontSize: 9 }}>
            ARMED ⚡
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="mz-mono text-[11px] text-white/70">Solend · max borrow</span>
          <span className="mz-mono text-[11px] text-primary">2.4M USDC</span>
        </div>
        <div className="h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '86%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="h-full bg-primary shadow-[0_0_8px_rgba(210,255,40,0.5)]"
          />
        </div>
      </div>

      {/* Trades recentes */}
      <div className="flex flex-col gap-1.5">
        <span className="mz-mono text-[9px] uppercase tracking-widest text-white/40">
          RECENT ARBITRAGE
        </span>
        {trades.map((t, i) => (
          <motion.div
            key={t.route}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="flex items-center justify-between px-2.5 py-1.5 rounded-md border border-white/5 bg-background/50 mz-mono text-[10px] gap-3"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <ArrowRight className="h-2.5 w-2.5 text-white/40 flex-shrink-0" />
              <span className="text-white/85 truncate">{t.route}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-white/40 text-[9px]">{t.ms}ms</span>
              <span className="text-primary font-bold">{t.profit}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function VizGlomamSite() {
  const vitals = [
    { label: 'LCP', value: '0.8s', pct: 95, good: true },
    { label: 'FID', value: '12ms', pct: 98, good: true },
    { label: 'CLS', value: '0.02', pct: 96, good: true },
  ]
  const edges = [
    'São Paulo · br-gru',
    'Virgínia · us-east',
    'Dublin · eu-west',
    'Singapura · ap-se',
  ]
  return (
    <div className="flex flex-col gap-4 h-full relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/50">
          <Globe className="h-3 w-3" />
          glomam.site / edge
        </div>
        <span className="mz-tag">99.99% UPTIME</span>
      </div>

      {/* Stats principais */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'CONCURRENT', value: '18k' },
          { label: 'REQ/S', value: '120k' },
          { label: 'TTFB', value: '42ms' },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-md border border-white/10 bg-background/60 p-2.5 text-center"
          >
            <div className="text-lg font-bold text-primary text-glow">{m.value}</div>
            <div className="mz-mono text-[9px] uppercase tracking-wider text-white/40 mt-0.5">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Core Web Vitals */}
      <div className="rounded-md border border-white/10 bg-background/60 p-3 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="mz-mono text-[9px] uppercase tracking-widest text-white/40">
            CORE WEB VITALS
          </span>
          <span className="text-primary mz-mono text-[9px]">✓ All green</span>
        </div>
        {vitals.map((v) => (
          <div key={v.label} className="flex items-center gap-3">
            <span className="mz-mono text-[10px] text-white/60 w-8">{v.label}</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${v.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-primary shadow-[0_0_8px_rgba(210,255,40,0.5)]"
              />
            </div>
            <span className="mz-mono text-[10px] text-primary w-14 text-right">
              {v.value}
            </span>
          </div>
        ))}
      </div>

      {/* Edge locations */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between mb-1">
          <span className="mz-mono text-[9px] uppercase tracking-widest text-white/40 flex items-center gap-1.5">
            <Server className="h-3 w-3" /> EDGE LOCATIONS
          </span>
          <span className="text-[9px] mz-mono text-primary">4 / 4 healthy</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {edges.map((e, i) => (
            <motion.div
              key={e}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md border border-white/5 bg-background/40 mz-mono text-[10px]"
            >
              <span className="mz-dot" style={{ width: 5, height: 5 }} />
              <span className="text-white/75 truncate">{e}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══════════ DADOS DOS 3 CASES ═══════════ */

interface CaseData {
  number: string
  icon: typeof Monitor
  tag: string
  client: string
  codeSnippet: string   // linha de código que aparece no hover
  challenge: string
  result: string
  tech: string[]
  visual: ReactNode
}

const cases: CaseData[] = [
  {
    number: '01',
    icon: Monitor,
    tag: 'Plataforma Digital',
    client: 'IDASAM',
    codeSnippet: 'const idasam = await mazari.deploy({ stack: "crm+docs+auth" })',
    challenge:
      'Digitalizar operações complexas de um instituto ambiental e criar uma plataforma escalável do zero — com CRM, gerador de documentos, assinatura digital e gestão completa.',
    result:
      'Sistema em produção com milhares de interações, suíte documental completa, CRM com 5 tipos de stakeholder e integração com APIs externas.',
    tech: ['React 18', 'Node.js', 'PostgreSQL', 'Drizzle ORM', 'pdf-lib'],
    visual: <VizIdasamDashboard />,
  },
  {
    number: '02',
    icon: Code2,
    tag: 'Engenharia de Software',
    client: 'i2TA',
    codeSnippet: 'i2ta.build().scale({ growth: "10x", refactor: false })',
    challenge:
      'Desenvolver presença digital e infraestrutura tecnológica para instituto de inteligência e tecnologia aplicada com necessidades específicas do setor.',
    result:
      'Site institucional completo com brandbook integrado, sistema admin, gestão de conteúdo e arquitetura preparada para crescimento de 10x sem refatoração.',
    tech: ['Next.js', 'TypeScript', 'pnpm monorepo', 'Tailwind 4', 'Express 5'],
    visual: <VizI2taPerformance />,
  },
  {
    number: '03',
    icon: Zap,
    tag: 'DeFi · Flash Loan · Solana',
    client: 'Protocolo Zeus',
    codeSnippet:
      'await zeus.flashLoan({ amount, path: ["RAY","USDC","SOL"], profit: +2.3% })',
    challenge:
      'Projetar um protocolo DeFi capaz de executar flash loans e arbitragem automática em ambiente multi-DEX na rede Solana, com latência abaixo de 300ms e execução atômica em uma única transação.',
    result:
      'Protocolo em produção executando 800+ arbitragens diárias com 97% de win rate, explorando ineficiências entre Raydium, Orca, Jupiter e Meteora com flash loans do Solend — tudo em uma única tx atômica ou rollback completo.',
    tech: ['Rust', 'Anchor Framework', 'Solana Program Library', 'Jupiter SDK', 'Solend'],
    visual: <VizZeusDefi />,
  },
  {
    number: '04',
    icon: Globe,
    tag: 'Site Institucional · Alta Capacidade',
    client: 'GLOMAM',
    codeSnippet: 'glomam.site.render({ uptime: "99.99%", rps: 120000, edge: 4 })',
    challenge:
      'Construir um site institucional capaz de suportar tráfego massivo em eventos e lançamentos, com presença global, alta performance e identidade visual refinada para uma operação de relevância internacional.',
    result:
      'Site em produção com 99.99% de uptime, 120k req/s servidos a partir de 4 edge locations, Core Web Vitals todos no verde (LCP 0.8s) e arquitetura preparada pra picos de 18k usuários simultâneos.',
    tech: ['Next.js', 'Vercel Edge', 'TypeScript', 'Tailwind 4', 'CDN Multi-Region'],
    visual: <VizGlomamSite />,
  },
]

/* ═══════════ COMPONENTE CODENAME — texto do case com hover tech ═══════════ */

function CaseNameCode({
  name,
  code,
}: {
  name: string
  code: string
}) {
  const [hover, setHover] = useState(false)
  const [typedCount, setTypedCount] = useState(0)

  useEffect(() => {
    if (!hover) {
      setTypedCount(0)
      return
    }
    const id = setInterval(() => {
      setTypedCount((prev) => {
        if (prev >= code.length) {
          clearInterval(id)
          return prev
        }
        return prev + 1
      })
    }, 18)
    return () => clearInterval(id)
  }, [hover, code.length])

  return (
    <div
      className="flex flex-col gap-2 select-none"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Nome em mono, grande — com scramble sutil no hover */}
      <div className="relative inline-flex items-baseline gap-2 flex-wrap">
        <motion.span
          className="mz-mono text-[26px] sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-none cursor-default"
          animate={
            hover
              ? {
                  textShadow: [
                    '0 0 0 rgba(210,255,40,0)',
                    '2px 0 0 rgba(210,255,40,0.8), -2px 0 0 rgba(60,180,255,0.5)',
                    '0 0 24px rgba(210,255,40,0.6)',
                  ],
                }
              : { textShadow: '0 0 0 rgba(210,255,40,0)' }
          }
          transition={{ duration: 0.35 }}
        >
          {name}
        </motion.span>
        {/* cursor de console logo após o nome */}
        <motion.span
          animate={{ opacity: [0.15, 1, 0.15] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-[8px] sm:w-[10px] h-[20px] sm:h-[26px] md:h-[32px] bg-primary"
          style={{ boxShadow: '0 0 10px rgba(210,255,40,0.5)' }}
          aria-hidden="true"
        />
      </div>

      {/* Underline que pulsa no hover */}
      <motion.div
        initial={{ scaleX: 0.15, opacity: 0.3 }}
        animate={
          hover
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 0.15, opacity: 0.3 }
        }
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="h-[2px] origin-left bg-gradient-to-r from-primary via-primary to-transparent"
        style={{ maxWidth: '200px' }}
      />

      {/* Linha de código que aparece no hover (typing) */}
      <div
        className="mz-mono text-[10px] sm:text-[11px] md:text-[12px] h-[22px] flex items-center gap-2 overflow-hidden"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          {hover ? (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2 min-w-0"
            >
              <span className="text-primary">▸</span>
              <span className="text-white/80 whitespace-nowrap overflow-hidden text-ellipsis">
                {code.slice(0, typedCount)}
              </span>
              {typedCount < code.length && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-[6px] h-[12px] bg-primary flex-shrink-0"
                />
              )}
            </motion.div>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="text-white/30 mz-mono text-[10px] uppercase tracking-widest"
            >
              ▸ hover to expand
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ═══════════ SEÇÃO ═══════════ */

export function Cases() {
  return (
    <section id="cases" className="relative py-28 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 mz-grid-bg opacity-30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(210,255,40,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 z-10 overflow-x-hidden">
        {/* Header */}
        <DecoratedHeading
          tag="03. Casos Reais"
          text="Projetos que Provam"
          accent="o que Prometemos."
          subhead="Três entregas em produção. Cada uma com stack diferente, desafio diferente, stakeholders diferentes — mesmo padrão Mazari de engenharia."
          className="mb-20 md:mb-24"
        />

        {/* Lista zigzag de cases */}
        <div className="flex flex-col gap-12 sm:gap-16 md:gap-24">
          {cases.map((c, i) => (
            <CaseRow key={c.client} caseData={c} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 flex justify-center"
        >
          <MzButton
            variant="ghost"
            onClick={() =>
              document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Ser Nosso Próximo Case
          </MzButton>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════ LINHA DE CADA CASE (zigzag) ═══════════ */

function CaseRow({ caseData, index }: { caseData: CaseData; index: number }) {
  const reverse = index % 2 === 1
  const Icon = caseData.icon

  return (
    <div className="relative">
      {/* Número gigante decorativo */}
      <div
        className={`absolute ${
          reverse ? 'left-0 md:-left-10' : 'right-0 md:-right-10'
        } -top-8 sm:-top-14 md:-top-20 text-[70px] sm:text-[140px] md:text-[220px] font-extrabold leading-none text-primary/[0.07] select-none pointer-events-none mz-mono`}
      >
        {caseData.number}
      </div>

      <div
        className={`relative grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-14 items-center ${
          reverse ? 'md:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* Coluna de TEXTO */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          {/* Tag + ícone */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <Icon className="h-4 w-4" />
            </div>
            <span className="mz-tag">{caseData.tag}</span>
          </div>

          {/* Nome em código — hover revela linha técnica */}
          <CaseNameCode name={caseData.client} code={caseData.codeSnippet} />

          {/* Desafio + Resultado */}
          <div className="flex flex-col gap-4 pt-2">
            <div>
              <div className="mz-mono text-[9px] uppercase tracking-widest text-white/40 mb-2 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-white/40" /> DESAFIO
              </div>
              <p className="text-sm md:text-base text-white/65 leading-relaxed">
                {caseData.challenge}
              </p>
            </div>
            <div>
              <div className="mz-mono text-[9px] uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                <span className="mz-dot" style={{ width: 5, height: 5 }} /> RESULTADO
              </div>
              <p className="text-sm md:text-base text-white/85 leading-relaxed">
                {caseData.result}
              </p>
            </div>
          </div>

          {/* Stack usado */}
          <div className="flex flex-wrap gap-2 pt-2">
            {caseData.tech.map((t) => (
              <span
                key={t}
                className="mz-mono text-[10px] px-2.5 py-1 rounded border border-white/10 bg-background/40 text-white/60"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Link externo sutil */}
          <button
            type="button"
            className="group self-start flex items-center gap-1.5 mt-1 text-xs mz-mono uppercase tracking-widest text-white/40 hover:text-primary transition-colors"
          >
            <span>ver estudo completo</span>
            <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>

        {/* Coluna VISUAL */}
        <FloatingCard side={reverse ? 'left' : 'right'}>
          {caseData.visual}
        </FloatingCard>
      </div>

      {/* Splitter horizontal abaixo de cada row (menos na última) */}
      {index < cases.length - 1 && (
        <div className="mt-16 md:mt-24">
          <GradientSplitter />
        </div>
      )}
    </div>
  )
}
