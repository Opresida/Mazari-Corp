import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ConsentBanner } from "@/components/ConsentBanner";
import { useState, useEffect, lazy, Suspense } from "react";
import { useLenis } from "@/lib/useLenis";
import { initAnalytics, trackPageView } from "@/lib/analytics";

/*
  Brandbook e Validar carregam pdf-lib, html2canvas e jsPDF. Estáticos, eles
  entravam no bundle da home — que é a única página que precisa ranquear.
  Em lazy, quem só visita a home não baixa nada disso.
*/
const Brandbook = lazy(() => import("@/pages/Brandbook"));
const Validar = lazy(() => import("@/pages/Validar"));
const Privacidade = lazy(() => import("@/pages/Privacidade"));
const Termos = lazy(() => import("@/pages/Termos"));

const queryClient = new QueryClient();

/** Duração do boot screen. Curto de propósito: o conteúdo já está no DOM atrás dele. */
const SPLASH_MS = 2200;
const SPLASH_KEY = "mz:splash-seen";

/**
 * O splash só aparece na primeira visita da sessão, e nunca para quem pediu
 * menos movimento. Rotas utilitárias (/validar, /brandbook) entram direto —
 * quem chega nelas veio de um QR code ou de um link direto, não quer cinema.
 */
function shouldShowSplash() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.location.pathname !== "/") return false;
  try {
    if (sessionStorage.getItem(SPLASH_KEY) === "1") return false;
  } catch {
    /* sessionStorage bloqueado (modo privado / iframe) — segue com o splash */
  }
  return true;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/brandbook" component={Brandbook} />
      <Route path="/validar" component={Validar} />
      <Route path="/privacidade" component={Privacidade} />
      <Route path="/termos" component={Termos} />
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * A SPA troca de rota sem recarregar a página, então o GA4 não registra
 * pageview sozinho. Este componente dispara um por navegação.
 */
function PageViewTracker() {
  const [location] = useLocation();

  useEffect(() => {
    // Espera o useSEO da rota atualizar o document.title antes de reportar
    const t = setTimeout(() => trackPageView(location), 0);
    return () => clearTimeout(t);
  }, [location]);

  return null;
}

function App() {
  const [showLoader, setShowLoader] = useState(shouldShowSplash);
  useLenis();

  // Sem VITE_GA4_ID definido isto é no-op: nenhum script, nenhum cookie.
  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (!showLoader) return;

    const timer = setTimeout(() => {
      setShowLoader(false);
      try {
        sessionStorage.setItem(SPLASH_KEY, "1");
      } catch {
        /* ignora */
      }
    }, SPLASH_MS);

    // Trava o scroll enquanto o splash cobre a tela
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [showLoader]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/*
          O conteúdo renderiza desde o primeiro frame, com o splash por cima.
          Antes ele só era montado depois do loader sair — o que empurrava o LCP
          para ~5s e deixava o DOM vazio para os crawlers.
        */}
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <PageViewTracker />
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Router />
          </Suspense>
          <ConsentBanner />
        </WouterRouter>
        <Toaster />
        <LoadingScreen isVisible={showLoader} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
