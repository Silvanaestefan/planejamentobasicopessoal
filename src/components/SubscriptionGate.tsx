import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Play, Check, Loader2 } from "lucide-react";

interface SubscriptionGateProps {
  onProceed: () => void;
  generating: boolean;
}

const SubscriptionGate = ({ onProceed, generating }: SubscriptionGateProps) => {
  const [showAd, setShowAd] = useState(false);
  const [adCountdown, setAdCountdown] = useState(5);
  const [adFinished, setAdFinished] = useState(false);

  useEffect(() => {
    if (!showAd || adCountdown <= 0) return;
    const timer = setTimeout(() => {
      setAdCountdown((prev) => {
        if (prev <= 1) {
          setAdFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [showAd, adCountdown]);

  const handleWatchAd = () => {
    setShowAd(true);
    setAdCountdown(5);
    setAdFinished(false);
  };

  // Ad countdown screen
  if (showAd && !adFinished) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="py-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Play className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Propaganda</h3>
              <p className="text-muted-foreground">Aguarde para continuar...</p>
            </div>
            <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center mx-auto">
              <span className="text-4xl font-bold text-primary">{adCountdown}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((5 - adCountdown) / 5) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Ad finished — allow download
  if (showAd && adFinished) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="py-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Pronto!</h3>
              <p className="text-muted-foreground">Agora você pode baixar seu PDF.</p>
            </div>
            <Button
              size="lg"
              onClick={onProceed}
              disabled={generating}
              className="w-full py-6 text-lg"
            >
              {generating ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : null}
              Baixar PDF
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Initial gate — choose subscribe or watch ad
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Subscribe option */}
        <Card className="border-primary border-2">
          <CardContent className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Crown className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Assinar o Plano</h3>
              <p className="text-3xl font-bold text-primary mt-2">
                R$ 5,16<span className="text-sm font-normal text-muted-foreground">/mês</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Baixe PDFs ilimitados sem propagandas
              </p>
            </div>
            <ul className="text-sm text-left space-y-2 px-4">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Download de PDF sem espera</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Sem propagandas</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Suporte prioritário</span>
              </li>
            </ul>
            <Button size="lg" className="w-full py-6 text-lg">
              <Crown className="w-5 h-5 mr-2" />
              Assinar por R$ 5,16/mês
            </Button>
          </CardContent>
        </Card>

        {/* Continue without subscribing */}
        <Card>
          <CardContent className="py-6 text-center space-y-3">
            <p className="text-muted-foreground text-sm">
              Ou continue gratuitamente assistindo uma propaganda de 5 segundos
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={handleWatchAd}
              className="w-full"
            >
              <Play className="w-4 h-4 mr-2" />
              Continuar sem assinar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionGate;
