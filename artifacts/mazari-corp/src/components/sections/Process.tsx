import { motion } from 'framer-motion'
import { Search, PenTool, Code2, Rocket } from 'lucide-react'
import { SplitText } from '../ui/SplitText'
import { StepCard, type SubTask } from '../ui/StepCard'
import { GradientSplitter } from '../ui/GradientSplitter'

const steps: Array<{
  icon: typeof Search
  number: number
  title: string
  description: string
  subtasks: SubTask[]
}> = [
  {
    icon: Search,
    number: 1,
    title: 'Imersão',
    description:
      'Mergulhamos no seu negócio, mercado e objetivos. Sem briefing genérico — entendemos o contexto real antes de propor qualquer solução.',
    subtasks: [
      { title: 'Workshop de descoberta', detail: 'Stakeholders, objetivos, restrições' },
      { title: 'Análise competitiva', detail: 'Benchmark de mercado e tecnologia' },
      { title: 'Mapa de riscos', detail: 'Técnicos, regulatórios, operacionais' },
      { title: 'Definição de sucesso', detail: 'KPIs mensuráveis' },
    ],
  },
  {
    icon: PenTool,
    number: 2,
    title: 'Arquitetura',
    description:
      'Desenhamos a solução técnica completa: stack, infraestrutura, cronograma e métricas de sucesso. Você aprova antes de qualquer linha de código.',
    subtasks: [
      { title: 'Diagrama de sistema', detail: 'Módulos, fluxos de dados, integrações' },
      { title: 'Stack definido', detail: 'Frameworks, banco, infra, segurança' },
      { title: 'Cronograma de sprints', detail: 'Entregas e marcos de validação' },
      { title: 'Aprovação formal', detail: 'Você assina antes do primeiro commit' },
    ],
  },
  {
    icon: Code2,
    number: 3,
    title: 'Construção',
    description:
      'Sprints curtos com entregas visíveis. Cada ciclo tem revisão, teste e validação. Você acompanha tudo em tempo real.',
    subtasks: [
      { title: 'Ambiente de staging', detail: 'Acesso contínuo ao produto em evolução' },
      { title: 'Code review + testes', detail: 'Qualidade institucional em cada PR' },
      { title: 'Sync quinzenal', detail: 'Demo do que foi entregue, ajustes na rota' },
      { title: 'Documentação viva', detail: 'Wiki técnica e runbooks' },
    ],
  },
  {
    icon: Rocket,
    number: 4,
    title: 'Escala',
    description:
      'Lançamos, monitoramos e otimizamos. A Mazari não desaparece após a entrega — continuamos até o resultado estar consolidado.',
    subtasks: [
      { title: 'Deploy em produção', detail: 'Observabilidade + alertas configurados' },
      { title: 'Performance tuning', detail: 'Latência, custos, throughput' },
      { title: 'Hand-off ou continuidade', detail: 'Seu time assume, ou operamos juntos' },
      { title: 'Otimização contínua', detail: 'Iterações baseadas em dados reais' },
    ],
  },
]

export function Process() {
  return (
    <section id="processo" className="relative py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <div className="mz-tag mb-5">Nosso Processo</div>
          <h2 className="text-[30px] sm:text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
            <SplitText text="Metodologia que Elimina Achismo" as="span" />{' '}
            <span className="text-primary italic font-serif font-medium text-glow">
              <SplitText text="e Entrega Resultado." as="span" delay={0.3} />
            </span>
          </h2>
          <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-white/60 leading-relaxed max-w-2xl">
            4 etapas encadeadas que eliminam retrabalho e garantem entrega com previsibilidade.
            Cada etapa tem entregas concretas e ponto de aprovação — você nunca é surpreendido.
          </p>
        </motion.div>

        {/* Grid de 4 StepCards */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                <StepCard
                  stepNumber={step.number}
                  title={step.title}
                  icon={<Icon className="h-4 w-4" />}
                  description={step.description}
                  subtasks={step.subtasks}
                />
                {/* Splitter vertical entre cards (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-0 -right-4 h-full">
                    <GradientSplitter orientation="vertical" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
