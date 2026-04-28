import { TabShell, Block, TwoCol, Rule } from './TabShell'

function MazariMark({
  size = 'lg',
  variant = 'primary',
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'mono-light' | 'mono-dark'
}) {
  const sizing = {
    sm: 'text-base',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl md:text-7xl',
  }[size]

  const colors = {
    primary: { word: 'text-white', dot: 'text-primary' },
    'mono-light': { word: 'text-white', dot: 'text-white' },
    'mono-dark': { word: 'text-background', dot: 'text-background' },
  }[variant]

  return (
    <div className={`mz-mono ${sizing} font-extrabold inline-flex items-baseline gap-0.5`}>
      <span className={`${colors.word} tracking-tight`}>MAZARI</span>
      <span className={colors.dot}>.</span>
    </div>
  )
}

export function TabLogo() {
  return (
    <TabShell
      number="02"
      eyebrow="Logo"
      title="Wordmark MAZARI."
      accent="O ponto é a marca."
      lead="A logo é um wordmark monoespaçado com um ponto lime. O ponto não é decoração — é a assinatura. Sempre presente, sempre na cor primária quando aplicado em fundo escuro."
    >
      {/* Logo principal — display */}
      <Block tag="Logo Principal" title="Versão padrão sobre fundo escuro">
        <div className="rounded-md border border-white/10 bg-background/70 p-12 md:p-16 flex items-center justify-center">
          <MazariMark size="xl" variant="primary" />
        </div>
        <p className="mt-4 mz-mono text-[10px] uppercase tracking-widest text-white/45">
          ▸ Uso preferencial em todas as superfícies digitais e materiais institucionais
        </p>
      </Block>

      {/* Variações */}
      <Block tag="Variações" title="Quando o contexto pede outro tratamento">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-md border border-white/10 bg-background/70 p-8 flex flex-col items-center justify-center gap-4 aspect-square">
            <MazariMark size="lg" variant="primary" />
            <span className="mz-mono text-[9px] uppercase tracking-widest text-white/40">
              Padrão · dark + lime
            </span>
          </div>
          <div className="rounded-md border border-white/10 bg-background/70 p-8 flex flex-col items-center justify-center gap-4 aspect-square">
            <MazariMark size="lg" variant="mono-light" />
            <span className="mz-mono text-[9px] uppercase tracking-widest text-white/40">
              Mono · branco
            </span>
          </div>
          <div className="rounded-md border border-white/30 bg-primary p-8 flex flex-col items-center justify-center gap-4 aspect-square">
            <MazariMark size="lg" variant="mono-dark" />
            <span className="mz-mono text-[9px] uppercase tracking-widest text-background/70">
              Mono · sobre lime
            </span>
          </div>
        </div>
      </Block>

      {/* Construção / Clear space */}
      <TwoCol>
        <Block tag="Construção" title="Anatomia">
          <ul className="flex flex-col gap-3 text-sm text-white/80">
            <li className="flex items-start gap-3">
              <span className="mz-mono text-primary text-xs mt-0.5">01</span>
              <span>
                <strong className="text-white">Wordmark</strong> em JetBrains Mono
                ExtraBold (800), tracking -0.02em, todo em caixa alta.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mz-mono text-primary text-xs mt-0.5">02</span>
              <span>
                <strong className="text-white">Ponto</strong> sempre na primária
                (#D2FF28) quando wordmark é branco. Tamanho idêntico aos caracteres.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mz-mono text-primary text-xs mt-0.5">03</span>
              <span>
                <strong className="text-white">Cursor</strong> opcional após o ponto
                — barra vertical lime piscando, indica operação viva.
              </span>
            </li>
          </ul>
        </Block>

        <Block tag="Área de Respiro" title="Clear-space mínimo">
          <div className="rounded-md border border-dashed border-white/20 p-8 flex items-center justify-center bg-background/40">
            <div className="relative">
              <div className="absolute -inset-6 border border-primary/30 border-dashed rounded" />
              <MazariMark size="md" variant="primary" />
            </div>
          </div>
          <p className="mt-4 text-sm text-white/65 leading-relaxed">
            Reserve no mínimo a altura da letra <strong className="text-white">M</strong> em
            torno do logo. Nada deve invadir esse espaço — nem texto, nem imagens, nem outros logos.
          </p>
        </Block>
      </TwoCol>

      {/* Tamanhos mínimos */}
      <Block tag="Tamanhos" title="Tamanho mínimo legível">
        <div className="rounded-md border border-white/10 bg-background/60 p-6 flex flex-wrap items-end gap-10">
          <div className="flex flex-col items-center gap-3">
            <MazariMark size="sm" variant="primary" />
            <span className="mz-mono text-[9px] uppercase tracking-widest text-white/40">
              16px · digital mín.
            </span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <MazariMark size="md" variant="primary" />
            <span className="mz-mono text-[9px] uppercase tracking-widest text-white/40">
              24px · header padrão
            </span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <MazariMark size="lg" variant="primary" />
            <span className="mz-mono text-[9px] uppercase tracking-widest text-white/40">
              36px · destaque
            </span>
          </div>
        </div>
        <p className="mt-4 text-sm text-white/60 leading-relaxed">
          Em impresso, o mínimo é <strong className="text-white">10mm</strong> de altura. Abaixo disso,
          use apenas o ponto lime (favicon).
        </p>
      </Block>

      {/* Favicon */}
      <Block tag="Favicon" title="Versão monolítica para apps e ícones">
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-2xl bg-background flex items-center justify-center">
              <svg viewBox="0 0 180 180" className="w-full h-full">
                <rect width="180" height="180" rx="36" fill="#080908" />
                <path
                  d="M32 136V44H52L90 108L128 44H148V136H130V76L95 136H85L50 76V136H32Z"
                  fill="#D2FF28"
                />
              </svg>
            </div>
            <span className="mz-mono text-[9px] uppercase tracking-widest text-white/40">
              80px
            </span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center">
              <svg viewBox="0 0 180 180" className="w-full h-full">
                <rect width="180" height="180" rx="36" fill="#080908" />
                <path
                  d="M32 136V44H52L90 108L128 44H148V136H130V76L95 136H85L50 76V136H32Z"
                  fill="#D2FF28"
                />
              </svg>
            </div>
            <span className="mz-mono text-[9px] uppercase tracking-widest text-white/40">
              48px
            </span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
              <svg viewBox="0 0 180 180" className="w-full h-full">
                <rect width="180" height="180" rx="36" fill="#080908" />
                <path
                  d="M32 136V44H52L90 108L128 44H148V136H130V76L95 136H85L50 76V136H32Z"
                  fill="#D2FF28"
                />
              </svg>
            </div>
            <span className="mz-mono text-[9px] uppercase tracking-widest text-white/40">
              32px · favicon
            </span>
          </div>
        </div>
      </Block>

      {/* Do's & Don'ts */}
      <Block tag="Regras de Aplicação" title="Faça e evite">
        <div className="grid md:grid-cols-2 gap-3">
          <Rule status="do" text="Use o ponto lime sobre fundo escuro — é a assinatura primária." />
          <Rule status="dont" text="Nunca substitua o ponto por outro caractere ou símbolo." />
          <Rule status="do" text="Mantenha o tracking -0.02em em todas as aplicações." />
          <Rule status="dont" text="Não estique, distorça, rotacione ou aplique sombra na logo." />
          <Rule status="do" text="Use a versão mono-dark sobre o lime sólido em CTAs." />
          <Rule status="dont" text="Não aplique a logo lime sobre fundos claros — perde contraste." />
          <Rule status="do" text="Respeite o clear-space de 1× altura da letra M." />
          <Rule status="dont" text="Evite usar a logo abaixo de 16px em digital ou 10mm em impresso." />
        </div>
      </Block>
    </TabShell>
  )
}
