import { motion } from "framer-motion";
import { Monitor, Code2, Link } from "lucide-react";

const cases = [
  {
    icon: Monitor,
    tag: "Plataforma Digital",
    client: "IDASAM",
    challenge: "Digitalizar operações complexas de um instituto ambiental e criar uma plataforma escalável do zero — com CRM, gerador de documentos, assinatura digital e gestão completa.",
    result: "Sistema em produção com milhares de interações, suíte documental completa, CRM com 5 tipos de stakeholder e integração com APIs externas.",
  },
  {
    icon: Code2,
    tag: "Engenharia de Software",
    client: "i2TA",
    challenge: "Desenvolver presença digital e infraestrutura tecnológica para instituto de inteligência e tecnologia aplicada com necessidades específicas do setor.",
    result: "Site institucional completo com brandbook integrado, sistema admin, gestão de conteúdo e arquitetura preparada para crescimento de 10x sem refatoração.",
  },
  {
    icon: Link,
    tag: "Blockchain & Tokenização",
    client: "Glomam",
    challenge: "Criar infraestrutura blockchain segura para tokenização com compliance regulatório e interface acessível para membros não-técnicos.",
    result: "Smart contracts auditados, token lançado com sucesso e plataforma operacional com rastreabilidade completa de transações.",
  },
];

export function Cases() {
  return (
    <section id="cases" className="py-32 bg-card/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="eyebrow">Casos Reais</span>
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl mx-auto">
            Projetos que Provam{" "}
            <span className="text-primary italic font-serif font-medium text-glow">
              o que Prometemos.
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((item, index) => (
            <motion.div
              key={item.client}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-3xl border border-white/5 hover:border-primary/20 overflow-hidden transition-all duration-300"
            >
              {/* Scan line effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

              {/* Left accent border */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/30 group-hover:bg-primary transition-colors duration-300" />

              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-primary/70 tracking-wider uppercase">{item.tag}</span>
                </div>

                <h3 className="text-2xl font-extrabold text-white mb-6">{item.client}</h3>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-muted-foreground/60 tracking-wider uppercase block mb-1">Desafio</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.challenge}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary/60 tracking-wider uppercase block mb-1">Resultado</span>
                    <p className="text-sm text-white/80 leading-relaxed">{item.result}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
