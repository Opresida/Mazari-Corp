import { motion } from "framer-motion";

export function Consulting() {
  const countries = [
    { name: "Bahamas", desc: "Holding offshore premium com privacidade máxima e zero tributação sobre renda.", active: true },
    { name: "Dubai", desc: "Hub global para tech e finanças. Free zones com 0% imposto corporativo.", active: false },
    { name: "Marrocos", desc: "Ponte estratégica entre Europa e África. Custos operacionais competitivos.", active: false },
    { name: "Malta", desc: "Jurisdição europeia regulada para Web3, gaming e fintechs. Passaporte EU.", active: false },
    { name: "Paraguai", desc: "Abertura de empresa em dias. Tributação simplificada e custo até 70% menor.", active: false },
    { name: "Paraguai (Cidadania)", desc: "Processo completo de residência e cidadania. Segundo passaporte Mercosul.", active: true, highlight: true }
  ];

  return (
    <section id="consultoria" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-[radial-gradient(circle_at_top_right,_rgba(27,46,16,0.3)_0%,_transparent_60%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="eyebrow">Expansão Internacional</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Estruturação Global{" "}
              <br className="hidden md:block"/>
              <span className="text-primary italic font-serif font-medium text-glow">para Quem Pensa Grande.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Jurisdições estratégicas, eficiência fiscal e proteção patrimonial. Operamos nos bastidores para que sua empresa opere no mundo inteiro sem fricção.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country, index) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                country.highlight ? "border-primary bg-card/80" : "border-white/5 bg-card hover:border-white/20"
              }`}
            >
              {country.highlight && (
                <div className="absolute top-0 right-0 p-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-3">{country.name}</h3>
              <p className="text-muted-foreground text-sm">{country.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center border-t border-white/5 pt-8">
          <p className="text-sm tracking-widest uppercase font-bold text-muted-foreground/60 flex flex-wrap justify-center gap-4 sm:gap-8">
            <span>Sigilo Absoluto</span>
            <span className="hidden sm:inline">·</span>
            <span>Atendimento White-Glove</span>
            <span className="hidden sm:inline">·</span>
            <span>Estruturação Fim a Fim</span>
          </p>
        </div>
      </div>
    </section>
  );
}
