import { Code2, Boxes } from 'lucide-react'
import { FloatingCard } from '../ui/FloatingCard'
import { IntegrationsList } from '../ui/IntegrationsList'
import { DecoratedHeading } from '../ui/DecoratedHeading'
import { GradientSplitter } from '../ui/GradientSplitter'

export function StackTecnico() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0 mz-grid-bg opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        {/* Header central com setas decorativas */}
        <DecoratedHeading
          tag="Stack Técnico"
          text="Linguagens que Dominamos,"
          accent="frameworks que entregamos."
          subhead="Mais de 10 anos escrevendo código em produção. Não contratamos por currículo — entregamos por resultado."
          className="mb-20"
        />

        {/* Dois FloatingCards lado a lado */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <FloatingCard side="left">
            <div className="flex flex-col gap-6 h-full">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-md bg-primary/10 border border-primary/30 text-primary">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Engenharia Frontend & Backend</h3>
              </div>
              <p className="text-sm text-white/65 leading-relaxed">
                Stack moderna e type-safe. Código revisado, testado e instrumentado desde o
                primeiro commit. Infraestrutura cloud-native em produção.
              </p>
              <IntegrationsList
                items={[
                  'React + Next.js + TypeScript',
                  'Node.js + Express + Drizzle ORM',
                  'Python (automação, IA, pipelines)',
                  'Java (sistemas robustos corporativos)',
                  'PostgreSQL · Neon · Supabase',
                  'AWS · Vercel · Netlify · Replit',
                ]}
              />
            </div>
          </FloatingCard>

          {/* Splitter vertical central (desktop) */}
          <div className="hidden md:flex absolute top-8 bottom-8 left-1/2 -translate-x-1/2 items-center pointer-events-none">
            <GradientSplitter orientation="vertical" />
          </div>

          <FloatingCard side="right">
            <div className="flex flex-col gap-6 h-full">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-md bg-primary/10 border border-primary/30 text-primary">
                  <Boxes className="h-5 w-5" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Blockchain & Web3</h3>
              </div>
              <p className="text-sm text-white/65 leading-relaxed">
                30+ tokens lançados. 10+ anos escrevendo Solidity. Padrões de segurança
                institucional e deploy multi-chain battle-tested.
              </p>
              <IntegrationsList
                items={[
                  'Solidity (10+ anos, 30+ tokens)',
                  'Ethereum · Polygon · BSC',
                  'Hardhat · Foundry (testing + deploy)',
                  'OpenZeppelin (standards auditados)',
                  'The Graph (indexação on-chain)',
                  'IPFS · Arweave (storage descentralizado)',
                ]}
              />
            </div>
          </FloatingCard>
        </div>
      </div>
    </section>
  )
}
