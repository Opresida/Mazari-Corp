import { motion } from "framer-motion";
import { BarChart3, PenTool, TerminalSquare, Link as LinkIcon } from "lucide-react";

export function Services() {
  const services = [
    {
      title: "Marketing & Performance",
      icon: <BarChart3 className="w-6 h-6 text-background" />,
      items: [
        "Consultoria estratégica de marketing digital",
        "Gestão de tráfego pago (Meta Ads, Google Ads)",
        "Construção de funis de vendas e escala",
        "Otimização agressiva de ROI"
      ]
    },
    {
      title: "Design & Presença Digital",
      icon: <PenTool className="w-6 h-6 text-background" />,
      items: [
        "Criação de identidade visual profissional",
        "Desenvolvimento de interfaces modernas (UI/UX)",
        "Gestão e administração de redes sociais",
        "Produção de criativos de alta conversão"
      ]
    },
    {
      title: "Desenvolvimento & Programação",
      icon: <TerminalSquare className="w-6 h-6 text-background" />,
      items: [
        "Python (automação, backend, IA)",
        "Java (sistemas robustos e escaláveis)",
        "Desenvolvimento de plataformas personalizadas",
        "Integrações e automações avançadas"
      ]
    },
    {
      title: "Blockchain & Smart Contracts",
      icon: <LinkIcon className="w-6 h-6 text-background" />,
      items: [
        "+10 anos de experiência em Solidity",
        "+30 tokens já lançados com sucesso",
        "Projetos nacionais e internacionais",
        "Contratos inteligentes seguros e auditáveis"
      ]
    }
  ];

  return (
    <section id="servicos" className="py-32 bg-card/30 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow mx-auto"
          >
            Nossos Serviços
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Soluções Completas para <br/>
            <span className="text-primary italic font-serif">Crescer Sem Limites</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* Decorative Connecting Lines (Desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-white/5 -z-10" />
          <div className="hidden md:block absolute left-1/2 top-[10%] bottom-[10%] w-[1px] bg-white/5 -z-10" />

          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-8 md:p-10 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] group"
            >
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-6 text-white">{service.title}</h3>
              <ul className="space-y-4">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
