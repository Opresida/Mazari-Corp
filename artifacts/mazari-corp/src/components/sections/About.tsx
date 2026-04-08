import { motion } from "framer-motion";

export function About() {
  const stats = [
    { value: "10+", label: "Anos no Mercado Global" },
    { value: "30+", label: "Projetos Entregues" },
    { value: "5", label: "Continentes Ativos" },
  ];

  return (
    <section id="sobre" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">Sobre Nós</span>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Não Somos Uma Agência.{" "}
              <span className="text-primary italic font-serif font-medium text-glow">Somos Arquitetos de Infraestrutura Digital.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              A Mazari Corp nasceu da obsessão por construir tecnologia que funciona em escala real. Fundada por Humberto Mazari, a empresa opera em 5 continentes combinando engenharia de software, blockchain e inteligência artificial para criar soluções que empresas comuns não conseguem imaginar — e muito menos executar.
              <br/><br/>
              Nosso time não entrega projetos. Entrega vantagens competitivas permanentes.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
