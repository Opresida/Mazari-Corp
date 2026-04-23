import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '../ui/input'
import { useToast } from '@/hooks/use-toast'
import { User, Phone, Mail, Briefcase, Sparkles, ShieldCheck, Clock } from 'lucide-react'
import { DecoratedHeading } from '../ui/DecoratedHeading'
import { MzButton } from '../ui/MzButton'
import { IntegrationsList } from '../ui/IntegrationsList'

const serviceOptions = [
  'Desenvolvimento Web / App',
  'Blockchain & Tokenização',
  'DeFi & Smart Contracts',
  'Inteligência Artificial',
  'Consultoria Offshore',
  'Estrutura Global Multi-jurisdição',
  'Outro',
]

export function Contact() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: 'Recebemos sua solicitação!',
        description:
          'Nossa equipe responderá em até 24h com uma proposta personalizada.',
        className: 'bg-card border-primary text-white',
      })
      ;(e.target as HTMLFormElement).reset()
    }, 1500)
  }

  return (
    <section
      id="contato"
      className="relative py-28 md:py-32 overflow-hidden"
    >
      {/* Grid sutil de fundo */}
      <div
        className="absolute inset-0 mz-grid-bg opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      {/* Glow ambiente */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(210,255,40,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 z-10">
        {/* Header */}
        <DecoratedHeading
          tag="05. Próximo Passo"
          text="Sua Próxima Vantagem Competitiva"
          accent="Começa com Uma Conversa."
          subhead="Conte o que você precisa. Nossa equipe analisa seu cenário e responde em até 24 horas com uma proposta personalizada — sem compromisso."
          className="mb-16 md:mb-20"
        />

        {/* Grid principal: info à esquerda, form à direita */}
        <div className="grid lg:grid-cols-[0.9fr,1.1fr] gap-8 lg:gap-12 items-start">
          {/* ═══ Coluna esquerda: o que acontece depois ═══ */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            {/* Card: o que acontece ao enviar */}
            <div className="mz-card-soft p-6 md:p-7 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="mz-tag">O que acontece agora</span>
              </div>
              <IntegrationsList
                items={[
                  'Recebemos seu pedido em até 1 hora útil',
                  'Análise técnica e de viabilidade em 24 horas',
                  'Proposta personalizada com escopo, prazo e investimento',
                  'Reunião estratégica agendada (opcional · sem custo)',
                  'Sigilo absoluto — NDA disponível no 1º contato',
                ]}
              />
            </div>

            {/* Card: garantias */}
            <div className="grid grid-cols-2 gap-4">
              <div className="mz-card-soft p-4 flex flex-col gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
                  Resposta
                </span>
                <span className="text-lg font-bold text-white">≤ 24h</span>
              </div>
              <div className="mz-card-soft p-4 flex flex-col gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
                  Sigilo
                </span>
                <span className="text-lg font-bold text-white">NDA</span>
              </div>
            </div>

            {/* "Terminal" decorativo */}
            <div className="mz-card-soft p-4 font-mono text-[11px] leading-5 text-white/65">
              <div className="flex items-center gap-2 pb-2 mb-2 border-b border-white/10">
                <span className="w-2 h-2 rounded-full bg-red-400/50" />
                <span className="w-2 h-2 rounded-full bg-yellow-400/50" />
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="mz-mono text-[9px] uppercase tracking-widest text-white/30 ml-2">
                  mazari.contact
                </span>
              </div>
              <div>
                <span className="text-primary">$</span>{' '}
                <span className="text-white/85">mazari init --project</span>
              </div>
              <div className="text-white/45">» Aguardando briefing…</div>
              <div>
                <span className="text-primary">▸</span>{' '}
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                >
                  Pronto pra escalar.
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* ═══ Coluna direita: formulário ═══ */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="mz-card-soft p-4 sm:p-6 md:p-8 flex flex-col gap-5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="mz-tag">Briefing técnico</span>
              <span className="flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/40">
                <span className="mz-dot" style={{ width: 5, height: 5 }} />
                Form secured
              </span>
            </div>

            <FieldText
              id="name"
              label="Nome completo"
              icon={<User className="h-3.5 w-3.5" />}
              placeholder="Seu nome completo"
              required
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <FieldText
                id="whatsapp"
                label="WhatsApp"
                icon={<Phone className="h-3.5 w-3.5" />}
                type="tel"
                placeholder="+55 (11) 99999-9999"
                required
              />
              <FieldText
                id="email"
                label="E-mail corporativo"
                icon={<Mail className="h-3.5 w-3.5" />}
                type="email"
                placeholder="voce@empresa.com"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="service"
                className="flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/55"
              >
                <Briefcase className="h-3.5 w-3.5 text-primary" />
                Serviço de interesse
              </label>
              <select
                id="service"
                className="flex h-11 w-full rounded-md border border-white/10 bg-background/60 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:border-primary/60 focus-visible:ring-1 focus-visible:ring-primary/40 transition"
              >
                <option value="">Selecione…</option>
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/55"
              >
                <span className="mz-dot" style={{ width: 5, height: 5 }} />
                Conte seu cenário (opcional)
              </label>
              <textarea
                id="message"
                rows={3}
                placeholder="Ex: Preciso tokenizar um ativo imobiliário e estruturar a venda em Dubai…"
                className="w-full rounded-md border border-white/10 bg-background/60 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:border-primary/60 focus-visible:ring-1 focus-visible:ring-primary/40 transition resize-none"
              />
            </div>

            <div className="pt-2">
              <MzButton
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                className="w-full justify-between"
              >
                {isSubmitting ? 'Enviando…' : 'Solicitar Proposta Personalizada'}
              </MzButton>
            </div>

            <p className="mz-mono text-[10px] uppercase tracking-widest text-center text-white/35 mt-1">
              Seus dados estão 100% protegidos · Respondemos em até 24h
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

/* ═══════════ FIELD WRAPPER ═══════════ */

interface FieldProps {
  id: string
  label: string
  icon: React.ReactNode
  type?: string
  placeholder?: string
  required?: boolean
}

function FieldText({ id, label, icon, type = 'text', placeholder, required }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/55"
      >
        <span className="text-primary">{icon}</span>
        {label}
      </label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-11 bg-background/60 border-white/10 focus-visible:border-primary/60 focus-visible:ring-primary/40"
      />
    </div>
  )
}
