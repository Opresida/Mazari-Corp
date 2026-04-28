import { useState, type ComponentType } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar, ShieldCheck, Wallet, FileSignature, ChevronDown,
  Printer, Copy, Check, Search, PenTool, Code2, Rocket,
} from 'lucide-react'
import { TabShell, Block } from './TabShell'
import { MzButton } from '@/components/ui/MzButton'

interface SectionItem {
  id: string
  number: string
  title: string
  summary: string
  body: ComponentType
}

const PROPOSAL_DATE = '04 / 2026'
const PROPOSAL_VALIDITY = '30 dias corridos a partir da data de emissão'

function CapaSection() {
  return (
    <div className="rounded-md border border-white/10 bg-background/70 overflow-hidden">
      <div className="relative aspect-[16/10] mz-grid-bg overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 45% at 50% 50%, rgba(210,255,40,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-0.5">
              <span className="mz-mono text-xl font-extrabold text-white tracking-tight">
                MAZARI
              </span>
              <span className="mz-mono text-xl font-extrabold text-primary">.</span>
            </div>
            <span className="mz-tag">Confidencial</span>
          </div>

          <div className="flex flex-col gap-3">
            <span className="mz-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              Proposta Comercial
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold leading-[1.05] tracking-tight">
              [Nome do Projeto] <br />
              <span className="text-primary italic font-serif font-medium">para [Cliente].</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mz-mono text-[10px] uppercase tracking-widest">
            <div className="flex flex-col gap-0.5">
              <span className="text-white/40">Emissão</span>
              <span className="text-white/85">{PROPOSAL_DATE}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-white/40">Validade</span>
              <span className="text-white/85">30 dias</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-white/40">Versão</span>
              <span className="text-white/85">v1.0</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-white/40">Sigilo</span>
              <span className="text-white/85">NDA · ON</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContextoSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-md border border-white/10 bg-background/60 p-5">
          <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45 block mb-2">
            Cliente
          </span>
          <p className="text-base text-white/90 leading-relaxed">
            <span className="text-white/45">[Razão social, CNPJ, endereço-sede, jurisdição operacional]</span>
          </p>
        </div>
        <div className="rounded-md border border-white/10 bg-background/60 p-5">
          <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45 block mb-2">
            Stakeholders
          </span>
          <p className="text-base text-white/90 leading-relaxed">
            <span className="text-white/45">[Sponsor executivo, Product Owner, ponto técnico, jurídico]</span>
          </p>
        </div>
      </div>

      <div className="rounded-md border border-white/10 bg-background/60 p-5">
        <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45 block mb-2">
          Cenário Atual
        </span>
        <p className="text-base text-white/85 leading-relaxed">
          [Descrever em 3-5 linhas o estado atual: o que existe, o que falta, restrição
          regulatória, prazo crítico, infraestrutura legada, integrações exigidas. Substitua
          este parágrafo pelo briefing real coletado na imersão.]
        </p>
      </div>

      <div className="rounded-md border border-primary/30 bg-primary/[0.04] p-5">
        <span className="mz-mono text-[10px] uppercase tracking-widest text-primary block mb-2">
          Objetivo da Mazari
        </span>
        <p className="text-base text-white/90 leading-relaxed">
          Entregar [produto/sistema/protocolo] em produção, com [métrica de sucesso
          mensurável] em até [prazo], operando sob padrão institucional, com IP 100% do
          cliente e hand-off limpo.
        </p>
      </div>
    </div>
  )
}

