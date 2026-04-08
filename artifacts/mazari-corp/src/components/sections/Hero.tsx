import { motion } from "framer-motion";
import { Button } from "../ui/button";
import EnergyCanvas from "../EnergyCanvas";

export function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      <EnergyCanvas />

      {/* Ambient glow behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(210,255,40,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Engenharia Digital · Blockchain · Inteligência Artificial</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-[72px] leading-[1.08] mt-6 mb-8 max-w-4xl font-extrabold"
        >
          Construímos a Tecnologia{" "}
          <br className="hidden md:block" />
          que{" "}
          <span className="text-primary italic font-serif font-medium relative inline-block text-glow">
            Move Negócios Globais
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-60" viewBox="0 0 200 12" fill="none">
              <path d="M2 10C50 2 150 2 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
        >
          A Mazari Corp projeta, desenvolve e escala produtos digitais e soluções blockchain para empresas que recusam o comum. Mais de 10 anos transformando ambição em infraestrutura.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button size="lg" className="w-full sm:w-auto text-black font-bold" onClick={() => scrollTo('#contato')}>
            Agendar Reunião Estratégica
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => scrollTo('#cases')}>
            Ver Nossos Projetos
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
