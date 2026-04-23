import { motion } from "framer-motion";
import { Code2, Link, Layers, TrendingUp } from "lucide-react";

const capabilities = [
  { icon: Code2, label: "Engenheiros Full-Stack" },
  { icon: Link, label: "Especialistas Blockchain" },
  { icon: Layers, label: "Arquitetos de Soluções" },
  { icon: TrendingUp, label: "Estrategistas de Negócios" },
];

export function Team() {
  return (
    <section id="equipe" className="py-32 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="eyebrow">Quem Está por Trás</span>
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl mx-auto">
            Liderança que Entende{" "}
            <span className="text-primary italic font-serif font-medium text-glow">
              de Código e de Negócios.
            </span>
          </h2>
        </motion.div>

        {/* Founder card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-3xl border border-white/5 p-10 md:p-14 text-center max-w-2xl mx-auto mb-16 relative overflow-hidden"
        >
          {/* Glow accent */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(210,255,40,0.04) 0%, transparent 70%)' }}
          />

          <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-extrabold text-primary">MZ</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-1">Liderança Sênior</h3>
          <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-6">Fundação & Direção</p>

          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Mais de uma década construindo tecnologia para empresas em 5 continentes. Engenharia de software, especialização em blockchain e estratégia de negócios internacionais. Na Mazari Corp, cada projeto tem envolvimento direto da liderança — porque escala sem excelência é só volume.
          </p>
        </motion.div>

        {/* Team capabilities */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card/50 rounded-2xl border border-white/5 p-6 text-center hover:border-primary/20 transition-colors duration-300"
            >
              <cap.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="text-sm font-semibold text-white">{cap.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
