import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Code2, Globe2, ShieldCheck, Activity, Wallet, GitBranch } from 'lucide-react'
import { SplitText } from '../ui/SplitText'
import { IntegrationsList } from '../ui/IntegrationsList'

interface Pipeline {
  step: number
  navLabel: string
  title: string
  lead: string
  bullets: string[]
  screen: ReactNode
}

/* ═══════════════════════ VISUAIS DA DIREITA ═══════════════════════ */

function ScreenInfra() {
  return (
    <div className="mz-card-soft p-4 sm:p-6 md:p-8 h-full flex flex-col gap-5 relative overflow-hidden">
      <div
        className="absolute inset-0 mz-grid-bg opacity-40 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/50">
          <span className="mz-dot" />
          mazari.ops / production
        </div>
        <span className="mz-tag">LIVE</span>
      </div>

      <div className="relative grid grid-cols-3 gap-3">
        {[
          { label: 'UPTIME', value: '99.97%', icon: <Activity className="h-3 w-3" /> },
          { label: 'LATÊNCIA P95', value: '42ms', icon: <Activity className="h-3 w-3" /> },
          { label: 'DEPLOYS', value: '1.2k', icon: <GitBranch className="h-3 w-3" /> },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-md border border-white/10 bg-background/60 p-3 flex flex-col gap-1"
          >
            <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-white/40 mz-mono">
              {m.icon}
              {m.label}
            </div>
            <div className="text-xl font-bold text-primary text-glow">{m.value}</div>
          </div>
        ))}
      </div>

      {/* Mini-chart de área */}
      <div className="relative rounded-md border border-white/10 bg-background/60 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] uppercase tracking-widest text-white/40 mz-mono">
            Throughput (últimos 90d)
          </span>
          <span className="text-[10px] mz-mono text-primary">+34.8%</span>
        </div>
        <svg viewBox="0 0 400 100" className="w-full h-24" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D2FF28" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#D2FF28" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,80 L40,72 L80,65 L120,68 L160,55 L200,48 L240,40 L280,32 L320,28 L360,18 L400,10 L400,100 L0,100 Z"
            fill="url(#chartGrad)"
          />
          <path
            d="M0,80 L40,72 L80,65 L120,68 L160,55 L200,48 L240,40 L280,32 L320,28 L360,18 L400,10"
            stroke="#D2FF28"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative flex flex-col gap-2 mz-mono text-[11px] text-white/60">
        <div className="flex justify-between">
          <span>» k8s pods running</span>
          <span className="text-primary">148 / 148</span>
        </div>
        <div className="flex justify-between">
          <span>» postgres replicas</span>
          <span className="text-primary">3 healthy</span>
        </div>
        <div className="flex justify-between">
          <span>» CI pipelines (24h)</span>
          <span className="text-primary">47 passed · 0 failed</span>
        </div>
      </div>
    </div>
  )
}

// Dot map 60×24 — '#' = terra, ' ' = oceano. Projeção equirectangular.
const WORLD_MAP: string[] = [
  '                                                            ',
  '             ##                           ##                ',
  '     #####   ###       ###    #############                ',
  '    #########  ##    #####    ##################           ',
  '   ############    #######    ########################     ',
  '   ##############  #######    #########################    ',
  '    ##############  ###       ####   ##################    ',
  '     ############      ####   ####   #################  ## ',
  '      ##########       #####  ####   ############    ###   ',
  '       ########         ####   ####  ###########           ',
  '        #####   #       ####   ##### #########  ##         ',
  '         ####              ####### #######  #   ####       ',
  '          ######           #######   ####      #####       ',
  '          #######        #######     #          ####   ##  ',
  '          ########        ######                 ######    ',
  '           #######         #####                   ####    ',
  '            ######          ####                  ####     ',
  '            #####           ##                     ###     ',
  '             ####                                    #     ',
  '              ##                                           ',
  '               #                                           ',
  '        ###################                                ',
  '       #####################                               ',
  '         ###############                                   ',
]

