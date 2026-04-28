import { Target, Eye, Compass, Award, Globe2, Code2 } from 'lucide-react'
import { TabShell, Block, TwoCol } from './TabShell'

export function TabFoundation() {
  const values = [
    {
      icon: Code2,
      title: 'Engenharia primeiro',
      desc: 'Não vendemos hype. Vendemos código revisado, observável e feito para escalar 10x sem refactor.',
    },
    {
      icon: Award,
      title: 'Padrão institucional',
      desc: 'Operamos como infraestrutura crítica: SLAs reais, segurança incorporada, hand-off limpo.',
    },
    {
      icon: Globe2,
      title: 'Operação global',
      desc: '5 continentes, fuso GMT-3 sincronizado, time sênior que entende o que regulação significa em cada jurisdição.',
    },
    {
      icon: Target,
      title: 'Resultado sobre entrega',
      desc: 'Não desaparecemos no deploy. Continuamos até o resultado estar consolidado em produção.',
    },
  ]

  const stats = [
    { value: '10+', label: 'Anos em produção' },
    { value: '30+', label: 'Projetos entregues' },
    { value: '5', label: 'Continentes ativos' },
    { value: '99.97%', label: 'Uptime médio' },
  ]

  return (
    <TabShell
      number="01"
      eyebrow="Fundação"
      title="A marca começa antes"
      accent="da primeira pixel."
      lead="Mazari Corp é uma operação de engenharia sênior que constrói tecnologia para empresas globais. Esta aba define o que somos antes de qualquer manifestação visual."
    >
      {/* Manifesto */}
      <Block tag="Manifesto" title="Não somos uma agência. Somos arquitetos de infraestrutura digital.">
        <p className="text-base md:text-lg text-white/75 leading-relaxed">
          A Mazari Corp nasceu da obsessão por construir tecnologia que funciona em escala
          real. Operamos em 5 continentes combinando engenharia de software, blockchain e
          inteligência artificial em um único time sênior. Não entregamos projetos —
          entregamos <span className="text-primary font-semibold">vantagens competitivas permanentes</span>.
        </p>
      </Block>

      <TwoCol>
        <Block>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <Target className="h-4 w-4" />
            </div>
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
              Missão
            </span>
          </div>
          <p className="text-base text-white/85 leading-relaxed">
            Construir a tecnologia que move negócios globais — com a engenharia que
            sobrevive ao crescimento, à regulação e ao tempo.
          </p>
        </Block>

        <Block>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <Eye className="h-4 w-4" />
            </div>
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
              Visão
            </span>
          </div>
          <p className="text-base text-white/85 leading-relaxed">
            Ser o time de engenharia sênior de referência para empresas que recusam o comum
            — onde tecnologia avançada é trabalho silencioso, não promessa.
          </p>
        </Block>
      </TwoCol>

      {/* Posicionamento */}
      <Block tag="Posicionamento" title="O lugar que ocupamos no mercado">
        <div className="grid md:grid-cols-3 gap-5">
          <div className="flex flex-col gap-2">
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/40">
              Para quem
            </span>
            <p className="text-sm text-white/80 leading-relaxed">
              Holdings, fintechs, institutos, startups Web3 e plataformas DeFi com exigência
              institucional.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/40">
              Categoria
            </span>
            <p className="text-sm text-white/80 leading-relaxed">
              Engenharia de software · Blockchain · IA aplicada — sob um mesmo time sênior.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/40">
              Diferencial
            </span>
            <p className="text-sm text-white/80 leading-relaxed">
              Padrão institucional, IP 100% do cliente, zero vendor-lock, hand-off limpo.
            </p>
          </div>
        </div>
      </Block>

      {/* Valores */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <Compass className="h-4 w-4 text-primary" />
          <span className="mz-mono text-[10px] uppercase tracking-widest text-white/55">
            Valores Operacionais
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {values.map((v) => {
            const Icon = v.icon
            return (
              <div
                key={v.title}
                className="mz-card-soft p-5 flex flex-col gap-3 hover:border-primary/30 transition-colors"
              >
                <div className="w-9 h-9 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-white">{v.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{v.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Números */}
      <Block tag="Os Números" title="Mazari em produção, hoje">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-extrabold text-primary text-glow">
                {s.value}
              </span>
              <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </Block>
    </TabShell>
  )
}
