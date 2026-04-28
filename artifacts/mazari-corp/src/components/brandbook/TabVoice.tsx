import { TabShell, Block, TwoCol, Rule } from './TabShell'

const PRINCIPLES = [
  {
    title: 'Técnico-confiante',
    desc: 'Falamos como engenheiros sêniores que já entregaram. Não vendemos certeza — demonstramos.',
    example: '"Operamos em produção para institutos de pesquisa, holdings internacionais, fintechs e plataformas DeFi."',
  },
  {
    title: 'Sem hype, sem clichê',
    desc: 'Zero "revolucionário", "disruptivo", "soluções inovadoras". Substitua hype por dado: número, prazo, resultado.',
    example: '"Arquitetura preparada pra 10× growth sem refactor."  ✓\n"Soluções inovadoras de última geração." ✗',
  },
  {
    title: 'Direto e curto',
    desc: 'Frases ativas, sujeito explícito, verbo forte. Cortar advérbios sempre que possível.',
    example: '"Construímos." > "Nós trabalhamos para construir."',
  },
  {
    title: 'Microcopy técnica',
    desc: 'Mono em uppercase para sinais (LIVE, AUDIT, ARMED). Cria sensação de instrumentação real.',
    example: '"99.97%" + "UPTIME" · "42ms" + "LATÊNCIA P95"',
  },
]

const VOCAB_DO = [
  'Engenharia', 'Operação', 'Infraestrutura', 'Padrão institucional',
  'Em produção', 'Hand-off limpo', 'Observável', 'Stack',
  'Time sênior', 'Cloud-native', 'Smart contract', 'Pipeline',
  'Vantagem competitiva permanente',
]

const VOCAB_DONT = [
  'Soluções', 'Inovador', 'Disruptivo', 'Revolucionário',
  'Excelência', 'Sinergia', 'Estratégico (sozinho)', 'Best-in-class',
  'Líder de mercado', 'Customizado', '"Outside the box"', 'Cutting-edge',
]

