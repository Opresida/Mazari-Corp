import { TabShell, Block, TwoCol, Rule } from './TabShell'

const SPACING = [
  { token: 'space-1', value: '4px', tw: 'gap-1 / p-1', use: 'Microespaçamento entre ícone+texto' },
  { token: 'space-2', value: '8px', tw: 'gap-2 / p-2', use: 'Tags, chips, badges' },
  { token: 'space-3', value: '12px', tw: 'gap-3 / p-3', use: 'Botões internos, list items' },
  { token: 'space-4', value: '16px', tw: 'gap-4 / p-4', use: 'Cards pequenos, blocos compactos' },
  { token: 'space-5', value: '20px', tw: 'gap-5 / p-5', use: 'Cards padrão, espaçamento entre blocos' },
  { token: 'space-6', value: '24px', tw: 'gap-6 / p-6', use: 'Cards grandes' },
  { token: 'space-8', value: '32px', tw: 'gap-8 / p-8', use: 'Grids principais' },
  { token: 'space-12', value: '48px', tw: 'gap-12 / p-12', use: 'Grids hero' },
  { token: 'space-20', value: '80px', tw: 'py-20', use: 'Section padding mobile' },
  { token: 'space-32', value: '128px', tw: 'py-32', use: 'Section padding desktop' },
]

const RADII = [
  { token: 'rounded-sm', value: '12px', use: 'Inputs, buttons internos' },
  { token: 'rounded-md', value: '14px', use: 'Cards padrão, tags grandes' },
  { token: 'rounded-lg', value: '16px', use: 'Modal, cards grandes' },
  { token: 'rounded-3xl', value: '24px', use: 'Service cards, FloatingCard' },
  { token: 'rounded-full', value: '9999px', use: 'Dots, avatars, pills' },
]

export function TabGrid() {
  return (
    <TabShell
      number="07"
      eyebrow="Grid & Layout"
      title="Geometria do produto."
      accent="A grade segura tudo."
      lead="O sistema é construído sobre Tailwind 4 com escala de 4px. Container max-width 7xl (1280px), padding lateral mínimo de 5 (20px) em mobile e 6 (24px) em desktop. Grid 12 colunas com gap variável."
    >
      {/* Container & Breakpoints */}
      <TwoCol>
        <Block tag="Container" title="Largura máxima e padding">
          <div className="rounded-md border border-white/10 bg-background/60 p-5">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-baseline">
                <span className="mz-mono text-xs text-primary">max-w-7xl</span>
                <span className="mz-mono text-xs text-white/55">1280px</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="mz-mono text-xs text-primary">px-5 sm:px-6</span>
                <span className="mz-mono text-xs text-white/55">20 / 24px</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="mz-mono text-xs text-primary">py-20 md:py-32</span>
                <span className="mz-mono text-xs text-white/55">80 / 128px</span>
              </div>
            </div>
          </div>
        </Block>

        <Block tag="Breakpoints" title="Pontos de quebra">
          <div className="rounded-md border border-white/10 bg-background/60 p-5">
            <div className="flex flex-col gap-2">
              {[
                { label: 'sm', value: '640px', use: 'Phones grandes' },
                { label: 'md', value: '768px', use: 'Tablets' },
                { label: 'lg', value: '1024px', use: 'Laptops · sidebar tabs' },
                { label: 'xl', value: '1280px', use: 'Desktops' },
                { label: '2xl', value: '1536px', use: 'Telas grandes' },
              ].map((bp) => (
                <div
                  key={bp.label}
                  className="flex items-baseline justify-between py-1.5 border-b border-white/5 last:border-0"
                >
                  <span className="mz-mono text-xs text-primary">{bp.label}</span>
                  <span className="mz-mono text-xs text-white/85">{bp.value}</span>
                  <span className="mz-mono text-[10px] text-white/45 uppercase tracking-widest">
                    {bp.use}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Block>
      </TwoCol>

      {/* Spacing scale */}
      <Block tag="Spacing Scale" title="Escala de 4px">
        <div className="flex flex-col gap-2">
          {SPACING.map((s) => (
            <div
              key={s.token}
              className="grid grid-cols-[1fr,80px,160px] sm:grid-cols-[120px,80px,1fr,1fr] gap-3 items-center rounded-md border border-white/10 bg-background/60 p-3"
            >
              <span className="mz-mono text-xs text-primary">{s.token}</span>
              <span className="mz-mono text-xs text-white/85 text-right sm:text-left">
                {s.value}
              </span>
              <div
                className="bg-primary/40 h-2 rounded-full hidden sm:block"
                style={{ width: s.value }}
              />
              <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45 col-span-2 sm:col-span-1">
                {s.use}
              </span>
            </div>
          ))}
        </div>
      </Block>

      {/* Radii */}
      <Block tag="Radii" title="Cantos arredondados">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {RADII.map((r) => (
            <div
              key={r.token}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="w-20 h-20 bg-primary/10 border border-primary/30"
                style={{ borderRadius: r.value === '9999px' ? r.value : r.value }}
              />
              <div className="flex flex-col items-center gap-0.5">
                <span className="mz-mono text-[11px] text-primary">{r.token}</span>
                <span className="mz-mono text-[9px] uppercase tracking-widest text-white/45 text-center">
                  {r.use}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Block>

      {/* Backgrounds & decorativos */}
      <Block tag="Decorativos de Fundo" title="mz-grid-bg, glow ambiente, splitters">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <div className="relative h-40 rounded-md border border-white/10 bg-background/60 overflow-hidden">
              <div
                className="absolute inset-0 mz-grid-bg opacity-100"
                aria-hidden="true"
              />
            </div>
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45 mt-2 block">
              .mz-grid-bg · grid 40×40 lime/4%
            </span>
          </div>
          <div>
            <div className="relative h-40 rounded-md border border-white/10 bg-background/60 overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(210,255,40,0.20) 0%, transparent 70%)',
                }}
              />
            </div>
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45 mt-2 block">
              radial glow · 0.05–0.20 alpha
            </span>
          </div>
          <div>
            <div className="rounded-md border border-white/10 bg-background/60 p-6 flex items-center justify-center">
              <div className="mz-splitter w-full" />
            </div>
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45 mt-2 block">
              GradientSplitter · horizontal
            </span>
          </div>
          <div>
            <div className="rounded-md border border-white/10 bg-background/60 p-6 flex items-center justify-center h-32">
              <div className="mz-splitter-vert h-full" />
            </div>
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45 mt-2 block">
              GradientSplitter · vertical
            </span>
          </div>
        </div>
      </Block>

      {/* Regras */}
      <Block tag="Regras de Layout" title="Faça e evite">
        <div className="grid md:grid-cols-2 gap-3">
          <Rule status="do" text="Use sempre max-w-7xl mx-auto px-5 sm:px-6 nas seções principais." />
          <Rule status="do" text="Section padding: py-20 mobile, py-28 ou py-32 desktop." />
          <Rule status="do" text="Cards padrão usam mz-card-soft (rgba(22,24,22,0.55) + blur 10px + border lime 12%)." />
          <Rule status="dont" text="Não invente bordas com tons aleatórios — use rgba(255,255,255,0.10) ou primary/30." />
          <Rule status="dont" text="Evite gaps menores que 4px ou maiores que 128px sem motivo." />
          <Rule status="dont" text="Não combine 3 backgrounds decorativos na mesma seção (grid + glow + scan = ruído)." />
        </div>
      </Block>
    </TabShell>
  )
}
