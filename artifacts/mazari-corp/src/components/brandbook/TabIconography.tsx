import {
  Activity, ArrowUpRight, Boxes, Briefcase, ChevronRight, Clock,
  Code2, Compass, Database, FileText, GitBranch, Globe2, Layers,
  Mail, Phone, Rocket, Search, Server, ShieldCheck, Sparkles,
  TerminalSquare, Target, Wallet, Zap,
} from 'lucide-react'
import { TabShell, Block, TwoCol, Rule } from './TabShell'

const ICON_LIBRARY = [
  { Icon: Code2, name: 'Code2', use: 'Engenharia' },
  { Icon: Boxes, name: 'Boxes', use: 'Stack / módulos' },
  { Icon: GitBranch, name: 'GitBranch', use: 'Deploy / pipeline' },
  { Icon: TerminalSquare, name: 'Terminal', use: 'CLI / dev' },
  { Icon: Database, name: 'Database', use: 'Dados' },
  { Icon: Server, name: 'Server', use: 'Infra' },
  { Icon: Wallet, name: 'Wallet', use: 'Web3 / blockchain' },
  { Icon: Globe2, name: 'Globe', use: 'Operação global' },
  { Icon: ShieldCheck, name: 'ShieldCheck', use: 'Segurança / NDA' },
  { Icon: Activity, name: 'Activity', use: 'Métricas / IA' },
  { Icon: Zap, name: 'Zap', use: 'Performance' },
  { Icon: Layers, name: 'Layers', use: 'Arquitetura' },
  { Icon: Target, name: 'Target', use: 'Objetivo / foco' },
  { Icon: Compass, name: 'Compass', use: 'Estratégia' },
  { Icon: Search, name: 'Search', use: 'Discovery' },
  { Icon: Rocket, name: 'Rocket', use: 'Launch' },
  { Icon: FileText, name: 'FileText', use: 'Docs / contratos' },
  { Icon: Briefcase, name: 'Briefcase', use: 'Negócio' },
  { Icon: Sparkles, name: 'Sparkles', use: 'Highlight' },
  { Icon: Clock, name: 'Clock', use: 'SLA / prazo' },
  { Icon: Mail, name: 'Mail', use: 'Contato' },
  { Icon: Phone, name: 'Phone', use: 'WhatsApp' },
  { Icon: ArrowUpRight, name: 'ArrowUpRight', use: 'External / CTA' },
  { Icon: ChevronRight, name: 'ChevronRight', use: 'Navegação' },
]

export function TabIconography() {
  return (
    <TabShell
      number="06"
      eyebrow="Iconografia"
      title="Lucide React"
      accent="como sistema único."
      lead="Toda a iconografia Mazari vem da biblioteca Lucide. Linha 2px, cantos arredondados, peso uniforme. Aplicada sempre dentro de um container quadrado com borda lime ou em mz-tag inline."
    >
      {/* Princípios */}
      <TwoCol>
        <Block tag="Stack" title="Lucide React">
          <ul className="flex flex-col gap-2.5 text-sm text-white/75">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-0.5">▸</span>
              <span>
                <strong className="text-white">Stroke width 2px</strong> — não use 1.5 nem 2.5.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-0.5">▸</span>
              <span>
                <strong className="text-white">Tamanhos canônicos</strong>: 12, 14, 16, 20, 24px.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-0.5">▸</span>
              <span>
                <strong className="text-white">Cor padrão</strong>: <code className="mz-mono text-primary text-xs">text-primary</code> em containers, <code className="mz-mono text-xs">text-white/55</code> em texto.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-0.5">▸</span>
              <span>
                <strong className="text-white">Nunca</strong> misture Lucide com outra biblioteca de ícones.
              </span>
            </li>
          </ul>
        </Block>

        <Block tag="Container Padrão" title="Aplicação institucional">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex flex-col items-center gap-2">
              <div className="w-9 h-9 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                <Code2 className="h-4 w-4" />
              </div>
              <span className="mz-mono text-[9px] uppercase tracking-widest text-white/45">
                36px · padrão
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                <Code2 className="h-5 w-5" />
              </div>
              <span className="mz-mono text-[9px] uppercase tracking-widest text-white/45">
                48px · destaque
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-background">
                <Code2 className="h-6 w-6" />
              </div>
              <span className="mz-mono text-[9px] uppercase tracking-widest text-white/45">
                56px · sólido
              </span>
            </div>
          </div>
        </Block>
      </TwoCol>

      {/* Biblioteca curada */}
      <Block tag="Biblioteca Curada" title="Ícones operacionais Mazari">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {ICON_LIBRARY.map(({ Icon, name, use }) => (
            <div
              key={name}
              className="rounded-md border border-white/10 bg-background/60 p-4 flex items-center gap-3 hover:border-primary/30 transition-colors"
            >
              <div className="w-9 h-9 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="mz-mono text-[11px] text-white/85 font-semibold">
                  {name}
                </span>
                <span className="mz-mono text-[9px] uppercase tracking-widest text-white/45 truncate">
                  {use}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Block>

      {/* Aplicações inline */}
      <Block tag="Aplicações Inline" title="Em texto, tags e listas">
        <div className="flex flex-col gap-4">
          <div className="rounded-md border border-white/10 bg-background/60 p-4">
            <span className="mz-mono text-[9px] uppercase tracking-widest text-white/45 mb-3 block">
              Inline em texto
            </span>
            <p className="text-sm text-white/85 flex flex-wrap items-center gap-1.5">
              Operamos em <Globe2 className="h-3.5 w-3.5 text-primary inline" /> 5 continentes
              com <ShieldCheck className="h-3.5 w-3.5 text-primary inline" /> SLA institucional e{' '}
              <Activity className="h-3.5 w-3.5 text-primary inline" /> 99.97% de uptime médio.
            </p>
          </div>

          <div className="rounded-md border border-white/10 bg-background/60 p-4">
            <span className="mz-mono text-[9px] uppercase tracking-widest text-white/45 mb-3 block">
              Em listas com prefixo
            </span>
            <ul className="flex flex-col gap-2.5 text-sm text-white/75">
              {[
                { Icon: Code2, text: 'Engenharia full-stack senior' },
                { Icon: Wallet, text: 'Smart contracts e tokenização' },
                { Icon: Activity, text: 'IA aplicada · NLP · automação' },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <Icon className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Block>

      {/* Regras */}
      <Block tag="Regras de Aplicação" title="Faça e evite">
        <div className="grid md:grid-cols-2 gap-3">
          <Rule status="do" text="Container quadrado bg-primary/10 border-primary/30 com ícone em text-primary é o padrão institucional." />
          <Rule status="do" text="Use ícones inline em h-3.5 w-3.5 quando dentro de texto." />
          <Rule status="do" text="Mantenha consistência: o mesmo conceito sempre usa o mesmo ícone." />
          <Rule status="dont" text="Não preencha ícones (filled). Lucide é estritamente outline." />
          <Rule status="dont" text="Não use ícones decorativos sem função informativa." />
          <Rule status="dont" text="Nunca rotacione, espelhe ou anime cores de ícones fora do hover-state." />
        </div>
      </Block>
    </TabShell>
  )
}