function EscopoSection() {
  const blocks = [
    {
      title: 'Discovery & Arquitetura',
      items: [
        'Workshop de descoberta com stakeholders (até 3 sessões)',
        'Mapa de riscos técnicos, regulatórios e operacionais',
        'Diagrama de sistema com fluxos de dados e integrações',
        'Definição de stack tecnológica e cronograma de sprints',
        'KPIs mensuráveis e critério de aceite formal',
      ],
    },
    {
      title: 'Construção',
      items: [
        'Sprints quinzenais com ambiente de staging desde o dia 1',
        'Code review obrigatório, suíte de testes, observabilidade',
        'Documentação viva (wiki técnica + runbooks)',
        'Demo + ajuste de rota a cada fim de sprint',
        'Repositório no GitHub privado do cliente',
      ],
    },
    {
      title: 'Lançamento',
      items: [
        'Deploy em produção com observabilidade configurada',
        'Performance tuning até atingir SLA combinado',
        'Penetration test interno antes do go-live',
        'Plano de rollback documentado',
        'Smoke tests + verificação de health checks',
      ],
    },
    {
      title: 'Pós-Entrega',
      items: [
        'Hand-off técnico completo (treinamento + docs)',
        'Janela de hypercare de 30 dias após go-live',
        'Otimização baseada em métricas reais',
        'Opção de continuidade via contrato de operação',
      ],
    },
  ]

  const outOfScope = [
    'Aquisição de licenças de terceiros (cloud, APIs pagas, certificados)',
    'Conteúdo editorial, fotografia, copy de marketing',
    'Tradução para idiomas além de PT-BR e EN',
    'Suporte 24×7 (sob contrato separado de operação)',
    'Migração de dados de sistemas legados (escopo separado)',
  ]

  return (
    <div className="flex flex-col gap-5">
      <div className="grid md:grid-cols-2 gap-4">
        {blocks.map((b) => (
          <div
            key={b.title}
            className="rounded-md border border-white/10 bg-background/60 p-5"
          >
            <h4 className="text-base font-bold text-white mb-3">{b.title}</h4>
            <ul className="flex flex-col gap-2 text-sm text-white/75">
              {b.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary mt-1 flex-shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-md border border-red-500/25 bg-red-500/[0.04] p-5">
        <h4 className="mz-mono text-[10px] uppercase tracking-widest text-red-400 font-bold mb-3">
          Fora do Escopo
        </h4>
        <ul className="flex flex-col gap-1.5 text-sm text-white/70">
          {outOfScope.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-red-400/70 mt-0.5 flex-shrink-0">×</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[12px] mz-mono text-white/45">
          Itens fora do escopo podem ser contratados como adendo, com orçamento à parte.
        </p>
      </div>
    </div>
  )
}

function CronogramaSection() {
  const phases = [
    { icon: Search, name: 'Imersão', weeks: 'Sem 1–2', deliverables: 'Workshop · Mapa de riscos · Spec funcional' },
    { icon: PenTool, name: 'Arquitetura', weeks: 'Sem 3', deliverables: 'Diagrama · Stack · Cronograma · Aceite formal' },
    { icon: Code2, name: 'Construção', weeks: 'Sem 4–11', deliverables: '4 sprints · Demos quinzenais · Staging contínuo' },
    { icon: Rocket, name: 'Lançamento', weeks: 'Sem 12', deliverables: 'Deploy · Pentest · Hypercare 30d' },
  ]
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border border-white/10 bg-background/60 p-5">
        <div className="flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/45 mb-4">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          Duração estimada · 12 semanas
        </div>

        {/* Gantt simplificado */}
        <div className="flex flex-col gap-3">
          {phases.map((p, i) => {
            const start = [0, 16, 25, 92][i]
            const end = [16, 25, 92, 100][i]
            const width = end - start
            const Icon = p.icon
            return (
              <div key={p.name} className="grid grid-cols-[140px,1fr] gap-3 items-center">
                <div className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-white">{p.name}</span>
                    <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
                      {p.weeks}
                    </span>
                  </div>
                </div>
                <div className="relative h-7 rounded bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0, x: `${start}%` }}
                    whileInView={{ width: `${width}%`, x: `${start}%` }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
                    className="absolute top-0 bottom-0 bg-gradient-to-r from-primary/30 to-primary border border-primary/50"
                    style={{ borderRadius: 3 }}
                  />
                  <div
                    className="relative z-10 h-full flex items-center px-3 mz-mono text-[10px] uppercase tracking-widest text-background font-bold"
                    style={{ marginLeft: `${start}%` }}
                  >
                    {width >= 25 ? p.deliverables : ''}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Régua */}
        <div className="grid grid-cols-12 gap-px mt-4 pt-3 border-t border-white/10">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="mz-mono text-[9px] uppercase tracking-widest text-white/30 text-center"
            >
              S{i + 1}
            </span>
          ))}
        </div>
      </div>

      <p className="text-sm text-white/60 leading-relaxed">
        Cronograma de referência. Ajustes finos definidos no fim da fase de arquitetura,
        com aceite formal pelo Product Owner antes do primeiro commit de produção.
      </p>
    </div>
  )
}

function InvestimentoSection() {
  const lineItems = [
    { label: 'Discovery & Arquitetura', subtotal: 'R$ [valor]', desc: 'Sprint 0 — workshop, riscos, stack, cronograma' },
    { label: 'Construção (4 sprints)', subtotal: 'R$ [valor]', desc: 'Time sênior dedicado · staging contínuo · demos' },
    { label: 'Lançamento & Hypercare', subtotal: 'R$ [valor]', desc: 'Deploy · pentest · 30 dias de hypercare' },
    { label: 'Hand-off técnico', subtotal: 'Incluído', desc: 'Wiki · runbooks · treinamento da equipe interna' },
  ]

  const conditions = [
    { label: 'Modalidade', value: 'Fixo por escopo · pagamento mensal' },
    { label: 'Sinal', value: '30% no aceite da proposta' },
    { label: 'Mensalidades', value: '4 parcelas iguais durante a execução' },
    { label: 'Saldo', value: '10% no go-live com aceite formal' },
    { label: 'Reembolsos', value: 'Despesas operacionais aprovadas, com NF' },
    { label: 'Reajuste', value: 'IPCA anual em contratos de continuidade' },
    { label: 'Moeda', value: 'BRL (BR) · USD (intl) · USDC (web3, on-chain)' },
  ]

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-md border border-white/10 bg-background/60 overflow-hidden">
        <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
          <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
            Composição do Investimento
          </span>
          <span className="mz-tag">v1.0</span>
        </div>
        <div className="divide-y divide-white/5">
          {lineItems.map((li) => (
            <div
              key={li.label}
              className="grid md:grid-cols-[1fr,140px] gap-3 px-5 py-4"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold text-white">{li.label}</span>
                <span className="text-xs text-white/55 leading-relaxed">{li.desc}</span>
              </div>
              <span className="mz-mono text-base text-primary text-left md:text-right">
                {li.subtotal}
              </span>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 border-t border-primary/20 bg-primary/[0.04] flex items-center justify-between">
          <span className="text-sm font-bold text-white">Total</span>
          <span className="mz-mono text-lg text-primary text-glow font-bold">
            R$ [TOTAL]
          </span>
        </div>
      </div>

      <div className="rounded-md border border-white/10 bg-background/60 p-5">
        <div className="flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/45 mb-4">
          <Wallet className="h-3.5 w-3.5 text-primary" />
          Condições Comerciais
        </div>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {conditions.map((c) => (
            <div key={c.label} className="flex flex-col gap-0.5">
              <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
                {c.label}
              </span>
              <span className="text-sm text-white/85">{c.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function GarantiasSection() {
  const items = [
    { icon: ShieldCheck, t: 'Sigilo absoluto', d: 'NDA mútuo disponível desde o primeiro contato. Sub-processadores informados.' },
    { icon: ShieldCheck, t: 'IP 100% do cliente', d: 'Todo código, design, documentação e contrato pertence ao cliente desde o commit 1.' },
    { icon: ShieldCheck, t: 'Zero vendor-lock', d: 'Stack escolhida com hand-off em mente. Sem componentes proprietários da Mazari.' },
    { icon: ShieldCheck, t: 'Padrão LGPD/GDPR', d: 'Mapeamento de dados pessoais, base legal, termo de tratamento e DPA.' },
  ]
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((i) => (
        <div key={i.t} className="rounded-md border border-primary/25 bg-primary/[0.04] p-5 flex gap-3">
          <i.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-white">{i.t}</span>
            <span className="text-xs text-white/70 leading-relaxed">{i.d}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function AceiteSection() {
  return (
    <div className="rounded-md border border-white/10 bg-background/60 p-6 md:p-8 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-primary">
          <FileSignature className="h-3.5 w-3.5" />
          Termo de Aceite
        </div>
        <p className="text-sm text-white/75 leading-relaxed">
          Ao assinar abaixo, o Cliente declara concordância com o escopo, cronograma,
          investimento e condições descritos nesta proposta. Esta proposta é válida por{' '}
          <strong className="text-white">{PROPOSAL_VALIDITY}</strong> e perderá efeito
          após esse período sem renovação formal.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 pt-4">
        <div className="flex flex-col gap-3">
          <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
            Pelo Cliente
          </span>
          <div className="border-b border-white/25 h-12" />
          <div className="flex flex-col gap-0.5 text-xs text-white/55">
            <span>Nome:</span>
            <span>Cargo:</span>
            <span>CPF/CNPJ:</span>
            <span>Data:</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
            Pela Mazari Corp
          </span>
          <div className="border-b border-primary/40 h-12 relative">
            <span className="absolute bottom-2 left-0 mz-mono text-[10px] uppercase tracking-widest text-white/30">
              ↳ assinatura digital · responsável Mazari Corp
            </span>
          </div>
          <div className="flex flex-col gap-0.5 text-xs text-white/55">
            <span>Nome: [Responsável Mazari Corp]</span>
            <span>Cargo: [Cargo do signatário]</span>
            <span>CNPJ: [Mazari Corp]</span>
            <span>Data: {PROPOSAL_DATE}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 mz-mono text-[10px] uppercase tracking-widest text-white/40 text-center">
        Mazari Corp · contrato@mazaricorp.com · mazaricorp.com
      </div>
    </div>
  )
}

const SECTIONS: SectionItem[] = [
  { id: 'capa', number: '01', title: 'Capa', summary: 'Cabeçalho institucional, cliente, projeto, validade', body: CapaSection },
  { id: 'contexto', number: '02', title: 'Contexto & Objetivo', summary: 'Cenário atual, stakeholders e meta da entrega', body: ContextoSection },
  { id: 'escopo', number: '03', title: 'Escopo', summary: 'Discovery · Construção · Lançamento · Pós-entrega · Out of scope', body: EscopoSection },
  { id: 'cronograma', number: '04', title: 'Cronograma', summary: '4 fases · 12 semanas · Gantt visual', body: CronogramaSection },
  { id: 'investimento', number: '05', title: 'Investimento', summary: 'Composição, condições, modalidades de pagamento', body: InvestimentoSection },
  { id: 'garantias', number: '06', title: 'Garantias', summary: 'NDA · IP · Vendor-lock zero · LGPD', body: GarantiasSection },
  { id: 'aceite', number: '07', title: 'Aceite & Assinaturas', summary: 'Termo de aceite, campos de assinatura, validade', body: AceiteSection },
]

export function TabProposal() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['capa', 'contexto', 'escopo']))
  const [copied, setCopied] = useState(false)

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }
  const expandAll = () => setOpenIds(new Set(SECTIONS.map((s) => s.id)))
  const collapseAll = () => setOpenIds(new Set())

  const copyMarkdown = () => {
    const md = buildMarkdownProposal()
    navigator.clipboard.writeText(md).catch(() => undefined)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const printProposal = () => {
    if (typeof window !== 'undefined') window.print()
  }

  return (
    <TabShell
      number="11"
      eyebrow="Proposta Comercial"
      title="O modelo que vira"
      accent="contrato assinado."
      lead="Template completo de proposta comercial Mazari. 7 seções obrigatórias, do cabeçalho institucional até a assinatura. Use como ponto de partida — substitua [colchetes] pelos dados reais do cliente."
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mz-card-soft p-4">
        <span className="mz-tag">Template v1.0</span>
        <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
          {SECTIONS.length} seções
        </span>
        <div className="flex-1" />
        <button
          type="button"
          onClick={expandAll}
          className="mz-mono text-[10px] uppercase tracking-widest text-white/55 hover:text-primary transition-colors"
        >
          Expandir tudo
        </button>
        <span className="text-white/15">·</span>
        <button
          type="button"
          onClick={collapseAll}
          className="mz-mono text-[10px] uppercase tracking-widest text-white/55 hover:text-primary transition-colors"
        >
          Colapsar
        </button>
        <span className="text-white/15">·</span>
        <button
          type="button"
          onClick={copyMarkdown}
          className="flex items-center gap-1.5 mz-mono text-[10px] uppercase tracking-widest text-white/55 hover:text-primary transition-colors"
        >
          {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copiado' : 'Markdown'}
        </button>
        <span className="text-white/15">·</span>
        <button
          type="button"
          onClick={printProposal}
          className="flex items-center gap-1.5 mz-mono text-[10px] uppercase tracking-widest text-white/55 hover:text-primary transition-colors"
        >
          <Printer className="h-3 w-3" />
          Imprimir
        </button>
      </div>

      {/* Seções */}
      <div className="flex flex-col gap-3">
        {SECTIONS.map((s) => {
          const open = openIds.has(s.id)
          const Body = s.body
          return (
            <div
              key={s.id}
              className="rounded-md border border-white/10 bg-background/40 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggle(s.id)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
                aria-expanded={open}
              >
                <span className="mz-mono text-xs text-primary font-bold flex-shrink-0">
                  {s.number}
                </span>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <span className="text-base font-bold text-white">{s.title}</span>
                  <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45 truncate">
                    {s.summary}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-white/55 transition-transform ${open ? 'rotate-180' : ''}`}
                />
              </button>
              {open && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.25 }}
                  className="px-5 pb-5 pt-1"
                >
                  <Body />
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      {/* CTA final */}
      <Block tag="Próximo passo" title="Como esta proposta vira projeto">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <span className="mz-mono text-xs text-primary font-bold">01</span>
            <span className="text-sm font-bold text-white">Aceite formal</span>
            <span className="text-xs text-white/65 leading-relaxed">
              Assinatura no termo de aceite + 30% de sinal disparam Sprint 0.
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="mz-mono text-xs text-primary font-bold">02</span>
            <span className="text-sm font-bold text-white">Kickoff em 5 dias</span>
            <span className="text-xs text-white/65 leading-relaxed">
              Reunião de imersão agendada em até 5 dias úteis após o aceite.
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="mz-mono text-xs text-primary font-bold">03</span>
            <span className="text-sm font-bold text-white">Staging em 2 semanas</span>
            <span className="text-xs text-white/65 leading-relaxed">
              Cliente acompanha o produto evoluindo desde o primeiro commit.
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <MzButton variant="primary" asLink="/#contato">
            Solicitar Proposta Personalizada
          </MzButton>
          <span className="mz-mono text-[10px] uppercase tracking-widest text-white/40">
            Resposta em ≤ 24h · Sigilo NDA
          </span>
        </div>
      </Block>
    </TabShell>
  )
}

function buildMarkdownProposal() {
  return `# Proposta Comercial — [Nome do Projeto]

**Cliente:** [Razão social]
**Emissão:** ${PROPOSAL_DATE}
**Validade:** ${PROPOSAL_VALIDITY}
**Versão:** v1.0
**Sigilo:** NDA aplicável

---

## 01 · Contexto & Objetivo

**Cenário atual:** [descrever em 3-5 linhas]

**Objetivo Mazari:** Entregar [produto] em produção com [métrica] em até [prazo].

---

## 02 · Escopo

### Discovery & Arquitetura
- Workshop de descoberta com stakeholders
- Mapa de riscos técnicos, regulatórios e operacionais
- Diagrama de sistema com fluxos de dados
- Definição de stack e cronograma de sprints
- KPIs mensuráveis e critério de aceite

### Construção
- Sprints quinzenais com staging desde o dia 1
- Code review, testes, observabilidade
- Documentação viva
- Demo + ajuste a cada sprint

### Lançamento
- Deploy em produção com observabilidade
- Performance tuning até SLA
- Penetration test interno antes do go-live
- Plano de rollback documentado

### Pós-entrega
- Hand-off técnico completo
- Hypercare 30 dias
- Otimização baseada em métricas reais

### Fora do escopo
- Licenças de terceiros (cloud, APIs pagas)
- Conteúdo editorial, fotografia, copy
- Suporte 24×7

---

## 03 · Cronograma · 12 semanas

| Fase | Semanas | Entregas |
|------|---------|----------|
| Imersão | S1–S2 | Workshop · Mapa de riscos · Spec |
| Arquitetura | S3 | Diagrama · Stack · Aceite |
| Construção | S4–S11 | 4 sprints · Demos · Staging |
| Lançamento | S12 | Deploy · Pentest · Hypercare |

---

## 04 · Investimento

| Item | Subtotal |
|------|----------|
| Discovery & Arquitetura | R$ [valor] |
| Construção (4 sprints) | R$ [valor] |
| Lançamento & Hypercare | R$ [valor] |
| Hand-off técnico | Incluído |
| **TOTAL** | **R$ [TOTAL]** |

**Condições:** 30% sinal · 4 parcelas · 10% saldo no go-live
**Moeda:** BRL · USD · USDC

---

## 05 · Garantias

- **Sigilo absoluto** — NDA disponível desde o 1º contato
- **IP 100% do cliente** — código, design, contratos
- **Zero vendor-lock** — stack com hand-off em mente
- **Padrão LGPD/GDPR** — mapeamento + DPA

---

## 06 · Aceite

Assinatura do cliente: ____________________
Pela Mazari Corp: [Responsável Mazari Corp] · [Cargo do signatário]

Data: ${PROPOSAL_DATE}
`
}
