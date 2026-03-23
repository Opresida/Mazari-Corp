import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  isVisible: boolean;
  onExitComplete?: () => void;
}

export function LoadingScreen({ isVisible, onExitComplete }: LoadingScreenProps) {
  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isVisible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#080908",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "1.75rem",
                letterSpacing: "-0.02em",
                color: "#D2FF28",
                textShadow:
                  "0 0 20px rgba(210, 255, 40, 0.6), 0 0 40px rgba(210, 255, 40, 0.3)",
              }}
            >
              Mazari Corp
            </span>

            <div style={{ position: "relative", width: 56, height: 56 }}>
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                style={{
                  animation: "mazari-spin 1s linear infinite",
                  filter:
                    "drop-shadow(0 0 8px rgba(210, 255, 40, 0.8)) drop-shadow(0 0 16px rgba(210, 255, 40, 0.4))",
                }}
              >
                <circle
                  cx="28"
                  cy="28"
                  r="22"
                  stroke="rgba(210, 255, 40, 0.15)"
                  strokeWidth="4"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="22"
                  stroke="#D2FF28"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="30 108"
                  strokeDashoffset="0"
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
