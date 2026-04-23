import { motion } from 'framer-motion'
import { Layers, BrainCircuit } from 'lucide-react'
import { SplitText } from '../ui/SplitText'
import { FloatingCard } from '../ui/FloatingCard'
import { IntegrationsList } from '../ui/IntegrationsList'
import { GradientSplitter } from '../ui/GradientSplitter'
import { MzButton } from '../ui/MzButton'

export function Desenvolvimento() {
  return (
    <section id="desenvolvimento" className="relative py-28 md:py-32 overflow-hidden">
      {/* Tint sutil à esquerda */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 25% 45%, rgba(210,255,40,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Número decorativo de fundo */}
      <div className="absolute top-6 right-4 sm:top-8 sm:right-8 md:right-16 text-[80px] sm:text-[120px] md:text-[240px] font-extrabold leading-none text-white/[0.025] select-none pointer-events-none mz-mono">
        01
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        {/* Header estilo TensorStax — tag + H2 + paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 max-w-4xl"
        >
          <div className="mz-tag mb-5">01.</div>
          <h2 className="text-[30px] sm:text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
            <SplitText text="Do Conceito ao Código." as="span" />
            <br className="hidden md:block" />
            <span className="text-primary italic font-serif font-medium text-glow">
              <SplitText text="Do Código ao Mercado." as="span" delay={0.3} />
            </span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/65 max-w-2xl leading-relaxed">
            Projetamos e desenvolvemos plataformas, aplicativos e sistemas inteligentes que
            escalam com o seu negócio. Cada linha de código é pensada para performance,
            segurança e crescimento.
          </p>
        </motion.div>

        {/* Dois cards grandes com parallax (two_cards pattern) */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* ═════ Card Esquerdo: Produto Digital ═════ */}
          <FloatingCard side="left">
            <div className="flex flex-col gap-6 h-full">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mz-glow">
                    <Layers className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                    Plataformas & Apps
                  </h3>
                </div>
                <p className="text-sm text-white/65 leading-relaxed">
                  Produto digital ponta-a-ponta — da landing page de alta conversão ao app
                  nativo pronto pra loja. Stack moderna, UX pensada pra retenção real e
                  infraestrutura cloud-native desde o primeiro deploy.
                </p>
              </div>
              <IntegrationsList
                items={[
                  'Landing pages & plataformas SaaS',
                  'Dashboards e portais corporativos',
                  'Apps nativos iOS e Android',
                  'Multiplataforma (React Native, Expo)',
                  'UX de retenção com A/B testing integrado',
                ]}
              />
            </div>
          </FloatingCard>

          {/* Splitter vertical entre os dois (desktop) */}
          <div className="hidden md:flex absolute top-6 bottom-6 left-1/2 -translate-x-1/2 items-center pointer-events-none">
            <GradientSplitter orientation="vertical" />
          </div>

          {/* ═════ Card Direito: Sistemas & IA ═════ */}
          <FloatingCard side="right">
            <div className="flex flex-col gap-6 h-full">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mz-glow">
                    <BrainCircuit className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                    Sistemas & Inteligência
                  </h3>
                </div>
                <p className="text-sm text-white/65 leading-relaxed">
                  Automação sob medida e IA aplicada. Do ERP customizado que elimina
                  planilha ao modelo que prevê churn — tudo rodando em produção com
                  observabilidade e governança do dia 1.
                </p>
              </div>
              <IntegrationsList
                items={[
                  'ERPs customizados e integrações por API',
                  'Automação com Python e pipelines de dados',
                  'Chatbots inteligentes e agentes autônomos',
                  'NLP, análise preditiva e modelos sob medida',
                  'Observabilidade, logging e governança de dados',
                ]}
              />
            </div>
          </FloatingCard>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <MzButton
            variant="primary"
            onClick={() =>
              document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Quero Desenvolver Meu Projeto
          </MzButton>
        </motion.div>
      </div>
    </section>
  )
}
