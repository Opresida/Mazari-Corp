import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    name: "Rafael M.",
    role: "CEO, TechVault",
    text: "A Mazari Corp transformou nossa operação digital completamente. Em 6 meses, nosso faturamento cresceu 340% com a nova estrutura e automações implementadas.",
  },
  {
    name: "Camila S.",
    role: "Diretora, NexaCorp",
    text: "A consultoria offshore foi impecável. Estruturamos nossa empresa no exterior com total segurança, transparência e eficiência fiscal extraordinária.",
  },
  {
    name: "Pedro A.",
    role: "Fundador, BlockForge",
    text: "Os smart contracts desenvolvidos pela equipe são impecáveis. Mais de 15 tokens lançados com 100% de segurança e nenhuma falha nas auditorias.",
  },
  {
    name: "Ana L.",
    role: "CMO, DigitalFlow",
    text: "O ROI das campanhas aumentou 280% após a consultoria de marketing de performance. Resultado analítico e brutal, acima de qualquer expectativa.",
  },
  {
    name: "Bruno T.",
    role: "CTO, InfraStack",
    text: "A automação de processos que a Mazari implementou economizou mais de 40 horas semanais da nossa equipe. A eficiência operacional é incomparável.",
  },
  {
    name: "Juliana F.",
    role: "CEO, FinBridge",
    text: "Com a estrutura offshore orientada pela Mazari Corp, reduzimos nossa carga tributária em 60% de forma totalmente legal e transparente.",
  },
  {
    name: "Lucas P.",
    role: "Diretor, CryptoBase",
    text: "O lançamento do nosso token foi um sucesso absoluto. A equipe de smart contracts da Mazari garantiu segurança e performance em cada linha de código.",
  },
  {
    name: "Fernanda R.",
    role: "VP Marketing, ScaleUp",
    text: "As estratégias de growth implementadas pela Mazari elevaram nossa base de usuários em 5x em apenas um trimestre. Expertise de classe mundial.",
  },
  {
    name: "Carlos V.",
    role: "Fundador, OpsCore",
    text: "A digitalização completa da nossa operação com a Mazari Corp foi transformadora. Processos que levavam dias agora acontecem em minutos com total rastreabilidade.",
  },
];

const column1 = [testimonials[0], testimonials[1], testimonials[2]];
const column2 = [testimonials[3], testimonials[4], testimonials[5]];
const column3 = [testimonials[6], testimonials[7], testimonials[8]];

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="eyebrow">Depoimentos</span>
          <h2 className="text-4xl font-bold">O Que Nossos Clientes Dizem</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[600px]">
          <TestimonialsColumn testimonials={column1} duration={18} />
          <TestimonialsColumn
            testimonials={column2}
            duration={22}
            className="hidden md:block"
          />
          <TestimonialsColumn
            testimonials={column3}
            duration={16}
            className="hidden lg:block"
          />
        </div>
      </div>
    </section>
  );
}
