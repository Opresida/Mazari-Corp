import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    name: "Ricardo M.",
    role: "CEO, IDASAM",
    text: "A Mazari não entregou um sistema. Entregou uma máquina que roda sozinha. Nosso time opera com metade do esforço e o dobro do resultado desde a implantação.",
  },
  {
    name: "Fernando L.",
    role: "CTO, i2TA",
    text: "Precisávamos de engenharia sério. Sem firula, sem atraso, sem desculpa. A Mazari entregou exatamente isso — e a arquitetura já suportou 10x o volume inicial.",
  },
  {
    name: "Patrícia S.",
    role: "Diretora, Glomam",
    text: "Tokenização parecia território desconhecido. A equipe da Mazari transformou complexidade em clareza. Smart contracts auditados e token no ar em menos de 90 dias.",
  },
  {
    name: "André K.",
    role: "Fundador, Startup Fintech",
    text: "Já trabalhei com agências, consultorias e freelancers. A Mazari é outra categoria. Envolvimento real da liderança, código limpo e zero surpresa no cronograma.",
  },
  {
    name: "Mariana T.",
    role: "COO, Empresa de Logística",
    text: "A automação que implementaram economiza mais de 50 horas por semana do nosso time operacional. O ROI se pagou no primeiro mês.",
  },
  {
    name: "Diego R.",
    role: "Diretor Financeiro",
    text: "A estruturação offshore pela Mazari foi cirúrgica. Redução de 55% na carga tributária com total conformidade. Profissionalismo que nunca vi no mercado.",
  },
  {
    name: "Camila V.",
    role: "Product Manager, SaaS B2B",
    text: "Do wireframe ao deploy em produção em 8 semanas. A plataforma que a Mazari construiu é o core do nosso negócio hoje.",
  },
  {
    name: "Thiago N.",
    role: "Investidor, Web3",
    text: "Auditei pessoalmente os smart contracts antes do lançamento. Código sólido, documentação impecável. A Mazari sabe o que faz em blockchain.",
  },
  {
    name: "Luciana B.",
    role: "CEO, Health Tech",
    text: "Integração com 4 APIs externas, dashboard em tempo real e app mobile. Tudo entregue no prazo. A Mazari virou nosso parceiro tecnológico permanente.",
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
          <h2 className="text-4xl font-extrabold">Resultados que Nossos Clientes <span className="text-primary italic font-serif font-medium text-glow">Confirmam</span></h2>
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
