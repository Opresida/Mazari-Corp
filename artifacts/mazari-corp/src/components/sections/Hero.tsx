import { motion } from 'framer-motion'
import { NetworkGrid3D } from '../effects/NetworkGrid3D'
import { SplitText } from '../ui/SplitText'
import { MzButton } from '../ui/MzButton'
import { IntegrationsList } from '../ui/IntegrationsList'
import { GradientSplitter } from '../ui/GradientSplitter'

export function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[100vh] flex flex-col overflow-hidden">
      {/* Background: grade 3D com nós pulsantes */}
      <NetworkGrid3D />

      {/* Overlay ambient glow no topo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 45% at 50% 30%, rgba(210,255,40,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Gradient fade no bottom pra destacar as info-boxes */}
      <div
        className="absolute inset-x-0 bottom-0 h-[50%] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(8,9,8,0.35) 40%, rgba(8,9,8,0.85) 100%)',
        }}
      />

      {/* ============ Conteúdo central ============ */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 text-center flex flex-col items-center pt-28 md:pt-40 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mz-tag text-[9px] sm:text-xs">
              Engenharia · Blockchain · IA
            </span>
          </motion.div>

          <h1 className="text-[32px] sm:text-5xl md:text-[72px] leading-[1.08] mt-5 sm:mt-6 mb-6 sm:mb-8 max-w-4xl font-extrabold px-1">
            <SplitText text="Construímos a Tecnologia" as="span" />
            <br className="hidden md:block" />
            <span>
              <SplitText text="que " as="span" delay={0.3} />
              <span className="text-primary italic font-serif font-medium relative inline-block text-glow">
                <SplitText text="Move Negócios Globais" as="span" delay={0.45} stagger={0.022} />
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-60"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 10C50 2 150 2 198 10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-2xl mb-8 sm:mb-10 leading-relaxed"
          >
            A Mazari Corp projeta, desenvolve e escala produtos digitais e soluções blockchain
            para empresas que recusam o comum. Mais de 10 anos transformando ambição em
            infraestrutura.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center"
          >
            <MzButton variant="primary" onClick={() => scrollTo('#contato')}>
              Agendar Reunião
            </MzButton>
            <MzButton variant="ghost" onClick={() => scrollTo('#cases')}>
              Ver Projetos
            </MzButton>
          </motion.div>
        </div>
      </div>

      {/* ============ Info-boxes inferiores (estilo TensorStax flexbox_abs_bot) ============ */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.35 }}
        className="relative z-10 w-full px-5 sm:px-6 pb-10"
      >
        <div className="max-w-7xl mx-auto">
          <GradientSplitter className="mb-6 sm:mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
            {/* Bloco esquerdo — Introducing + Scroll Down + Active Integrations */}
            <div className="flex flex-col gap-6">
              <div>
                <div className="mz-tag mb-3">Introducing Mazari Corp</div>
                <p className="text-sm text-white/70 leading-relaxed max-w-md">
                  Arquitetamos infraestrutura digital para empresas globais. Engenharia de
                  software, tokenização blockchain e IA integradas em um único time senior
                  que opera em 5 continentes.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="mz-mono text-[10px] uppercase tracking-widest text-white/40 animate-pulse">
                    (Scroll Down)
                  </span>
                  <span className="mz-tag">Active Services</span>
                </div>
                <IntegrationsList
                  compact
                  items={[
                    'Plataformas Web & SaaS',
                    'Apps iOS / Android',
                    'Smart Contracts & Tokenização',
                    'Inteligência Artificial',
                    'Consultoria Internacional',
                  ]}
                />
              </div>
            </div>

            {/* Bloco direito — Trusted + descrição */}
            <div className="flex flex-col gap-4 md:items-end">
              <div className="mz-card-soft p-5 w-full md:max-w-md">
                <div className="mz-tag mb-3">Trusted by Operators</div>
                <p className="text-sm text-white/75 leading-relaxed">
                  Operamos em produção para institutos de pesquisa, holdings internacionais,
                  fintechs, startups Web3 e plataformas DeFi que exigem segurança
                  institucional e execução impecável.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] mz-mono text-white/50 uppercase tracking-widest">
                  <span>
                    <span className="text-primary font-bold">10+</span> anos
                  </span>
                  <span>
                    <span className="text-primary font-bold">30+</span> projetos
                  </span>
                  <span>
                    <span className="text-primary font-bold">5</span> continentes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