function ScreenGlobal() {
  const nodes = [
    { x: 23.7, y: 21.1, city: 'Austin' },     // US (30°N, -97°)
    { x: 34.2, y: 32.3, city: 'Manaus' },     // BR (-3°, -60°)
    { x: 48.3, y: 18.4, city: 'Lisboa' },     // PT (38°N, -9°)
    { x: 66.2, y: 22.9, city: 'Dubai' },      // AE (25°N, 55°)
    { x: 79.7, y: 30.8, city: 'Singapura' },  // SG (1°N, 103°)
  ]

  // Dimensões do viewBox e da matriz
  const VB_W = 100
  const VB_H = 60
  const COLS = 60
  const ROWS = 24
  const dx = VB_W / COLS
  const dy = VB_H / ROWS
  return (
    <div className="mz-card-soft p-4 sm:p-6 md:p-8 h-full flex flex-col gap-5 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/50">
          <Globe2 className="h-3 w-3" />
          mazari.globe
        </div>
        <span className="mz-tag">5 continentes</span>
      </div>

      {/* Dot map mundial */}
      <div className="relative rounded-md border border-white/10 bg-background/60 p-4">
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full h-auto">
          {/* Equador + Greenwich — referência sutil */}
          <g stroke="rgba(210,255,40,0.07)" strokeWidth="0.15">
            <line x1="0" y1={VB_H / 2} x2={VB_W} y2={VB_H / 2} />
            <line x1={VB_W / 2} y1="0" x2={VB_W / 2} y2={VB_H} />
          </g>

          {/* Pontos formando os continentes */}
          <g fill="rgba(210,255,40,0.45)">
            {WORLD_MAP.flatMap((line, row) => {
              const padded = line.padEnd(COLS, ' ')
              const dots: React.ReactNode[] = []
              for (let col = 0; col < COLS; col++) {
                if (padded[col] === '#') {
                  const cx = col * dx + dx / 2
                  const cy = row * dy + dy / 2
                  dots.push(
                    <circle
                      key={`${row}-${col}`}
                      cx={cx}
                      cy={cy}
                      r={0.55}
                    />,
                  )
                }
              }
              return dots
            })}
          </g>

          {/* Hubs pulsantes */}
          {nodes.map((n) => (
            <g key={n.city}>
              <circle cx={n.x} cy={n.y} r="2.5" fill="rgba(210,255,40,0.18)">
                <animate
                  attributeName="r"
                  values="2;4;2"
                  dur="2.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.55;0.1;0.55"
                  dur="2.6s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx={n.x}
                cy={n.y}
                r="1.3"
                fill="#D2FF28"
                style={{ filter: 'drop-shadow(0 0 3px rgba(210,255,40,0.9))' }}
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2 mz-mono text-[10px]">
        {nodes.map((n) => (
          <div key={n.city} className="flex items-center gap-2">
            <span className="mz-dot" style={{ width: 4, height: 4 }} />
            <span className="text-white/70">{n.city}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
        <div className="flex flex-col gap-1">
          <span className="mz-mono text-[9px] uppercase text-white/40">Engenharia</span>
          <span className="text-sm font-bold text-white flex items-center gap-1.5">
            <Code2 className="h-3 w-3 text-primary" /> Full-stack
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="mz-mono text-[9px] uppercase text-white/40">Blockchain</span>
          <span className="text-sm font-bold text-white flex items-center gap-1.5">
            <Wallet className="h-3 w-3 text-primary" /> Web3
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="mz-mono text-[9px] uppercase text-white/40">Inteligência</span>
          <span className="text-sm font-bold text-white flex items-center gap-1.5">
            <Activity className="h-3 w-3 text-primary" /> IA
          </span>
        </div>
      </div>
    </div>
  )
}

function ScreenVault() {
  return (
    <div className="mz-card-soft p-4 sm:p-6 md:p-8 h-full flex flex-col gap-5 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/50">
          <ShieldCheck className="h-3 w-3" />
          mazari.vault / propriedade
        </div>
        <span className="mz-tag">IP 100% do cliente</span>
      </div>

      <div className="flex flex-col gap-2">
        {[
          { name: 'source-code.git', owner: 'CLIENT', hash: '0x4f29…7b1a' },
          { name: 'smart-contracts/', owner: 'CLIENT', hash: '0xa81e…9cc2' },
          { name: 'infra-as-code.tf', owner: 'CLIENT', hash: '0xd033…42f1' },
          { name: 'design-system', owner: 'CLIENT', hash: '0x17ba…ef80' },
        ].map((f) => (
          <div
            key={f.name}
            className="flex items-center justify-between px-3 py-2 rounded-md border border-white/10 bg-background/60 mz-mono text-[11px]"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="mz-dot" style={{ width: 4, height: 4 }} />
              <span className="text-white/85 truncate">{f.name}</span>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <span className="text-[9px] uppercase tracking-widest text-white/40">
                owner {f.owner}
              </span>
              <span className="text-primary">{f.hash}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-4 grid grid-cols-3 gap-3">
        <div>
          <div className="text-2xl font-bold text-primary text-glow">30+</div>
          <div className="mz-mono text-[9px] uppercase tracking-wider text-white/40">
            Smart contracts
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-primary text-glow">10+</div>
          <div className="mz-mono text-[9px] uppercase tracking-wider text-white/40">
            Anos em produção
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-primary text-glow">0</div>
          <div className="mz-mono text-[9px] uppercase tracking-wider text-white/40">
            Vendor-lock
          </div>
        </div>
      </div>

      <div className="mz-mono text-[11px] text-white/55 leading-relaxed border-t border-white/10 pt-4">
        <span className="text-primary">/*</span> Contratos, repositórios, infraestrutura e
        modelos sempre transferíveis. Saímos quando vocês não precisam mais —{' '}
        <span className="text-white/85">sem dívida técnica, sem dependência.</span>{' '}
        <span className="text-primary">*/</span>
      </div>
    </div>
  )
}

/* ═══════════════════════ DADOS DOS 3 PIPELINES ═══════════════════════ */

const pipelines: Pipeline[] = [
  {
    step: 1,
    navLabel: 'escala real',
    title: 'Construímos para escala real',
    lead: 'A Mazari Corp nasceu da obsessão por construir tecnologia que funciona em escala real.',
    bullets: [
      'Código revisado, testado e observável desde o primeiro commit',
      'Infraestrutura cloud-native dimensionada pra crescer 10x sem reescrita',
      'Decisões técnicas que envelhecem bem — sem migração emergencial',
    ],
    screen: <ScreenInfra />,
  },
  {
    step: 2,
    navLabel: 'três frentes',
    title: 'Três frentes. Uma engenharia.',
    lead: 'Opera em 5 continentes combinando engenharia de software, blockchain e inteligência artificial em um único time sênior.',
    bullets: [
      'Engenharia de software senior (web, mobile, sistemas corporativos)',
      'Blockchain e tokenização: 10+ anos de Solidity, 30+ tokens lançados',
      'IA aplicada: análise preditiva, NLP, automação cognitiva',
    ],
    screen: <ScreenGlobal />,
  },
  {
    step: 3,
    navLabel: 'vantagem permanente',
    title: 'Vantagem competitiva permanente',
    lead: 'Nosso time não entrega projetos. Entrega vantagens competitivas permanentes.',
    bullets: [
      'Propriedade intelectual sempre do cliente — zero vendor-lock',
      'Modelo de parceria, não de fornecedor — continuidade até o resultado',
      'Hand-off limpo: vocês assumem sem dívida técnica',
    ],
    screen: <ScreenVault />,
  },
]

/* ═══════════════════════ SEÇÃO PRINCIPAL ═══════════════════════ */

export function About() {
  return (
    <section id="sobre" className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="grid md:grid-cols-[1.1fr,1fr] gap-8 md:gap-16 mb-12 md:mb-24 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="mz-tag mb-5">Sobre Nós</div>
            <h2 className="text-[30px] sm:text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
              <SplitText text="Não Somos Uma Agência." as="span" />
              <br />
              <span className="text-primary italic font-serif font-medium text-glow">
                <SplitText
                  text="Somos Arquitetos de Infraestrutura Digital."
                  as="span"
                  delay={0.3}
                />
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <p className="text-base md:text-lg text-white/65 leading-relaxed">
              Três atos que resumem quem somos. A cada etapa, a gente mostra como isso
              aparece em produção — não é manifesto, é operação.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/10">
              {[
                { value: '10+', label: 'Anos em produção' },
                { value: '30+', label: 'Projetos entregues' },
                { value: '5', label: 'Continentes ativos' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    {s.value}
                  </span>
                  <span className="text-[10px] mz-mono uppercase tracking-widest text-white/45 mt-1">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Nav numerado (tipo "connect data / define schema / invoke agent") */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:gap-4 md:gap-10 mb-14 sm:mb-20 border-y border-white/10 py-5 sm:py-6"
        >
          {pipelines.map((p, i) => (
            <div key={p.step} className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center mz-mono text-[10px] sm:text-xs text-primary font-bold">
                  {p.step}
                </div>
                <span className="mz-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-white/60">
                  {p.navLabel}
                </span>
              </div>
              {i < pipelines.length - 1 && (
                <div className="hidden md:block w-10 h-px bg-gradient-to-r from-primary/40 to-primary/10" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Pipelines sticky */}
        <div className="flex flex-col gap-4">
          {pipelines.map((p) => (
            <PipelineRow key={p.step} pipeline={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════ LINHA COM STICKY ═══════════════════════ */

function PipelineRow({ pipeline }: { pipeline: Pipeline }) {
  return (
    <div className="relative grid md:grid-cols-[0.9fr,1.1fr] gap-6 md:gap-16 py-8 sm:py-12 md:py-20 border-t border-white/10">
      {/* Coluna esquerda — STICKY (só em desktop) */}
      <div className="md:sticky md:top-32 self-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 sm:gap-5"
        >
          <span className="mz-tag w-fit">Step {String(pipeline.step).padStart(2, '0')}.</span>
          <h3 className="text-xl sm:text-2xl md:text-4xl font-bold leading-tight tracking-tight">
            {pipeline.title}
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-white/65 leading-relaxed">
            {pipeline.lead}
          </p>
          <IntegrationsList items={pipeline.bullets} className="mt-2" />
        </motion.div>
      </div>

      {/* Coluna direita — rola livremente */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6 }}
        className="min-h-[40vh] md:min-h-[60vh] flex items-center"
      >
        <div className="w-full">{pipeline.screen}</div>
      </motion.div>
    </div>
  )
}
