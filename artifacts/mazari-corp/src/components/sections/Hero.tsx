import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { RadialGlow, Sparkle } from "../Decorative";

export function Hero() {
  const scrollToContact = () => {
    document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.querySelector('#servicos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
      <RadialGlow />
      
      {/* Decorative elements */}
      <Sparkle className="top-[20%] left-[15%] hidden md:block" delay={0} />
      <Sparkle className="top-[30%] right-[20%] hidden md:block" delay={1} />
      <Sparkle className="bottom-[25%] left-[25%] hidden md:block w-4 h-4" delay={2} />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Tecnologia · Inovação · Escala</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-[80px] leading-[1.05] mt-6 mb-8 max-w-4xl font-extrabold"
        >
          Transformando Empresas em <br className="hidden md:block" />
          <span className="text-primary italic font-serif font-medium relative inline-block text-glow">
            Potências Globais
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-60" viewBox="0 0 200 12" fill="none">
              <path d="M2 10C50 2 150 2 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
        >
          A Mazari Corp é a parceria estratégica que sua empresa precisa para crescer no mercado nacional e internacional — com tecnologia, marketing e estruturação de alto padrão.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button size="lg" className="w-full sm:w-auto" onClick={scrollToContact}>
            Fale com um Especialista
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={scrollToServices}>
            Conheça Nossos Serviços
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
