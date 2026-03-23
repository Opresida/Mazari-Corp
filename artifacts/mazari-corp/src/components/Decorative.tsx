import { motion } from "framer-motion";

export function Sparkle({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0, rotate: -45 }}
      animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
      transition={{ 
        duration: 3, 
        repeat: Infinity, 
        delay: delay,
        ease: "easeInOut" 
      }}
      className={`absolute w-6 h-6 text-primary ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0C12 0 12 9.5 24 12C12 12 12 24 12 24C12 24 12 14.5 0 12C12 12 12 0 12 0Z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

export function RadialGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[radial-gradient(circle_at_center,_rgba(27,46,16,0.6)_0%,_transparent_60%)] opacity-80 mix-blend-screen" />
    </div>
  );
}
