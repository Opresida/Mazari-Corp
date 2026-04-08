import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Globe, Smartphone, Cpu, Brain } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Sites & Plataformas Web",
    description: "Landing pages de alta conversão, plataformas SaaS, dashboards e portais corporativos. Stack moderna com React, Next.js e infraestrutura cloud-native.",
  },
  {
    icon: Smartphone,
    title: "Aplicativos Mobile",
    description: "Apps nativos e multiplataforma para iOS e Android. Da prototipação ao lançamento nas stores, com UX pensada para retenção e engajamento real.",
  },
  {
    icon: Cpu,
    title: "Sistemas & Automação",
    description: "ERPs customizados, integrações via API, automações com Python e pipelines de dados. Eliminamos trabalho manual e multiplicamos a capacidade operacional.",
  },
  {
    icon: Brain,
    title: "Inteligência Artificial",
    description: "Modelos de IA aplicados ao seu negócio: chatbots inteligentes, análise preditiva, processamento de linguagem natural e automação cognitiva sob medida.",
  },
];

export function Desenvolvimento() {
  return (
    <section id="desenvolvimento" className="py-32 relative overflow-hidden">
      {/* Subtle blue tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(40, 100, 255, 0.03) 0%, transparent 70%)' }}
      />

      {/* Decorative number */}
      <div className="absolute top-8 right-8 md:right-16 text-[180px] md:text-[240px] font-extrabold leading-none text-white/[0.02] select-none pointer-events-none">
        01
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="eyebrow">Desenvolvimento & Engenharia</span>
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
            Do Conceito ao Código.{" "}
            <br className="hidden md:block" />
            <span className="text-primary italic font-serif font-medium text-glow">
              Do Código ao Mercado.
            </span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Projetamos e desenvolvemos plataformas, aplicativos e sistemas inteligentes que escalam com seu negócio. Cada linha de código é pensada para performance, segurança e crescimento.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card p-8 md:p-10 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                <service.icon className="w-7 h-7 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            className="text-black font-bold"
            onClick={() => document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Quero Desenvolver Meu Projeto
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
