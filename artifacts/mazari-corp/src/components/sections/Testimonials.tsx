import { motion } from "framer-motion";

export function Testimonials() {
  const testimonials = [
    {
      name: "Rafael M.",
      role: "CEO, TechVault",
      text: "A Mazari Corp transformou nossa operação digital completamente. Em 6 meses, nosso faturamento cresceu 340% com a nova estrutura e automações."
    },
    {
      name: "Camila S.",
      role: "Diretora, NexaCorp",
      text: "A consultoria offshore foi impecável. Estruturamos nossa empresa no exterior com total segurança, transparência e eficiência fiscal extraordinária."
    },
    {
      name: "Pedro A.",
      role: "Fundador, BlockForge",
      text: "Os smart contracts desenvolvidos pela equipe são impecáveis. +15 tokens lançados com 100% de segurança e nenhuma falha nas auditorias."
    },
    {
      name: "Ana L.",
      role: "CMO, DigitalFlow",
      text: "O ROI das campanhas aumentou 280% após a consultoria de marketing de performance. Resultado analítico e brutal, acima de qualquer expectativa."
    }
  ];

  return (
    <section id="depoimentos" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="eyebrow">Depoimentos</span>
          <h2 className="text-4xl font-bold">O Que Nossos Clientes Dizem</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-8 rounded-3xl border border-white/5 relative"
            >
              <div className="text-6xl text-primary font-serif absolute top-6 left-6 opacity-20">"</div>
              <p className="text-lg text-white mb-8 relative z-10 pt-4 leading-relaxed font-medium">
                {t.text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-sm text-primary">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
