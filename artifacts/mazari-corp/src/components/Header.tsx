import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { Menu, X, ArrowUpRight, Phone, Mail } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { MzButton } from './ui/MzButton'

const NAV_LINKS: Array<{ label: string; href: string }> = [
  { label: 'Desenvolvimento', href: '#desenvolvimento' },
  { label: 'Blockchain', href: '#blockchain' },
  { label: 'Processo', href: '#processo' },
  { label: 'Cases', href: '#cases' },
  { label: 'Consultoria', href: '#consultoria' },
  { label: 'Contato', href: '#contato' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Barra de progresso do scroll no header
  const { scrollYProgress } = useScroll()
  const progressX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.3,
  })

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Trava o scroll do body quando o menu mobile está aberto
  useEffect(() => {
    if (!mobileMenuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileMenuOpen])

  // ESC fecha o menu mobile
  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileMenuOpen])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Status bar superior (mini) */}
      <div
        className={`hidden md:flex items-center justify-between max-w-7xl mx-auto px-6 text-[9px] mz-mono uppercase tracking-[0.25em] text-white/40 mb-2 transition-all duration-300 ${
          isScrolled ? 'opacity-0 h-0 mb-0 overflow-hidden' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="mz-dot" style={{ width: 5, height: 5 }} />
            Online · GMT-3
          </span>
          <span className="text-white/25">||</span>
          <span>5 continentes · 10+ anos</span>
        </div>
        <div className="flex items-center gap-2 text-primary/70">
          <span>v1.0</span>
          <span className="text-white/25">·</span>
          <span>mazari.corp</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-baseline gap-0.5 cursor-pointer group">
            <span className="mz-mono text-xl sm:text-2xl font-extrabold tracking-tight text-white group-hover:text-primary transition-colors">
              MAZARI
            </span>
            <span className="mz-mono text-xl sm:text-2xl font-extrabold text-primary">
              .
            </span>
            <motion.span
              animate={{ opacity: [0.15, 1, 0.15] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="inline-block w-[3px] h-[16px] sm:h-[18px] bg-primary ml-1 opacity-70 group-hover:opacity-100 transition-opacity"
              aria-hidden="true"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="relative group mz-mono text-[11px] uppercase tracking-widest text-white/60 hover:text-primary transition-colors"
            >
              {/* Número prefixo */}
              <span className="text-white/25 group-hover:text-primary/60 transition-colors mr-1.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{link.label}</span>
              {/* Underline scan */}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <MzButton
            variant="ghost"
            onClick={() =>
              document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Agendar
          </MzButton>
        </div>

        {/* Mobile Toggle */}
        <button
          aria-label="Abrir menu"
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md border border-white/10 bg-background/40 text-primary hover:border-primary/40 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Barra de progresso do scroll na base */}
      <motion.div
        style={{ scaleX: progressX, transformOrigin: '0% 50%' }}
        className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-primary/70 via-primary to-primary/70"
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] md:hidden bg-background"
            style={{
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            {/* Background: grid + glow */}
            <div
              className="absolute inset-0 mz-grid-bg opacity-25 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(210,255,40,0.05) 0%, transparent 70%)',
              }}
            />

            <div className="relative h-full flex flex-col">
              {/* Top bar — logo + botão fechar */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/10">
                <div className="flex items-baseline gap-0.5">
                  <span className="mz-mono text-xl font-extrabold tracking-tight text-white">
                    MAZARI
                  </span>
                  <span className="mz-mono text-xl font-extrabold text-primary">.</span>
                </div>
                <button
                  type="button"
                  aria-label="Fechar menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 h-10 rounded-md border border-white/10 bg-white/5 text-white/70 active:scale-95 active:bg-primary/20 active:text-primary transition-all"
                >
                  <span className="mz-mono text-[10px] uppercase tracking-widest">
                    Fechar
                  </span>
                  <X size={16} />
                </button>
              </div>

              {/* Lista de seções — rolagem interna se precisar */}
              <nav
                className="relative flex-1 overflow-y-auto px-5 py-5"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <div className="mb-4 flex items-center gap-2 mz-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                  <span className="mz-dot" style={{ width: 5, height: 5 }} />
                  Seções
                </div>
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.03, duration: 0.25 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => scrollTo(e, link.href)}
                        className="group flex items-center gap-4 px-3 py-4 rounded-lg border border-transparent active:border-primary/30 active:bg-primary/10 transition-all min-h-[60px]"
                      >
                        <span className="mz-mono text-[11px] text-primary/60 tracking-widest w-6 flex-shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[22px] font-bold text-white tracking-tight flex-1 leading-none">
                          {link.label}
                        </span>
                        <ArrowUpRight
                          size={18}
                          className="text-white/30 group-active:text-primary group-active:translate-x-0.5 group-active:-translate-y-0.5 transition-all flex-shrink-0"
                        />
                      </a>
                    </motion.li>
                  ))}
                </ul>

                {/* Atalhos de contato */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="mt-8"
                >
                  <div className="mb-3 flex items-center gap-2 mz-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                    <span className="mz-dot" style={{ width: 5, height: 5 }} />
                    Contato direto
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="https://wa.me/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mz-card-soft flex items-center gap-2 px-3 py-3 active:border-primary/40 active:scale-[0.98] transition-all"
                    >
                      <Phone size={14} className="text-primary flex-shrink-0" />
                      <span className="mz-mono text-[11px] text-white/80 truncate">
                        WhatsApp
                      </span>
                    </a>
                    <a
                      href="mailto:contato@mazari.corp"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mz-card-soft flex items-center gap-2 px-3 py-3 active:border-primary/40 active:scale-[0.98] transition-all"
                    >
                      <Mail size={14} className="text-primary flex-shrink-0" />
                      <span className="mz-mono text-[11px] text-white/80 truncate">
                        E-mail
                      </span>
                    </a>
                  </div>
                </motion.div>
              </nav>

              {/* Footer sticky com CTA + status */}
              <div className="relative px-5 pt-4 pb-5 border-t border-white/10 bg-background/95 backdrop-blur">
                <MzButton
                  variant="primary"
                  className="w-full justify-between"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    document
                      .querySelector('#contato')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Agendar Reunião
                </MzButton>
                <div className="mt-3 flex items-center justify-center gap-2 mz-mono text-[9px] uppercase tracking-[0.25em] text-white/35">
                  <span className="mz-dot" style={{ width: 4, height: 4 }} />
                  Online · GMT-3 · Resp. em 24h
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
