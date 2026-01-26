import { Button } from "@/components/ui/button";
import { IconBox } from "@/components/ui/icon-box";
import { FeatureBadge } from "@/components/FeatureBadge";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavigationMenu from "@/components/NavigationMenu";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12 pb-24">
      <div className="max-w-2xl w-full flex flex-col items-center text-center space-y-8">
        {/* Icon */}
        <IconBox>
          <CalendarCheck className="w-10 h-10 text-primary" />
        </IconBox>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Planejamento Básico Pessoal
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Clareza • Organização • Equilíbrio
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2 max-w-md">
          <p className="text-foreground/80 text-lg">
            Organize sua vida de forma simples e consciente.
          </p>
          <p className="text-foreground/80 text-lg">
            Pequenos passos feitos com constância geram grandes mudanças.
          </p>
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          onClick={() => navigate("/comecar")}
          className="px-10 py-6 text-lg font-semibold gap-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Começar
          <ArrowRight className="w-5 h-5" />
        </Button>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-6 pt-6">
          <FeatureBadge text="Pensar diferente" />
          <FeatureBadge text="Organizar o básico" />
          <FeatureBadge text="Definir metas reais" />
        </div>

        {/* Social Handle */}
        <p className="text-sm text-muted-foreground pt-4">
          @planejamentopessoal5
        </p>
      </div>
      <NavigationMenu />
    </div>
  );
};

export default Index;
