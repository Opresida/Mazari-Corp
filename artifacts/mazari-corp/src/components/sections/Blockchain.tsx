import { motion } from 'framer-motion'
import { DecoratedHeading } from '../ui/DecoratedHeading'
import { AssetCard } from '../ui/AssetCard'
import { MzButton } from '../ui/MzButton'
import { SolidityRain } from '../effects/SolidityRain'

/* ════════════ VISUALIZAÇÕES SVG INLINE (um por card) ════════════ */

function VizTokenization() {
  const tokens = [
    { h: '0x4f29…7b1a', label: 'REAL-ESTATE' },
    { h: '0x9c22…f3e5', label: 'COMMODITY' },
    { h: '0xa81e…9cc2', label: 'EQUITY' },
    { h: '0xd033…42f1', label: 'DEBT' },
  ]
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-[9px] mz-mono uppercase tracking-widest text-white/40 mb-1">
        <span>ASSETS_TOKENIZED</span>
        <span className="text-primary">30+</span>
      </div>
      {tokens.map((t) => (
        <div
          key={t.h}
          className="flex items-center justify-between px-3 py-2 rounded-md border border-white/10 bg-background/50 mz-mono text-[10px]"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="mz-dot" style={{ width: 5, height: 5 }} />
            <span className="text-white/80">{t.label}</span>
          </div>
          <span className="text-primary truncate">{t.h}</span>
        </div>
      ))}
    </div>
  )
}

function VizSmartContract() {
  return (
    <div className="rounded-md border border-white/10 bg-background/60 p-4 font-mono text-[10px] leading-5 text-white/70 relative overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400/50" />
          <span className="w-2 h-2 rounded-full bg-yellow-400/50" />
          <span className="w-2 h-2 rounded-full bg-primary" />
        </div>
        <span className="text-[9px] uppercase tracking-widest text-white/30">
          MazariVault.sol
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        <div>
          <span className="text-primary">contract</span>{' '}
          <span className="text-white">MazariVault</span>{' '}
          <span className="text-white/40">{'{'}</span>
        </div>
        <div className="pl-3">
          <span className="text-white/40">mapping</span>(
          <span className="text-primary">address</span> =&gt;{' '}
          <span className="text-primary">uint256</span>) balances;
        </div>
        <div className="pl-3">
          <span className="text-primary">function</span>{' '}
          <span className="text-white">deposit</span>(){' '}
          <span className="text-white/40">payable</span> {'{'}
        </div>
        <div className="pl-6">balances[msg.sender] += msg.value;</div>
        <div className="pl-6 text-primary">
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{ display: 'inline-block' }}
          >
            ▊
          </motion.span>
        </div>
        <div className="pl-3 text-white/40">{'}'}</div>
        <div className="text-white/40">{'}'}</div>
      </div>
      <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] mz-mono">
        <span className="text-white/40">AUDIT</span>
        <span className="text-primary flex items-center gap-1">
          <span className="mz-dot" style={{ width: 4, height: 4 }} /> PASSED
        </span>
      </div>
    </div>
  )
}

