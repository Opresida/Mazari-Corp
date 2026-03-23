import { motion } from "motion/react";

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

interface TestimonialsColumnProps {
  testimonials: Testimonial[];
  duration?: number;
  className?: string;
}

export function TestimonialsColumn({
  testimonials,
  duration = 15,
  className,
}: TestimonialsColumnProps) {
  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      <motion.div
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex flex-col gap-4"
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <div
            key={i}
            className="bg-card border border-white/5 rounded-2xl p-6 relative"
          >
            <div className="text-5xl text-primary font-serif absolute top-4 left-5 opacity-20 leading-none select-none">
              "
            </div>
            <p className="text-sm text-white/80 leading-relaxed mb-5 pt-4 relative z-10">
              {t.text}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm shrink-0">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{t.name}</p>
                <p className="text-xs text-primary">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
