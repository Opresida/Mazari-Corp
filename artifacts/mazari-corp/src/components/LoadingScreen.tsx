import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  isVisible: boolean
  onExitComplete?: () => void
}

/**
 * Boot sequence style loader:
 * - logo MAZARI com cursor piscando
 * - terminal com 5 linhas de inicialização (staggered)
 * - barra de progresso fina lime
 * - status "READY" quando chega em 100%
 */
const BOOT_STEPS = [
  { key: 'core', label: 'mazari.core', detail: 'initializing runtime' },
  { key: 'engine', label: 'engine.mount', detail: 'rendering pipeline' },
  { key: 'chain', label: 'blockchain.sync', detail: 'rpc handshake ok' },
  { key: 'ia', label: 'intelligence.load', detail: 'neural cores up' },
  { key: 'ui', label: 'interface.ready', detail: 'all systems nominal' },
]

export function LoadingScreen({ isVisible, onExitComplete }: LoadingScreenProps) {
  const progress = useMotionValue(0)
  const progressText = useTransform(progress, (v) => `${Math.round(v)}`)
  const barWidth = useTransform(progress, (v) => `${v}%`)
  const [currentStep, setCurrentStep] = useState(0)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!isVisible) return
    // Anima progresso em ~4.5s
    const controls = animate(progress, 100, {
      duration: 4.5,
      ease: [0.2, 0.6, 0.3, 1],
      onUpdate: (v) => {
        const step = Math.min(BOOT_STEPS.length - 1, Math.floor((v / 100) * BOOT_STEPS.length))
        setCurrentStep(step)
        if (v >= 99) setIsReady(true)
      },
    })
    return () => controls.stop()
  }, [isVisible, progress])

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isVisible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center px-5"
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          }}
        >
          {/* Grid de fundo */}
          <div
            className="absolute inset-0 mz-grid-bg opacity-40 pointer-events-none"
            aria-hidden="true"
          />

          {/* Glow central */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(210,255,40,0.06) 0%, transparent 70%)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative z-10 w-full max-w-md flex flex-col gap-8"
          >
            {/* Logo + cursor */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-baseline gap-1">
                <span
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white"
                  style={{
                    textShadow: '0 0 20px rgba(210,255,40,0.4)',
                  }}
                >
                  MAZARI
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-primary">.</span>
                <motion.span
                  animate={{ opacity: [0.1, 1, 0.1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-[8px] h-[22px] sm:h-[26px] bg-primary ml-1"
                  style={{ boxShadow: '0 0 10px rgba(210,255,40,0.7)' }}
                  aria-hidden="true"
                />
              </div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                Infrastructure · Blockchain · IA
              </span>
            </div>

            {/* Terminal */}
            <div className="mz-card-soft p-4 flex flex-col gap-1.5">
              <div className="flex items-center justify-between pb-2 mb-1 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400/50" />
                  <span className="w-2 h-2 rounded-full bg-yellow-400/50" />
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-[9px] uppercase tracking-widest text-white/30">
                  mazari.boot
                </span>
              </div>

              {BOOT_STEPS.map((step, i) => {
                const done = i < currentStep
                const active = i === currentStep && !isReady
                const pending = i > currentStep
                return (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{
                      opacity: pending ? 0.3 : 1,
                      x: 0,
                    }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="flex items-center gap-2.5 text-[11px] leading-5"
                  >
                    <span
                      className={
                        done
                          ? 'text-primary'
                          : active
                            ? 'text-amber-300'
                            : 'text-white/20'
                      }
                      style={{ minWidth: 12 }}
                    >
                      {done ? '✓' : active ? '▸' : '·'}
                    </span>
                    <span
                      className={
                        done
                          ? 'text-white/80'
                          : active
                            ? 'text-white/90'
                            : 'text-white/30'
                      }
                    >
                      {step.label}
                    </span>
                    <span className="text-white/30 ml-auto text-[10px]">
                      {done ? 'ok' : active ? '...' : 'idle'}
                    </span>
                  </motion.div>
                )
              })}
            </div>

            {/* Progresso */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-white/40">
                <span>Loading</span>
                <span className="flex items-center gap-1 text-primary">
                  <motion.span>{progressText}</motion.span>
                  <span>%</span>
                </span>
              </div>
              <div className="h-[3px] rounded-full bg-white/10 overflow-hidden relative">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-primary"
                  style={{
                    width: barWidth,
                    boxShadow: '0 0 12px rgba(210,255,40,0.7)',
                  }}
                />
              </div>
              {/* Status */}
              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest pt-1">
                <span className="text-white/40">
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-2"
                    style={{ boxShadow: '0 0 6px rgba(210,255,40,0.7)' }}
                  />
                  {isReady ? 'SYSTEM READY' : BOOT_STEPS[currentStep]?.detail}
                </span>
                <span className="text-primary/70">v1.0</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
