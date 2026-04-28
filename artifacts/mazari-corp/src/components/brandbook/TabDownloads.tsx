import { Download, FileCode, Palette, Type, FileText, Box } from 'lucide-react'
import { TabShell, Block } from './TabShell'

interface AssetItem {
  icon: typeof Download
  category: string
  name: string
  format: string
  desc: string
  size?: string
}

const ASSETS: AssetItem[] = [
  { icon: Box, category: 'Logo', name: 'mazari-logo-primary', format: 'SVG', desc: 'Wordmark + ponto lime · sobre dark', size: '4 KB' },
  { icon: Box, category: 'Logo', name: 'mazari-logo-mono-light', format: 'SVG', desc: 'Wordmark mono branco', size: '3 KB' },
  { icon: Box, category: 'Logo', name: 'mazari-logo-mono-dark', format: 'SVG', desc: 'Wordmark mono dark · para fundos lime', size: '3 KB' },
  { icon: Box, category: 'Logo', name: 'mazari-favicon', format: 'SVG', desc: 'Favicon institucional · 180×180', size: '1 KB' },
  { icon: Box, category: 'Logo', name: 'mazari-logo-pack', format: 'ZIP', desc: 'Pacote completo: SVG + PNG @ 1×/2×/3× + PDF', size: '420 KB' },
  { icon: Palette, category: 'Tokens', name: 'mazari-colors.css', format: 'CSS', desc: 'Variáveis HSL prontas para :root', size: '2 KB' },
  { icon: Palette, category: 'Tokens', name: 'mazari-tokens.json', format: 'JSON', desc: 'Design tokens W3C-format · cor, tipo, espaço', size: '6 KB' },
  { icon: Palette, category: 'Tokens', name: 'mazari-palette.ase', format: 'ASE', desc: 'Adobe Swatch Exchange · Photoshop/Illustrator', size: '1 KB' },
  { icon: Type, category: 'Tipografia', name: 'plus-jakarta-sans', format: 'Google Fonts', desc: 'Família variável · 400→800', size: 'Externo' },
  { icon: Type, category: 'Tipografia', name: 'jetbrains-mono', format: 'Google Fonts', desc: 'Família monoespaçada · 300→700', size: 'Externo' },
  { icon: FileCode, category: 'Componentes', name: 'mazari-tailwind.config', format: 'TS', desc: 'Config Tailwind 4 com tokens Mazari', size: '4 KB' },
  { icon: FileCode, category: 'Componentes', name: 'mazari-utilities.css', format: 'CSS', desc: 'mz-tag · mz-dot · mz-card-soft · mz-grid-bg', size: '5 KB' },
  { icon: FileText, category: 'Templates', name: 'proposta-comercial-mazari', format: 'DOCX', desc: 'Template editável da proposta comercial', size: '180 KB' },
  { icon: FileText, category: 'Templates', name: 'pitch-deck-mazari', format: 'PPTX/Keynote', desc: 'Slide master 16:9 com sistema visual', size: '2.4 MB' },
  { icon: FileText, category: 'Templates', name: 'email-signature', format: 'HTML', desc: 'Assinatura responsiva pronta para Gmail/Outlook', size: '3 KB' },
  { icon: FileText, category: 'Templates', name: 'business-card', format: 'PDF', desc: 'Cartão 90×55mm · CMYK pronto para gráfica', size: '600 KB' },
  { icon: FileText, category: 'Brandbook', name: 'mazari-brandbook-v1', format: 'PDF', desc: 'Versão impressa do brandbook · 48 páginas A4', size: '8 MB' },
]

const CATEGORIES = ['Logo', 'Tokens', 'Tipografia', 'Componentes', 'Templates', 'Brandbook']

function AssetRow({ asset }: { asset: AssetItem }) {
  const Icon = asset.icon
  return (
    <button
      type="button"
      onClick={() => alert(`Download de "${asset.name}.${asset.format.toLowerCase()}" — disponibilize o arquivo na pasta /public/brandbook/`)}
      className="group flex items-center gap-4 px-4 py-3 rounded-md border border-white/10 bg-background/60 hover:border-primary/40 transition-all text-left"
    >
      <div className="w-9 h-9 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <span className="mz-mono text-sm text-white font-semibold truncate">
          {asset.name}.{asset.format.toLowerCase().split(' ')[0]}
        </span>
        <span className="text-xs text-white/55 truncate">{asset.desc}</span>
      </div>
      <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
        <span className="mz-tag" style={{ fontSize: 9 }}>
          {asset.format}
        </span>
        {asset.size && (
          <span className="mz-mono text-[9px] uppercase tracking-widest text-white/40">
            {asset.size}
          </span>
        )}
      </div>
      <Download className="h-4 w-4 text-white/40 group-hover:text-primary transition-colors flex-shrink-0" />
    </button>
  )
}

export function TabDownloads() {
  return (
    <TabShell
      number="12"
      eyebrow="Downloads"
      title="Tudo o que você"
      accent="precisa, em arquivo."
      lead="Logos, tokens, fonts, templates, brandbook em PDF e modelos editáveis. Os assets ainda não estão hospedados — substitua os handlers pelos paths reais ao publicar /public/brandbook/."
    >
      {/* CTA pacote completo */}
      <Block tag="Pacote Completo" title="Mazari Brand Kit · v1.0">
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <div className="flex-1 flex flex-col gap-2">
            <p className="text-base text-white/85 leading-relaxed">
              Tudo nesta página em um único ZIP: logos em todos os formatos, tokens
              CSS/JSON/ASE, fonts, templates editáveis, este brandbook em PDF.
            </p>
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
              ~12 MB · atualizado 04 / 2026
            </span>
          </div>
          <button
            type="button"
            onClick={() => alert('Substitua por o link real do brand kit em /public/brandbook/mazari-brand-kit-v1.zip')}
            className="group inline-flex items-center gap-3 rounded-md bg-primary text-background px-5 py-3 font-mono uppercase text-xs font-bold tracking-wider hover:brightness-110 hover:shadow-[0_0_24px_rgba(210,255,40,0.45)] transition-all"
          >
            <Download className="h-4 w-4" />
            Baixar Brand Kit
          </button>
        </div>
      </Block>

      {/* Por categoria */}
      {CATEGORIES.map((cat) => {
        const items = ASSETS.filter((a) => a.category === cat)
        if (!items.length) return null
        return (
          <div key={cat} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="mz-tag">{cat}</span>
              <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
                {items.length} {items.length === 1 ? 'arquivo' : 'arquivos'}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {items.map((a) => (
                <AssetRow key={a.name} asset={a} />
              ))}
            </div>
          </div>
        )
      })}

      {/* Licença */}
      <Block tag="Licença" title="Termos de uso">
        <div className="flex flex-col gap-3 text-sm text-white/70 leading-relaxed">
          <p>
            <strong className="text-white">Uso interno:</strong> colaboradores Mazari Corp
            podem aplicar livremente em comunicações oficiais, decks, propostas e
            material institucional.
          </p>
          <p>
            <strong className="text-white">Uso por parceiros:</strong> requer
            autorização por escrito de <code className="mz-mono text-primary text-xs">brand@mazaricorp.com</code>{' '}
            antes de qualquer publicação.
          </p>
          <p>
            <strong className="text-white">Modificações:</strong> o wordmark e o ponto lime
            não podem ser alterados, recoloridos ou recombinados. Templates editáveis
            permitem customização apenas dos campos marcados como
            <code className="mz-mono text-primary text-xs"> [editável]</code>.
          </p>
        </div>
      </Block>
    </TabShell>
  )
}
