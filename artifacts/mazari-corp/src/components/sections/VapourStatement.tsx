import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";

const MAZARI_PHRASES = [
  "Tecnologia de Classe Mundial",
  "Resultados Extraordinários",
  "Escala Global",
  "Inovação Sem Limites",
];

export function VapourStatement() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 flex flex-col items-center gap-6 text-center">
        <p className="text-sm font-semibold tracking-widest text-primary uppercase">
          Nossa Visão
        </p>

        <div className="w-full h-[120px] md:h-[160px]">
          <VaporizeTextCycle
            texts={MAZARI_PHRASES}
            font={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "64px",
              fontWeight: 700,
            }}
            color="rgb(210, 255, 40)"
            spread={4}
            density={6}
            animation={{
              vaporizeDuration: 2.2,
              fadeInDuration: 1,
              waitDuration: 1.5,
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
