import { motion } from "framer-motion";

export function About() {
  const stats = [
    { value: "10+", label: "Anos de Experiência" },
    { value: "30+", label: "Projetos Globais" },
    { value: "5", label: "Continentes de Atuação" },
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
              Uma Empresa Construída para <span className="text-primary">Resultados Extraordinários</span>
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
              A Mazari Corp é uma multinacional de tecnologia e inteligência de negócios. Não somos apenas executores; somos arquitetos do crescimento estratégico. 
              <br/><br/>
              Combinamos engenharia de software de ponta, marketing de performance agressivo e estruturação offshore premium para escalar operações além das fronteiras. Nosso foco é claro: estruturação empresarial robusta, escalabilidade e dominação de mercado.
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
