import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";

const serviceOptions = [
  "Desenvolvimento Web/App",
  "Blockchain & Tokenização",
  "Consultoria Offshore",
  "Inteligência Artificial",
  "Outro",
];

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Recebemos sua solicitação!",
        description: "Nossa equipe responderá em até 24 horas com uma proposta personalizada.",
        className: "bg-card border-primary text-white",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section id="contato" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-full max-w-4xl h-full bg-[radial-gradient(circle_at_center,_rgba(210,255,40,0.05)_0%,_transparent_50%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/50 backdrop-blur-md p-8 md:p-14 rounded-[40px] border border-white/10 text-center"
        >
          <span className="eyebrow mx-auto">Próximo Passo</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Sua Próxima Vantagem Competitiva{" "}
            <span className="text-primary italic font-serif font-medium text-glow">Começa com Uma Conversa.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Conte o que precisa. Nossa equipe analisa seu cenário e responde em até 24 horas com uma proposta personalizada — sem compromisso.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl mx-auto text-left">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2 ml-2">Nome completo</label>
              <Input id="name" required placeholder="Ex: João Silva" />
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-white mb-2 ml-2">WhatsApp</label>
              <Input id="whatsapp" required type="tel" placeholder="+55 (11) 99999-9999" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2 ml-2">E-mail corporativo</label>
              <Input id="email" required type="email" placeholder="joao@suaempresa.com" />
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-white mb-2 ml-2">Serviço de interesse</label>
              <select
                id="service"
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Selecione...</option>
                {serviceOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full mt-4 h-14 text-lg text-black font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando solicitação..." : "Solicitar Proposta Personalizada"}
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Seus dados estão 100% protegidos. Respondemos em até 24h.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
