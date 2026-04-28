import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { TabShell, Block, TwoCol, Rule } from './TabShell'

interface ColorChip {
  name: string
  role: string
  hex: string
  hsl: string
  textOn?: 'light' | 'dark'
  border?: boolean
}

const PRIMARY_PALETTE: ColorChip[] = [
  { name: 'Mazari Lime', role: 'Primary · Acento principal', hex: '#D2FF28', hsl: 'hsl(72, 100%, 58%)', textOn: 'dark' },
  { name: 'Void', role: 'Background · Base do produto', hex: '#080908', hsl: 'hsl(120, 6%, 3%)', textOn: 'light', border: true },
  { name: 'Pure White', role: 'Foreground · Texto primário', hex: '#FFFFFF', hsl: 'hsl(0, 0%, 100%)', textOn: 'dark' },
]

const NEUTRALS: ColorChip[] = [
  { name: 'Card', role: 'Superfície elevada', hex: '#1A1B1A', hsl: 'hsl(120, 2%, 10%)', textOn: 'light' },
  { name: 'Muted', role: 'Backgrounds sutis', hex: '#1F201F', hsl: 'hsl(120, 2%, 12%)', textOn: 'light' },
  { name: 'Secondary', role: 'Hover · Estado neutro', hex: '#262726', hsl: 'hsl(120, 2%, 15%)', textOn: 'light' },
  { name: 'Border', role: 'Linhas e divisores', hex: '#2D2E2D', hsl: 'hsl(120, 2%, 18%)', textOn: 'light' },
  { name: 'Muted FG', role: 'Texto secundário', hex: '#A1A1A1', hsl: 'hsl(0, 0%, 63%)', textOn: 'dark' },
]

const SEMANTIC: ColorChip[] = [
  { name: 'Success', role: 'Mesmo do Primary', hex: '#D2FF28', hsl: 'hsl(72, 100%, 58%)', textOn: 'dark' },
  { name: 'Destructive', role: 'Erros e ações destrutivas', hex: '#EF4444', hsl: 'hsl(0, 84%, 60%)', textOn: 'light' },
  { name: 'Warning', role: 'Alertas (uso restrito)', hex: '#F59E0B', hsl: 'hsl(38, 92%, 50%)', textOn: 'dark' },
  { name: 'Info', role: 'Mesmo do Muted FG', hex: '#A1A1A1', hsl: 'hsl(0, 0%, 63%)', textOn: 'dark' },
]

const OPACITIES = [
  { token: 'white/85', label: 'Texto principal alternativo', alpha: 0.85 },
  { token: 'white/65', label: 'Lead / corpo de texto', alpha: 0.65 },
  { token: 'white/45', label: 'Texto auxiliar', alpha: 0.45 },
  { token: 'white/30', label: 'Texto desabilitado', alpha: 0.3 },
  { token: 'white/10', label: 'Bordas sutis', alpha: 0.1 },
]

function ColorCard({ chip }: { chip: ColorChip }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(chip.hex).catch(() => undefined)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group flex flex-col items-stretch text-left rounded-md overflow-hidden border border-white/10 hover:border-primary/40 transition-colors"
    >
      <div
        className={`relative h-28 flex items-end justify-end p-3 ${chip.border ? 'border-b border-white/15' : ''}`}
        style={{ backgroundColor: chip.hex }}
      >
        <span
          className={`mz-mono text-[10px] uppercase tracking-widest ${
            chip.textOn === 'dark' ? 'text-background/70' : 'text-white/60'
          }`}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />}
        </span>
      </div>
      <div className="p-3 bg-background/60 flex flex-col gap-1">
        <span className="text-sm font-bold text-white">{chip.name}</span>
        <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
          {chip.role}
        </span>
        <div className="flex items-center justify-between mt-2 gap-2">
          <span className="mz-mono text-[11px] text-primary">{chip.hex}</span>
          <span className="mz-mono text-[9px] text-white/40 truncate">{chip.hsl}</span>
        </div>
      </div>
    </button>
  )
}

