import { useEffect, useState } from "react";
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";

const MAZARI_PHRASES = [
  "Tecnologia de Classe Mundial",
  "Resultados Extraordinários",
  "Escala Global",
  "Inovação Sem Limites",
];

type Breakpoint = "mobile" | "tablet" | "desktop";

function useBreakpoint(): Breakpoint {
  const getBreakpoint = (): Breakpoint => {
    if (typeof window === "undefined") return "desktop";
    if (window.innerWidth < 640) return "mobile";
    if (window.innerWidth < 1024) return "tablet";
    return "desktop";
  };

  const [bp, setBp] = useState<Breakpoint>(getBreakpoint);

  useEffect(() => {
    const onResize = () => setBp(getBreakpoint());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return bp;
}

const FONT_CONFIG: Record<Breakpoint, { fontSize: string; containerH: string }> = {
  mobile:  { fontSize: "30px",  containerH: "h-[80px]"  },
  tablet:  { fontSize: "46px",  containerH: "h-[110px]" },
  desktop: { fontSize: "64px",  containerH: "h-[160px]" },
};

export function VapourStatement() {
  const bp = useBreakpoint();
  const { fontSize, containerH } = FONT_CONFIG[bp];

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 flex flex-col items-center gap-5 text-center">
        <p className="text-sm font-semibold tracking-widest text-primary uppercase">
          Nossa Visão
        </p>

        <div className={`w-full ${containerH}`}>
          <VaporizeTextCycle
            key={bp}
            texts={MAZARI_PHRASES}
            font={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize,
              fontWeight: 700,
            }}
            color="rgb(210, 255, 40)"
            spread={6}
            density={6}
            animation={{
              vaporizeDuration: 1.2,
              fadeInDuration: 0.8,
              waitDuration: 0.8,
            }}
            direction="left-to-right"
            alignment="center"
            tag={Tag.H2}
          />
        </div>

        <p className="max-w-xl text-muted-foreground text-base md:text-lg leading-relaxed">
          Há mais de uma década moldando o futuro digital de empresas em quatro continentes.
        </p>
      </div>
    </section>
  );
}
