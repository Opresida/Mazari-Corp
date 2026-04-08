import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Coins, FileCode, Landmark, Compass } from "lucide-react";

const services = [
  {
    icon: Coins,
    title: "Tokenização de Ativos",
    description: "Transforme ativos reais em tokens digitais: imóveis, commodities, participações societárias. Estruturação jurídica, técnica e regulatória completa.",
  },
  {
    icon: FileCode,
    title: "Smart Contracts",
    description: "Contratos inteligentes auditáveis em Solidity, escritos com padrões de segurança institucional. Deploy em Ethereum, Polygon, BSC e chains customizadas.",
  },
  {
    icon: Landmark,
    title: "DeFi & Protocolos",
    description: "Arquitetura e desenvolvimento de protocolos DeFi: pools de liquidez, staking, yield farming e governança descentralizada com contratos battle-tested.",
  },
  {
    icon: Compass,
    title: "Consultoria Web3",
    description: "Estratégia completa para entrada no ecossistema Web3: tokenomics, whitepaper técnico, auditoria de segurança e estruturação para captação.",
  },
];

export function Blockchain() {
  return (
    <section id="blockchain" className="py-32 bg-card/30 relative overflow-hidden">
      {/* Hexagonal grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52' viewBox='0 0 60 52'%3E%3Cpath d='M30 0L60 17.32V34.64L30 51.96L0 34.64V17.32Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 52px',
          animation: 'hexDrift 20s linear infinite',
        }}
      />

      {/* Subtle green tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(40, 255, 100, 0.03) 0%, transparent 70%)' }}
      />

      {/* Decorative number */}
      <div className="absolute top-8 right-8 md:right-16 text-[180px] md:text-[240px] font-extrabold leading-none text-white/[0.02] select-none pointer-events-none">
        02
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="eyebrow">Blockchain & Web3</span>
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl">
            Tokenização, Smart Contracts{" "}
            <br className="hidden md:block" />
            <span className="text-primary italic font-serif font-medium text-glow">
              e a Nova Economia Digital.
            </span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Mais de 30 tokens lançados. Mais de 10 anos escrevendo Solidity. A Mazari Corp é referência em engenharia blockchain para projetos que exigem segurança absoluta e execução impecável.
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
            Iniciar Projeto Blockchain
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
