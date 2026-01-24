import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Heart, Home, BookOpen, DollarSign, Briefcase, Leaf, Users, Sparkles, X } from "lucide-react";
import { IconBox } from "@/components/ui/icon-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const pilares = [
  { id: 1, nome: "Saúde e Cuidados Pessoais", icon: Heart },
  { id: 2, nome: "Moradia", icon: Home },
  { id: 3, nome: "Educação", icon: BookOpen },
  { id: 4, nome: "Finanças", icon: DollarSign },
  { id: 5, nome: "Trabalho", icon: Briefcase },
  { id: 6, nome: "Natureza", icon: Leaf },
  { id: 7, nome: "Lazer e Social", icon: Users },
  { id: 8, nome: "Espiritual", icon: Sparkles },
];

type MetasPorPilar = Record<number, string[]>;

const Metas = () => {
  const navigate = useNavigate();
  const [metasPorPilar, setMetasPorPilar] = useState<MetasPorPilar>(() => {
    const inicial: MetasPorPilar = {};
    pilares.forEach((p) => {
      inicial[p.id] = [""];
    });
    return inicial;
  });

  const handleMetaChange = (pilarId: number, index: number, value: string) => {
    setMetasPorPilar((prev) => ({
      ...prev,
      [pilarId]: prev[pilarId].map((meta, i) => (i === index ? value : meta)),
    }));
  };

  const adicionarMeta = (pilarId: number) => {
    setMetasPorPilar((prev) => ({
      ...prev,
      [pilarId]: [...prev[pilarId], ""],
    }));
  };

  const removerMeta = (pilarId: number, index: number) => {
    setMetasPorPilar((prev) => ({
      ...prev,
      [pilarId]: prev[pilarId].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 bg-background/80 backdrop-blur-sm border-b border-border">
        <button
          onClick={() => navigate("/pilares")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <h1 className="text-lg font-semibold text-foreground">Definir Metas</h1>
        <div className="w-20" />
      </header>

      {/* Content */}
      <main className="container max-w-2xl mx-auto px-4 py-8">
        {/* Icon and Title */}
        <div className="flex flex-col items-center mb-8">
          <IconBox className="mb-4 w-16 h-16">
            <div className="w-10 h-10 rounded-full border-4 border-primary flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-primary" />
            </div>
          </IconBox>
          <h2 className="text-2xl font-bold text-foreground">
            Metas <span className="text-primary">Simples</span>
          </h2>
          <p className="text-muted-foreground text-center mt-2">
            Poucas metas • Metas realistas • Metas que cabem na sua rotina
          </p>
        </div>

        {/* Pilares com Metas */}
        <div className="space-y-6">
          {pilares.map((pilar) => {
            const Icon = pilar.icon;
            return (
              <div
                key={pilar.id}
                className="bg-card rounded-xl border border-border p-4 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{pilar.nome}</h3>
                </div>

                {/* Lista de Metas */}
                <div className="space-y-2">
                  {metasPorPilar[pilar.id].map((meta, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder={`Meta ${index + 1}...`}
                        value={meta}
                        onChange={(e) =>
                          handleMetaChange(pilar.id, index, e.target.value)
                        }
                        className="flex-1"
                      />
                      {metasPorPilar[pilar.id].length > 1 && (
                        <button
                          onClick={() => removerMeta(pilar.id, index)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Botão Adicionar Meta */}
                <button
                  onClick={() => adicionarMeta(pilar.id)}
                  className="flex items-center gap-2 mt-3 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar meta</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Botão Continuar */}
        <div className="mt-8">
          <Button
            onClick={() => navigate("/resultado")}
            className="w-full py-6 text-lg font-semibold"
          >
            Continuar
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Metas;