export function TabVoice() {
  return (
    <TabShell
      number="05"
      eyebrow="Voz & Tom"
      title="Falamos como"
      accent="quem já entregou."
      lead="A voz Mazari é técnico-confiante, sem hype. Demonstra com números e operação. Curta nas frases, longa em substância. Toda comunicação carrega a sensação de instrumento ligado — não de pitch."
    >
      {/* Princípios */}
      <Block tag="Princípios da Voz" title="Quatro regras inegociáveis">
        <div className="flex flex-col gap-4">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} className="rounded-md border border-white/10 bg-background/60 p-5">
              <div className="flex items-start gap-4">
                <span className="mz-mono text-[11px] text-primary font-bold flex-shrink-0 mt-0.5">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white mb-1">{p.title}</h3>
                  <p className="text-sm text-white/65 leading-relaxed mb-3">{p.desc}</p>
                  <pre className="mz-mono text-[12px] text-white/55 leading-relaxed whitespace-pre-wrap bg-background/40 rounded p-3 border border-white/5">
                    {p.example}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Block>

      {/* Vocabulário */}
      <TwoCol>
        <Block tag="Use" title="Vocabulário Mazari">
          <div className="flex flex-wrap gap-2">
            {VOCAB_DO.map((w) => (
              <span
                key={w}
                className="mz-mono text-[11px] px-3 py-1.5 rounded border border-primary/30 bg-primary/5 text-primary"
              >
                {w}
              </span>
            ))}
          </div>
        </Block>

        <Block tag="Evite" title="Banidos do dicionário">
          <div className="flex flex-wrap gap-2">
            {VOCAB_DONT.map((w) => (
              <span
                key={w}
                className="mz-mono text-[11px] px-3 py-1.5 rounded border border-red-500/30 bg-red-500/5 text-red-300/80 line-through decoration-red-500/40"
              >
                {w}
              </span>
            ))}
          </div>
        </Block>
      </TwoCol>

      {/* Exemplos antes/depois */}
      <Block tag="Antes & Depois" title="Reescritas reais">
        <div className="flex flex-col gap-3">
          <div className="grid md:grid-cols-2 gap-3">
            <div className="rounded-md border border-red-500/25 bg-red-500/[0.04] p-4">
              <span className="mz-mono text-[9px] uppercase tracking-widest text-red-400 font-bold">
                Antes
              </span>
              <p className="text-sm text-white/70 mt-2 leading-relaxed">
                "Somos uma agência inovadora que oferece soluções estratégicas e disruptivas
                de última geração para empresas que querem se destacar."
              </p>
            </div>
            <div className="rounded-md border border-primary/25 bg-primary/[0.04] p-4">
              <span className="mz-mono text-[9px] uppercase tracking-widest text-primary font-bold">
                Depois
              </span>
              <p className="text-sm text-white/85 mt-2 leading-relaxed">
                "Construímos a tecnologia que move negócios globais. 10+ anos em produção,
                30+ projetos, 5 continentes."
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="rounded-md border border-red-500/25 bg-red-500/[0.04] p-4">
              <span className="mz-mono text-[9px] uppercase tracking-widest text-red-400 font-bold">
                Antes
              </span>
              <p className="text-sm text-white/70 mt-2 leading-relaxed">
                "Nossa metodologia ágil garante a entrega de soluções customizadas com
                excelência operacional."
              </p>
            </div>
            <div className="rounded-md border border-primary/25 bg-primary/[0.04] p-4">
              <span className="mz-mono text-[9px] uppercase tracking-widest text-primary font-bold">
                Depois
              </span>
              <p className="text-sm text-white/85 mt-2 leading-relaxed">
                "Sprints curtos. Você acompanha em staging desde o primeiro commit. Demo
                quinzenal, ajustes na rota."
              </p>
            </div>
          </div>
        </div>
      </Block>

      {/* Microcopy */}
      <Block tag="Microcopy" title="Padrões de tag, status e CTA">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45 mb-3 block">
              Tags & Status
            </span>
            <div className="flex flex-wrap gap-2">
              <span className="mz-tag">LIVE</span>
              <span className="mz-tag">AUDIT</span>
              <span className="mz-tag">MAINNET</span>
              <span className="mz-tag">ARMED</span>
              <span className="mz-tag">99.99% UPTIME</span>
              <span className="mz-tag">5 CONTINENTES</span>
              <span className="mz-tag">v1.0</span>
            </div>
          </div>
          <div>
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45 mb-3 block">
              CTAs padrão
            </span>
            <div className="flex flex-col gap-2">
              <code className="mz-mono text-xs text-primary bg-background/60 rounded px-3 py-2 border border-white/10">
                Agendar Reunião
              </code>
              <code className="mz-mono text-xs text-primary bg-background/60 rounded px-3 py-2 border border-white/10">
                Solicitar Proposta Personalizada
              </code>
              <code className="mz-mono text-xs text-primary bg-background/60 rounded px-3 py-2 border border-white/10">
                Ser Nosso Próximo Case
              </code>
              <code className="mz-mono text-xs text-primary bg-background/60 rounded px-3 py-2 border border-white/10">
                Ver Projetos
              </code>
            </div>
          </div>
        </div>
      </Block>

      {/* Regras gerais */}
      <Block tag="Regras Gerais" title="Como escrever em qualquer canal">
        <div className="grid md:grid-cols-2 gap-3">
          <Rule status="do" text="Comece com o resultado, não com a empresa: '99.99% uptime' antes de 'a Mazari entrega'." />
          <Rule status="do" text="Use números absolutos sempre que possível: 30+ projetos, 800 trades/dia, 42ms p95." />
          <Rule status="do" text="Quebre frases longas em duas. Pontuação é instrumento de ritmo." />
          <Rule status="dont" text="Nunca use 'nós, da Mazari'. Use 'Mazari' direto, sem prefixos cerimoniais." />
          <Rule status="dont" text="Evite emojis em comunicação institucional — quebra o tom técnico." />
          <Rule status="dont" text="Não use exclamações em copy comercial. Confiança não grita." />
        </div>
      </Block>
    </TabShell>
  )
}
