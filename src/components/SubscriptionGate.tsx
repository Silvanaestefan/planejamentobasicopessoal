import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Check, Loader2, X } from "lucide-react";

interface SubscriptionGateProps {
  onProceed: () => void;
  generating: boolean;
  onClose?: () => void;
}

const SubscriptionGate = ({ onProceed, generating, onClose }: SubscriptionGateProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-primary border-2 relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
          <CardContent className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Crown className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Assinar o Plano</h3>
              <p className="text-3xl font-bold text-primary mt-2">
                R$ 9,90<span className="text-sm font-normal text-muted-foreground">/mês</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Acesso completo ao app e download de PDFs ilimitados
              </p>
            </div>
            <ul className="text-sm text-left space-y-2 px-4">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Download de PDF ilimitado</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Acesso a todas as funcionalidades</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Suporte prioritário</span>
              </li>
            </ul>
            <Button
              size="lg"
              onClick={onProceed}
              disabled={generating}
              className="w-full py-6 text-lg"
            >
              {generating ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Crown className="w-5 h-5 mr-2" />
              )}
              Assinar por R$ 9,90/mês
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionGate;
