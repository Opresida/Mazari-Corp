export function TrustedBrands() {
  const brands = [
    "TechVault", "NexaCorp", "DigitalFlow", "BlockForge", 
    "MarketEdge", "ScaleHub", "InnovateBR", "FintechPro", 
    "VentureLab", "GlobalNet"
  ];

  return (
    <section className="py-12 bg-card border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
          Empresas que confiam na Mazari
        </p>
      </div>
      
      <div className="relative flex w-full overflow-hidden">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-card to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-card to-transparent z-10" />
        
        <div className="flex animate-marquee whitespace-nowrap min-w-max">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div 
              key={i} 
              className="mx-8 text-xl md:text-2xl font-bold text-muted-foreground/40 font-sans tracking-tight"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
