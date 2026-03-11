import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (isStandalone) return;

    const ua = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) {
      setIsIOS(true);
      setShowBanner(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  if (!showBanner || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-primary text-primary-foreground shadow-lg animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto flex items-center justify-between gap-4 max-w-4xl">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Download className="w-6 h-6 flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold text-sm md:text-base">Instale o app no seu celular!</p>
            <p className="text-xs md:text-sm opacity-90 truncate">
              {isIOS
                ? "Toque em Compartilhar → Adicionar à Tela Inicial"
                : "Acesse rápido, sem precisar abrir o navegador."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {!isIOS && (
            <Button
              size="sm"
              variant="secondary"
              onClick={handleInstall}
              className="font-semibold"
            >
              Instalar
            </Button>
          )}
          <button onClick={() => setDismissed(true)} className="p-1 opacity-80 hover:opacity-100">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
