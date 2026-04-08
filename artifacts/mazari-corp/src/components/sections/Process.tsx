import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Imersão",
    description: "Mergulhamos no seu negócio, mercado e objetivos. Sem briefing genérico — entendemos o contexto real antes de propor qualquer solução.",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Arquitetura",
    description: "Desenhamos a solução técnica completa: stack, infraestrutura, cronograma e métricas de sucesso. Você aprova antes de qualquer linha de código.",
  },
  {
    icon: Code2,
    number: "03",
    title: "Construção",
    description: "Sprints curtos com entregas visíveis. Cada ciclo tem revisão, teste e validação. Você acompanha tudo em tempo real.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Escala",
    description: "Lançamos, monitoramos e otimizamos. A Mazari não desaparece após a entrega — continuamos até o resultado estar consolidado.",
  },
];

export function Process() {
  return (
    <section id="processo" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="eyebrow">Nosso Processo</span>
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl mx-auto">
            Metodologia que Elimina Achismo{" "}
            <span className="text-primary italic font-serif font-medium text-glow">
              e Entrega Resultado.
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center group"
            >
              {/* Step circle */}
              <div className="relative mx-auto mb-6">
                <div className="w-[72px] h-[72px] rounded-full border-2 border-white/10 group-hover:border-primary/50 bg-card flex items-center justify-center mx-auto transition-all duration-300 relative z-10">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                {/* Pulse ring */}
                <div className="absolute inset-0 w-[72px] h-[72px] rounded-full border border-primary/20 mx-auto animate-ping opacity-0 group-hover:opacity-100" style={{ animationDuration: '2s' }} />
              </div>

              <span className="text-xs font-bold text-primary/60 tracking-widest uppercase mb-2 block">
                Etapa {step.number}
              </span>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
