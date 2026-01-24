import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { ArrowLeft, ArrowRight, Heart, Home, GraduationCap, Wallet, Briefcase, Leaf, Users, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const pilares = [
  { id: 1, nome: "Saúde e Cuidados Pessoais", icon: Heart },
  { id: 2, nome: "Moradia", icon: Home },
  { id: 3, nome: "Educação", icon: GraduationCap },
  { id: 4, nome: "Finanças", icon: Wallet },
  { id: 5, nome: "Trabalho", icon: Briefcase },
  { id: 6, nome: "Natureza", icon: Leaf },
  { id: 7, nome: "Lazer e Social", icon: Users },
  { id: 8, nome: "Espiritual", icon: Sparkles },
];

const Pilares = () => {
  const navigate = useNavigate();
  const [avaliacoes, setAvaliacoes] = useState<Record<number, number>>({});

  const handleRating = (pilarId: number, value: number) => {
    setAvaliacoes((prev) => ({ ...prev, [pilarId]: value }));
  };

  const totalAvaliacoes = Object.values(avaliacoes);
  const media =
    totalAvaliacoes.length > 0
      ? (totalAvaliacoes.reduce((a, b) => a + b, 0) / totalAvaliacoes.length).toFixed(1)
      : "0";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-center text-xl font-semibold">Planejamento Básico Pessoal</h1>
      </header>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => navigate("/comecar")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Média atual</p>
          <p className="text-2xl font-bold text-primary">{media}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Avaliação dos <span className="text-primary">8 Pilares</span>
            </h2>
            <p className="text-muted-foreground">
              Avalie cada área da sua vida com sinceridade.
              <br />
              Não existe certo ou errado — existe clareza.
            </p>
          </div>

          {/* Pilares List */}
          <div className="space-y-4">
            {pilares.map((pilar) => {
              const Icon = pilar.icon;
              return (
                <div
                  key={pilar.id}
                  className="bg-card rounded-xl shadow-sm p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{pilar.nome}</span>
                  </div>
                  <StarRating
                    value={avaliacoes[pilar.id] || 0}
                    onChange={(value) => handleRating(pilar.id, value)}
                  />
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              onClick={() => navigate("/resultado")}
              className="px-10 py-6 text-lg font-semibold gap-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pilares;
