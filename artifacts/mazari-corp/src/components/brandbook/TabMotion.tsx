import { motion } from 'framer-motion'
import { TabShell, Block, TwoCol, Rule } from './TabShell'

const TIMINGS = [
  { token: 'fast', dur: '150ms', use: 'Hover de botão, ícones, tooltips' },
  { token: 'base', dur: '300ms', use: 'Transições padrão, fade-in de seções' },
  { token: 'slow', dur: '600ms', use: 'Entradas dramáticas (Hero, headlines)' },
  { token: 'pulse', dur: '2.6s', use: 'mz-dot-pulse, hubs do globo' },
  { token: 'scan', dur: '4–8s', use: 'Linhas de scan vertical (PentestSection)' },
  { token: 'marquee', dur: '30s', use: 'Trusted brands, tech logos rolando' },
]

export function TabMotion() {
  return (
    <TabShell
      number="09"
      eyebrow="Movimento"
      title="Discreto, instrumental,"
      accent="nunca decorativo."
      lead="O movimento Mazari serve dois propósitos: criar sensação de operação viva (pulse, scan) e revelar conteúdo em entrada (fade + slight Y). Tudo com Framer Motion. Animações decorativas longas — proibidas."
    >
      {/* Princípios */}
      <Block tag="Princípios" title="Quatro regras de movimento">
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { n: '01', t: 'Funcional, não estético', d: 'Motion serve à compreensão. Se a UI funciona estática, não anima por anima.' },
            { n: '02', t: 'Curtos e curvos', d: 'Easings naturais (easeOut, easeInOut). Linear só em loops contínuos.' },
            { n: '03', t: 'Pulse = vivo', d: 'O pulse de 2.6s no dot lime é a assinatura. "Algo está rodando."' },
            { n: '04', t: 'Respect motion', d: 'Sempre considere prefers-reduced-motion em loops longos.' },
          ].map((p) => (
            <div
              key={p.n}
              className="rounded-md border border-white/10 bg-background/60 p-5 flex flex-col gap-2"
            >
              <span className="mz-mono text-xs text-primary font-bold">{p.n}</span>
              <h3 className="text-base font-bold text-white">{p.t}</h3>
              <p className="text-sm text-white/65 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </Block>

      {/* Timings */}
      <Block tag="Durations" title="Tempo do movimento">
        <div className="flex flex-col gap-2">
          {TIMINGS.map((t) => (
            <div
              key={t.token}
              className="grid grid-cols-[1fr,100px] sm:grid-cols-[120px,100px,1fr] gap-3 items-center rounded-md border border-white/10 bg-background/60 p-3"
            >
              <span className="mz-mono text-xs text-primary">{t.token}</span>
              <span className="mz-mono text-xs text-white/85 text-right sm:text-left">
                {t.dur}
              </span>
              <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45 hidden sm:block">
                {t.use}
              </span>
            </div>
          ))}
        </div>
      </Block>

      {/* Demos */}
      <Block tag="Padrões em Uso" title="Exemplos canônicos">
        <div className="grid md:grid-cols-3 gap-5">
          {/* Pulse dot */}
          <div className="rounded-md border border-white/10 bg-background/60 p-6 flex flex-col items-center gap-4">
            <span className="mz-dot" />
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45 text-center">
              mz-dot-pulse · 2.6s loop
            </span>
          </div>

          {/* Hub pulse */}
          <div className="rounded-md border border-white/10 bg-background/60 p-6 flex flex-col items-center gap-4">
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="10" fill="rgba(210,255,40,0.18)">
                <animate attributeName="r" values="8;16;8" dur="2.6s" repeatCount="indefinite" />
                <animate
                  attributeName="opacity"
                  values="0.55;0.1;0.55"
                  dur="2.6s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx="30"
                cy="30"
                r="5"
                fill="#D2FF28"
                style={{ filter: 'drop-shadow(0 0 4px rgba(210,255,40,0.9))' }}
              />
            </svg>
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45 text-center">
              Hub pulse · radial expand
            </span>
          </div>

          {/* Cursor blink */}
          <div className="rounded-md border border-white/10 bg-background/60 p-6 flex flex-col items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="mz-mono text-2xl font-extrabold text-white">MAZARI</span>
              <span className="mz-mono text-2xl font-extrabold text-primary">.</span>
              <motion.span
                animate={{ opacity: [0.15, 1, 0.15] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="inline-block w-[3px] h-[18px] bg-primary ml-0.5"
              />
            </div>
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45 text-center">
              Cursor blink · 1.4s
            </span>
          </div>
        </div>
      </Block>

      {/* Entrada padrão */}
      <Block tag="Entrada de Seção" title="Padrão fade + Y">
        <pre className="mz-mono text-[12px] text-white/75 bg-background/40 rounded-md p-4 border border-white/10 overflow-x-auto leading-relaxed">
{`<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6 }}
>
  {content}
</motion.div>`}
        </pre>
        <p className="mt-3 text-sm text-white/65 leading-relaxed">
          Toda seção entra com <code className="mz-mono text-primary text-xs">opacity 0 → 1</code> +
          <code className="mz-mono text-primary text-xs"> y 20 → 0</code> em 0.6s, easeOut.
          <code className="mz-mono text-primary text-xs"> once: true</code> evita reanimação no scroll up.
        </p>
      </Block>

      {/* Regras */}
      <TwoCol>
        <Block tag="Faça" title="Práticas obrigatórias">
          <div className="flex flex-col gap-3">
            <Rule status="do" text="Use viewport once: true em todas as entradas para evitar performance hit em scroll up." />
            <Rule status="do" text="Stagger de 0.1s entre cards filhos (delay incremental)." />
            <Rule status="do" text="Respect prefers-reduced-motion para usuários sensíveis." />
          </div>
        </Block>
        <Block tag="Evite" title="Práticas proibidas">
          <div className="flex flex-col gap-3">
            <Rule status="dont" text="Animações de entrada acima de 0.8s. Cansam." />
            <Rule status="dont" text="Bounce, spring overshoot, ou qualquer movimento 'fofo'." />
            <Rule status="dont" text="Loops infinitos competindo na mesma viewport (3+ pulses simultâneos)." />
          </div>
        </Block>
      </TwoCol>
    </TabShell>
  )
}
