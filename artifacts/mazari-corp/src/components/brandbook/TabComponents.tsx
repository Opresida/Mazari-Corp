import { Activity, GitBranch } from 'lucide-react'
import { MzButton } from '@/components/ui/MzButton'
import { TabShell, Block, TwoCol } from './TabShell'

export function TabComponents() {
  return (
    <TabShell
      number="08"
      eyebrow="Componentes"
      title="Tokens vivos."
      accent="A linguagem em uso."
      lead="Toda a UI Mazari é construída com um conjunto reduzido e reutilizável: botões, cards, tags, dots, splitters, terminais. Aqui estão os componentes canônicos com suas regras de uso e código."
    >
      {/* Buttons */}
      <Block tag="Buttons" title="MzButton — primary & ghost">
        <div className="rounded-md border border-white/10 bg-background/60 p-8 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <MzButton variant="primary">Agendar Reunião</MzButton>
            <MzButton variant="ghost">Ver Projetos</MzButton>
          </div>
          <div className="flex flex-col gap-2">
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
              Anatomia
            </span>
            <ul className="flex flex-col gap-1.5 text-sm text-white/70">
              <li className="flex gap-2">
                <span className="text-primary">▸</span>
                <span>Texto em <code className="mz-mono text-primary text-xs">font-mono uppercase tracking-wider</code>, peso 600.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">▸</span>
                <span>Box do ícone à direita com seta dupla animada (slide-out + slide-in no hover).</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">▸</span>
                <span>Glow no hover: <code className="mz-mono text-primary text-xs">shadow-[0_0_24px_rgba(210,255,40,0.45)]</code>.</span>
              </li>
            </ul>
          </div>
        </div>
      </Block>

      <TwoCol>
        {/* Tag */}
        <Block tag="Tag" title="mz-tag — pill identificadora">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="mz-tag">LIVE</span>
            <span className="mz-tag">v1.0</span>
            <span className="mz-tag">99.9% UPTIME</span>
            <span className="mz-tag">5 CONTINENTES</span>
          </div>
          <pre className="mz-mono text-[11px] text-white/65 bg-background/40 rounded p-3 border border-white/5 overflow-x-auto">
{`<span className="mz-tag">LIVE</span>`}
          </pre>
        </Block>

        {/* Dot */}
        <Block tag="Status Dot" title="mz-dot — sinal pulsante">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="mz-dot" />
              <span className="text-sm text-white/70">Online · GMT-3</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="mz-dot" style={{ width: 4, height: 4 }} />
              <span className="text-xs mz-mono uppercase tracking-widest text-white/55">
                Form secured
              </span>
            </div>
          </div>
          <pre className="mz-mono text-[11px] text-white/65 bg-background/40 rounded p-3 border border-white/5 overflow-x-auto">
{`<span className="mz-dot" />`}
          </pre>
        </Block>
      </TwoCol>

      {/* Cards */}
      <Block tag="Cards" title="mz-card-soft — superfície base">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="mz-card-soft p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="mz-tag">LIVE</span>
              <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
                mazari.ops
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="h-4 w-4 text-primary" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary text-glow">99.97%</span>
                <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
                  Uptime
                </span>
              </div>
            </div>
          </div>
          <div className="mz-card-soft p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="mz-tag">DEPLOY</span>
              <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
                ci · 24h
              </span>
            </div>
            <div className="flex items-center gap-3">
              <GitBranch className="h-4 w-4 text-primary" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary text-glow">47</span>
                <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
                  Pipelines passed
                </span>
              </div>
            </div>
          </div>
        </div>
        <pre className="mt-4 mz-mono text-[11px] text-white/65 bg-background/40 rounded p-3 border border-white/5 overflow-x-auto">
{`<div className="mz-card-soft p-5">
  background: rgba(22, 24, 22, 0.55);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(210, 255, 40, 0.12);
  border-radius: 6px;
</div>`}
        </pre>
      </Block>

      {/* Terminal */}
      <Block tag="Terminal Block" title="Decorativo · CLI ambient">
        <div className="mz-card-soft p-4 font-mono text-[12px] leading-6 text-white/65 max-w-xl">
          <div className="flex items-center gap-2 pb-2 mb-2 border-b border-white/10">
            <span className="w-2 h-2 rounded-full bg-red-400/50" />
            <span className="w-2 h-2 rounded-full bg-yellow-400/50" />
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="mz-mono text-[9px] uppercase tracking-widest text-white/30 ml-2">
              mazari.contact
            </span>
          </div>
          <div>
            <span className="text-primary">$</span> <span className="text-white/85">mazari init --project</span>
          </div>
          <div className="text-white/45">» Aguardando briefing…</div>
          <div>
            <span className="text-primary">▸</span> <span className="text-white/85">Pronto pra escalar.</span>
            <span
              className="inline-block w-[6px] h-[12px] bg-primary ml-1"
              style={{ animation: 'mz-cursor-blink 1s steps(1) infinite' }}
            />
          </div>
        </div>
      </Block>

      {/* Splitter & Glow utilities */}
      <TwoCol>
        <Block tag="Splitters" title="mz-splitter / mz-splitter-vert">
          <div className="flex flex-col gap-6">
            <div className="mz-splitter w-full" />
            <div className="text-sm text-white/70">
              Linha 1px com gradient lime no centro: <code className="mz-mono text-primary text-xs">transparent → #D2FF28 → transparent</code>.
            </div>
          </div>
        </Block>

        <Block tag="Glow Utilities" title="text-glow & box-glow">
          <div className="flex flex-col gap-3">
            <span className="text-2xl font-bold text-primary text-glow">
              99.97%
            </span>
            <div className="rounded-md border border-primary/30 bg-primary/5 box-glow p-3 text-sm text-primary">
              CTA com box-glow
            </div>
            <pre className="mz-mono text-[11px] text-white/65 bg-background/40 rounded p-2 border border-white/5">
{`.text-glow { text-shadow: 0 0 20px rgba(210,255,40,0.3); }
.box-glow  { box-shadow: 0 0 30px rgba(210,255,40,0.15); }`}
            </pre>
          </div>
        </Block>
      </TwoCol>

      {/* Tokens semânticos */}
      <Block tag="Tokens CSS" title="Variáveis HSL no :root">
        <pre className="mz-mono text-[12px] text-white/75 bg-background/40 rounded-md p-4 border border-white/10 overflow-x-auto leading-relaxed">
{`:root {
  --background: 120 6% 3%;       /* #080908 */
  --foreground: 0 0% 100%;       /* #FFFFFF */
  --card: 120 2% 10%;            /* #1A1B1A */
  --primary: 72 100% 58%;        /* #D2FF28 */
  --primary-foreground: 120 6% 3%;
  --muted-foreground: 0 0% 63%;  /* #A1A1A1 */
  --border: 120 2% 18%;
  --radius: 1rem;
}`}
        </pre>
      </Block>
    </TabShell>
  )
}