export function TabColor() {
  return (
    <TabShell
      number="03"
      eyebrow="Cor"
      title="Lime sobre o vácuo."
      accent="Cor é assinatura, não decoração."
      lead="A paleta Mazari é deliberadamente reduzida: um lime neon contra um quase-preto. O contraste extremo é a identidade — funciona como sinal de operação viva sobre infraestrutura silenciosa."
    >
      {/* Paleta primária */}
      <Block tag="Paleta Primária" title="As três cores que definem a marca">
        <div className="grid sm:grid-cols-3 gap-4">
          {PRIMARY_PALETTE.map((c) => (
            <ColorCard key={c.name} chip={c} />
          ))}
        </div>
        <p className="mt-4 text-sm text-white/60 leading-relaxed">
          Clique em qualquer chip para copiar o HEX. A regra de ouro: <strong className="text-white">lime acende, branco informa, void contém</strong>.
        </p>
      </Block>

      {/* Neutros */}
      <Block tag="Neutros" title="Escala de superfícies">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {NEUTRALS.map((c) => (
            <ColorCard key={c.name} chip={c} />
          ))}
        </div>
      </Block>

      {/* Semânticas */}
      <Block tag="Semânticas" title="Cores funcionais">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SEMANTIC.map((c) => (
            <ColorCard key={c.name} chip={c} />
          ))}
        </div>
      </Block>

      {/* Opacidades */}
      <Block tag="Sistema de Opacidade" title="Hierarquia tipográfica via alpha">
        <div className="flex flex-col gap-2">
          {OPACITIES.map((o) => (
            <div
              key={o.token}
              className="flex items-center gap-4 rounded-md border border-white/10 bg-background/60 p-3"
            >
              <span
                className="mz-mono text-sm font-semibold w-32 flex-shrink-0"
                style={{ color: `rgba(255,255,255,${o.alpha})` }}
              >
                {o.token}
              </span>
              <span
                className="text-sm flex-1 truncate"
                style={{ color: `rgba(255,255,255,${o.alpha})` }}
              >
                The quick brown fox — {o.label}
              </span>
              <span className="mz-mono text-[10px] uppercase tracking-widest text-white/40">
                α {o.alpha}
              </span>
            </div>
          ))}
        </div>
      </Block>

      <TwoCol>
        {/* Acessibilidade */}
        <Block tag="Acessibilidade" title="Contraste WCAG">
          <div className="flex flex-col gap-3">
            <div className="rounded-md p-4 bg-background border border-white/10">
              <span className="text-white text-sm">Branco sobre Void</span>
              <div className="flex items-center gap-3 mt-1">
                <span className="mz-mono text-[10px] text-primary">21:1</span>
                <span className="mz-mono text-[9px] uppercase tracking-widest text-white/45">
                  AAA · texto qualquer tamanho
                </span>
              </div>
            </div>
            <div className="rounded-md p-4 bg-background border border-white/10">
              <span className="text-primary text-sm font-semibold">Lime sobre Void</span>
              <div className="flex items-center gap-3 mt-1">
                <span className="mz-mono text-[10px] text-primary">15.8:1</span>
                <span className="mz-mono text-[9px] uppercase tracking-widest text-white/45">
                  AAA · texto qualquer tamanho
                </span>
              </div>
            </div>
            <div className="rounded-md p-4 bg-primary">
              <span className="text-background text-sm font-bold">Void sobre Lime</span>
              <div className="flex items-center gap-3 mt-1">
                <span className="mz-mono text-[10px] text-background/85">15.8:1</span>
                <span className="mz-mono text-[9px] uppercase tracking-widest text-background/65">
                  AAA · ideal para CTAs
                </span>
              </div>
            </div>
          </div>
        </Block>

        {/* Regras de uso */}
        <Block tag="Regras de Uso" title="Como aplicar a cor primária">
          <div className="flex flex-col gap-3">
            <Rule status="do" text="Use lime apenas em elementos que pedem atenção: CTAs, indicadores de status, dados-chave." />
            <Rule status="do" text="Mantenha proporção 90/10 — lime nunca deve ocupar mais de 10% da composição." />
            <Rule status="dont" text="Nunca aplique lime sobre cinzas claros ou branco — perde o glow característico." />
            <Rule status="dont" text="Evite gradientes lime → outras cores. O lime é sempre sólido." />
          </div>
        </Block>
      </TwoCol>
    </TabShell>
  )
}
