import { motion } from 'framer-motion'
import { MapPin, Sparkles } from 'lucide-react'
import { DecoratedHeading } from '../ui/DecoratedHeading'
import { GlobeWire } from '../effects/GlobeWire'
import { MzButton } from '../ui/MzButton'

interface Jurisdiction {
  name: string
  tagline: string
  desc: string
  setup: string         // "3 dias" · "2 semanas"
  tax: string           // "0%" · "5%"
  highlight?: boolean
}

const jurisdictions: Jurisdiction[] = [
  {
    name: 'Bahamas',
    tagline: 'Holding Offshore Premium',
    desc: 'Privacidade máxima e zero tributação sobre renda. Estrutura ideal pra patrimônio internacional e holdings familiares.',
    setup: '10 dias',
    tax: '0%',
  },
  {
    name: 'Dubai',
    tagline: 'Hub Global Tech & Fintech',
    desc: 'Free zones com 0% imposto corporativo. Destino preferido pra empresas Web3, SaaS e finanças globais.',
    setup: '2 semanas',
    tax: '0%',
  },
  {
    name: 'Malta',
    tagline: 'Jurisdição Europeia Regulada',
    desc: 'Passaporte UE para Web3, iGaming e fintechs. Regulação madura com benefício tributário estruturado.',
    setup: '4 semanas',
    tax: '5%',
  },
  {
    name: 'Marrocos',
    tagline: 'Ponte Europa-África',
    desc: 'Custos operacionais até 60% menores com acesso estratégico a dois continentes. Hub logístico emergente.',
    setup: '3 semanas',
    tax: '8.75%',
  },
  {
    name: 'Paraguai',
    tagline: 'Abertura Rápida',
    desc: 'Empresa operacional em dias. Tributação simplificada e custo até 70% menor que vizinhos. Porta pra Mercosul.',
    setup: '5 dias',
    tax: '10%',
  },
  {
    name: 'Paraguai — Cidadania',
    tagline: 'Residência + Passaporte',
    desc: 'Processo completo de residência permanente e cidadania. Segundo passaporte Mercosul com mobilidade global.',
    setup: '3 anos',
    tax: '—',
    highlight: true,
  },
]

export function Consulting() {
  return (
    <section id="consultoria" className="relative py-28 md:py-36 overflow-hidden">
      {/* Globo gigante no fundo, centralizado e com opacidade sutil */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] max-w-[95vw] aspect-square opacity-40 sm:opacity-55">
          <GlobeWire />
        </div>
      </div>

      {/* Vignette pra dar foco no conteúdo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(8,9,8,0.15) 0%, rgba(8,9,8,0.7) 75%, rgba(8,9,8,0.95) 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 z-10">
        {/* Header */}
        <DecoratedHeading
          tag="04. Expansão Internacional"
          text="Estruturação Global"
          accent="para Quem Pensa Grande."
          subhead="Jurisdições estratégicas, eficiência fiscal e proteção patrimonial. Operamos nos bastidores pra que sua empresa opere no mundo inteiro sem fricção."
          className="mb-20 md:mb-24"
        />

        {/* Grid 3×2 de jurisdições */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {jurisdictions.map((j, i) => (
            <motion.div
              key={j.name}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: 'easeOut' }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`mz-card-soft p-5 md:p-6 flex flex-col gap-4 relative group overflow-hidden ${
                j.highlight
                  ? 'border-primary/40 bg-primary/[0.03]'
                  : 'hover:border-primary/30'
              }`}
            >
              {/* highlight dot */}
              {j.highlight && (
                <div className="absolute top-4 right-4">
                  <span className="mz-dot" />
                </div>
              )}

              {/* Scan line horizontal on hover */}
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <h3 className="text-lg md:text-xl font-bold text-white">{j.name}</h3>
                    <span className="mz-mono text-[9px] uppercase tracking-widest text-primary/80">
                      {j.tagline}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-white/60 leading-relaxed flex-1">{j.desc}</p>

              {/* Bottom row: setup + tax */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex flex-col">
                  <span className="mz-mono text-[9px] uppercase tracking-widest text-white/40">
                    Setup
                  </span>
                  <span className="mz-mono text-[12px] text-white/85">{j.setup}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="mz-mono text-[9px] uppercase tracking-widest text-white/40">
                    Imposto
                  </span>
                  <span className="mz-mono text-[12px] text-primary font-bold">
                    {j.tax}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer: benefícios em mono */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 border-t border-white/10 pt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 mz-mono text-[10px] uppercase tracking-widest text-white/45"
        >
          <span className="flex items-center gap-2">
            <span className="mz-dot" style={{ width: 5, height: 5 }} />
            Sigilo absoluto
          </span>
          <span className="flex items-center gap-2">
            <span className="mz-dot" style={{ width: 5, height: 5 }} />
            Atendimento white-glove
          </span>
          <span className="flex items-center gap-2">
            <span className="mz-dot" style={{ width: 5, height: 5 }} />
            Estruturação fim a fim
          </span>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2 mz-mono text-[11px] uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Conversa confidencial · sem compromisso
          </div>
          <MzButton
            variant="primary"
            onClick={() =>
              document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Criar Minha Offshore
          </MzButton>
        </motion.div>
      </div>
    </section>
  )
}