function VizDefi() {
  const pools = [
    { name: 'ETH/USDC', tvl: '$2.1M', apr: '18.4%', pct: 82 },
    { name: 'MZR/ETH', tvl: '$840k', apr: '32.7%', pct: 56 },
    { name: 'stETH/wBTC', tvl: '$1.4M', apr: '12.1%', pct: 68 },
  ]
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-[9px] mz-mono uppercase tracking-widest text-white/40">
        <span>LIQUIDITY_POOLS</span>
        <span className="text-primary">TVL $4.3M</span>
      </div>
      {pools.map((p) => (
        <div key={p.name} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between mz-mono text-[10px]">
            <span className="text-white/85">{p.name}</span>
            <div className="flex items-center gap-3">
              <span className="text-white/50">{p.tvl}</span>
              <span className="text-primary">APR {p.apr}</span>
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${p.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-primary shadow-[0_0_10px_rgba(210,255,40,0.5)]"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function VizConsulting() {
  const steps = [
    { step: 'Tokenomics', status: 'done' },
    { step: 'Whitepaper técnico', status: 'done' },
    { step: 'Auditoria de segurança', status: 'running' },
    { step: 'Estruturação de captação', status: 'pending' },
  ]
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between text-[9px] mz-mono uppercase tracking-widest text-white/40 mb-1">
        <span>ADVISORY_PIPELINE</span>
        <span className="text-primary">Web3_READY</span>
      </div>
      {steps.map((s) => {
        const color =
          s.status === 'done'
            ? 'text-primary'
            : s.status === 'running'
              ? 'text-amber-300/80'
              : 'text-white/30'
        return (
          <div
            key={s.step}
            className="flex items-center gap-3 px-3 py-2 rounded-md border border-white/10 bg-background/50"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                s.status === 'done'
                  ? 'bg-primary shadow-[0_0_8px_rgba(210,255,40,0.6)]'
                  : s.status === 'running'
                    ? 'bg-amber-300 animate-pulse'
                    : 'bg-white/20'
              }`}
            />
            <span className="mz-mono text-[11px] text-white/85 flex-1">{s.step}</span>
            <span className={`mz-mono text-[9px] uppercase tracking-widest ${color}`}>
              {s.status === 'done' ? '✓ ok' : s.status === 'running' ? 'running' : '…'}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ════════════ DADOS DOS 4 CARDS ════════════ */

const assets = [
  {
    title: 'Tokenização de Ativos',
    caption: 'Real Estate · Commodity · Equity',
    description:
      'Imóveis, commodities, participações societárias. Estruturamos emissão, custódia, compliance e liquidez — da análise regulatória ao deploy em mainnet.',
    visual: <VizTokenization />,
  },
  {
    title: 'Smart Contracts em Produção',
    caption: 'Solidity · Auditoria · Multi-chain',
    description:
      '10+ anos escrevendo Solidity. Padrões de segurança institucional, testes automatizados e auditoria externa antes de qualquer deploy em valor real.',
    visual: <VizSmartContract />,
  },
  {
    title: 'DeFi & Protocolos',
    caption: 'Pools · Staking · Yield · Governança',
    description:
      'Pools de liquidez, staking, yield farming e governança descentralizada. Contratos battle-tested prontos pra TVL em produção.',
    visual: <VizDefi />,
  },
  {
    title: 'Consultoria Web3',
    caption: 'Tokenomics · Whitepaper · Captação',
    description:
      'Desenho de tokenomics, whitepaper técnico, auditoria e estruturação completa pra captação institucional — ICO, IEO, Launchpad ou private round.',
    visual: <VizConsulting />,
  },
]

/* ════════════ SEÇÃO ════════════ */

export function Blockchain() {
  return (
    <section id="blockchain" className="relative py-28 md:py-32 overflow-hidden">
      {/* Background: código Solidity subindo (efeito "matrix rain" sutil) */}
      <div className="absolute inset-0 opacity-[0.35] pointer-events-none">
        <SolidityRain />
      </div>

      {/* Overlay radial pra destacar o conteúdo central */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 65% at 50% 50%, rgba(8,9,8,0.75) 0%, rgba(8,9,8,0.92) 60%, rgba(8,9,8,0.98) 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 z-10">
        {/* Header centralizado com setas decorativas convergentes */}
        <DecoratedHeading
          tag="02. Blockchain & Web3"
          text="Tokenização, Smart Contracts"
          accent="e a Nova Economia Digital."
          subhead="30+ tokens lançados. 10+ anos escrevendo Solidity. A Mazari Corp é referência em engenharia blockchain pra projetos que exigem segurança absoluta e execução impecável."
          className="mb-20 md:mb-24"
        />

        {/* Grid 2x2 de asset cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {assets.map((a, i) => (
            <AssetCard
              key={a.title}
              title={a.title}
              caption={a.caption}
              description={a.description}
              visual={a.visual}
              delay={i * 0.08}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <MzButton
            variant="primary"
            onClick={() =>
              document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Lançar Meu Token
          </MzButton>
        </motion.div>
      </div>
    </section>
  )
}
