import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'wouter'
import { HAS_ANALYTICS, getStoredConsent, setConsent } from '@/lib/analytics'

/**
 * Banner de consentimento (LGPD).
 *
 * Só aparece se houver analytics configurado e se o usuário ainda não decidiu.
 * Enquanto não decide, o Consent Mode mantém `analytics_storage: denied` — ou
 * seja, nada de cookie. Recusar é tão fácil quanto aceitar, que é o que a LGPD
 * exige.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!HAS_ANALYTICS) return
    if (getStoredConsent() !== null) return
    // Espera o splash sair para não competir com a primeira impressão
    const t = setTimeout(() => setVisible(true), 2600)
    return () => clearTimeout(t)
  }, [])

  function decide(value: 'granted' | 'denied') {
    setConsent(value)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          role="dialog"
          aria-label="Aviso de cookies"
          className="fixed bottom-0 left-0 right-0 z-[9998] px-4 pb-4 sm:px-6 sm:pb-6"
          style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          <div className="mz-card-soft mx-auto flex max-w-3xl flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="text-[13px] leading-relaxed text-white/70">
              Usamos cookies de análise para entender como o site é usado. Nada é coletado antes de
              você aceitar.{' '}
              <Link
                href="/privacidade"
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                Política de Privacidade
              </Link>
              .
            </p>

            <div className="flex flex-shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => decide('denied')}
                className="mz-mono rounded-full border border-white/15 px-4 py-2.5 text-[11px] uppercase tracking-widest text-white/70 transition-colors hover:border-white/30 hover:text-white"
              >
                Recusar
              </button>
              <button
                type="button"
                onClick={() => decide('granted')}
                className="mz-mono rounded-full bg-primary px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-black transition-opacity hover:opacity-90"
              >
                Aceitar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
