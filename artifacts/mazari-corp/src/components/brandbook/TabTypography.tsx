import { TabShell, Block, TwoCol, Rule } from './TabShell'

const SCALE = [
  { token: 'Display', cls: 'text-5xl md:text-7xl', size: '60–72px', weight: '800', tracking: '-0.04em', use: 'Hero · headlines de página', sample: 'Construímos.' },
  { token: 'Title 1', cls: 'text-4xl md:text-5xl', size: '36–48px', weight: '800', tracking: '-0.02em', use: 'Títulos de seção', sample: 'Não somos uma agência.' },
  { token: 'Title 2', cls: 'text-2xl md:text-3xl', size: '24–30px', weight: '700', tracking: '-0.02em', use: 'Subtítulos', sample: 'Três frentes. Uma engenharia.' },
  { token: 'Title 3', cls: 'text-xl', size: '20px', weight: '700', tracking: '-0.01em', use: 'Cards e blocos', sample: 'Plataformas Web & SaaS' },
  { token: 'Lead', cls: 'text-lg', size: '18px', weight: '400', tracking: '0', use: 'Sub-headers e descrições', sample: 'Mais de 10 anos transformando ambição em infraestrutura.' },
  { token: 'Body', cls: 'text-base', size: '16px', weight: '400', tracking: '0', use: 'Corpo de texto padrão', sample: 'Operamos em produção para institutos, fintechs e plataformas DeFi.' },
  { token: 'Small', cls: 'text-sm', size: '14px', weight: '400', tracking: '0', use: 'Texto secundário', sample: 'Sigilo absoluto · NDA disponível no 1º contato.' },
  { token: 'Caption', cls: 'text-xs mz-mono uppercase tracking-widest', size: '12px', weight: '500', tracking: '0.1em', use: 'Tags, eyebrows, labels', sample: 'ENGENHARIA · BLOCKCHAIN · IA' },
]

export function TabTypography() {
  return (
    <TabShell
      number="04"
      eyebrow="Tipografia"
      title="Plus Jakarta Sans"
      accent="+ JetBrains Mono."
      lead="Duas famílias, dois papéis distintos. Plus Jakarta Sans carrega a marca — confiante, geométrica, levemente humanista. JetBrains Mono é a voz técnica — instrumentos, métricas, terminal."
    >
      {/* Famílias */}
      <TwoCol>
        <Block tag="Display & Body" title="Plus Jakarta Sans">
          <div className="rounded-md border border-white/10 bg-background/60 p-6 mb-4">
            <div className="text-6xl font-extrabold tracking-tight text-white leading-none mb-2">
              Aa
            </div>
            <div className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
              400 · 500 · 600 · 700 · 800
            </div>
          </div>
          <p className="text-sm text-white/65 leading-relaxed">
            Sans-serif geométrica com terminações abertas. Usada em todos os títulos,
            corpo de texto, parágrafos e CTAs. <strong className="text-white">Variável</strong>:
            sempre que precisar carregar emoção, confiar peso e legibilidade.
          </p>
        </Block>

        <Block tag="Technical & Tags" title="JetBrains Mono">
          <div className="rounded-md border border-white/10 bg-background/60 p-6 mb-4">
            <div className="mz-mono text-6xl font-extrabold tracking-tight text-primary leading-none mb-2">
              Aa
            </div>
            <div className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
              300 · 400 · 500 · 600 · 700
            </div>
          </div>
          <p className="text-sm text-white/65 leading-relaxed">
            Monoespaçada com glifos diferenciados. Usada em <strong className="text-white">eyebrows, tags,
            métricas, código, status e qualquer elemento técnico</strong>. Sempre em UPPERCASE
            com tracking-widest quando aplicada como tag.
          </p>
        </Block>
      </TwoCol>

      {/* Escala */}
      <Block tag="Escala Tipográfica" title="Hierarquia completa do sistema">
        <div className="flex flex-col divide-y divide-white/10">
          {SCALE.map((s) => (
            <div key={s.token} className="grid md:grid-cols-[180px,1fr,200px] gap-4 py-5 items-baseline">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-white">{s.token}</span>
                <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
                  {s.size} · w{s.weight}
                </span>
              </div>
              <div className={`${s.cls} ${s.token === 'Caption' ? 'text-primary' : 'text-white'} leading-tight font-bold`}>
                {s.token === 'Caption' || s.token === 'Body' || s.token === 'Lead' || s.token === 'Small' ? (
                  <span className={s.token === 'Caption' ? '' : 'font-normal'}>{s.sample}</span>
                ) : (
                  s.sample
                )}
              </div>
              <div className="mz-mono text-[10px] uppercase tracking-widest text-white/45 leading-relaxed">
                {s.use}
              </div>
            </div>
          ))}
        </div>
      </Block>

      {/* Italic accent */}
      <Block tag="Accent Itálico" title="O destaque emocional">
        <div className="rounded-md border border-white/10 bg-background/60 p-8">
          <div className="text-3xl md:text-5xl font-extrabold leading-tight">
            Construímos a Tecnologia que{' '}
            <span className="text-primary italic font-serif font-medium text-glow">
              Move Negócios Globais
            </span>
          </div>
        </div>
        <p className="mt-4 text-sm text-white/65 leading-relaxed">
          Para criar contraste emocional dentro de um título, use a porção em destaque com:
          <span className="mz-mono text-[11px] text-primary"> text-primary italic font-serif font-medium</span>.
          Isso quebra a rigidez sans-serif e cria a "voz que assina" da marca.
        </p>
      </Block>

      {/* Pairing rules */}
      <Block tag="Regras de Pareamento" title="Como combinar as duas famílias">
        <div className="grid md:grid-cols-2 gap-3">
          <Rule status="do" text="Use mono em uppercase com tracking-widest para eyebrows acima de títulos sans." />
          <Rule status="do" text="Use mono para números importantes, percentuais, hashes e qualquer dado técnico." />
          <Rule status="do" text="Mantenha line-height generoso: 1.05 em displays, 1.1 em titles, 1.6+ em body." />
          <Rule status="dont" text="Nunca use mono para corpo de texto longo — só para microcopy técnica." />
          <Rule status="dont" text="Não misture pesos diferentes da mesma família no mesmo bloco de texto." />
          <Rule status="dont" text="Evite italic fora do accent emocional. Italic não é decoração, é tom." />
        </div>
      </Block>
    </TabShell>
  )
}
