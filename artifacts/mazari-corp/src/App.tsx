import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useState, useEffect } from "react";
import { useLenis } from "@/lib/useLenis";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  useLenis();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleLoaderDone = () => {
    setContentReady(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LoadingScreen isVisible={showLoader} onExitComplete={handleLoaderDone} />
        {contentReady && (
          <>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
