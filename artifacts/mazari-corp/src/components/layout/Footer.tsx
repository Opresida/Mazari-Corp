export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-16">
          
          <div className="text-center md:text-left">
            <div className="text-3xl font-extrabold tracking-tight text-white mb-4">
              MAZARI<span className="text-primary">.</span>
            </div>
            <p className="text-muted-foreground max-w-xs text-sm">
              Transformando o potencial do seu negócio em realidade global através de tecnologia, estruturação e performance.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-center md:text-left">
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-2">Navegação</h4>
              <a href="#sobre" className="text-muted-foreground hover:text-primary transition-colors text-sm">Sobre Nós</a>
              <a href="#servicos" className="text-muted-foreground hover:text-primary transition-colors text-sm">Serviços</a>
              <a href="#consultoria" className="text-muted-foreground hover:text-primary transition-colors text-sm">Consultoria Offshore</a>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-2">Contato</h4>
              <a href="https://www.mazaricorp.com" className="text-muted-foreground hover:text-primary transition-colors text-sm font-mono">www.mazaricorp.com</a>
              <a href="mailto:corporativo@mazaricorp.com" className="text-muted-foreground hover:text-primary transition-colors text-sm font-mono">corporativo@mazaricorp.com</a>
            </div>
          </div>
          
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-muted-foreground">
          <p>© 2025 Mazari Corp. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
