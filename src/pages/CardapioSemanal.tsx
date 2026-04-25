import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, UtensilsCrossed } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import NavigationMenu from "@/components/NavigationMenu";

const diasSemana = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

const refeicoes = [
  "Dejejum",
  "Colação",
  "Almoço",
  "Lanche",
  "Jantar",
  "Ceia",
];

type CardapioData = Record<string, Record<string, string>>;

const storageKeyFor = (userId: string | null | undefined) =>
  userId ? `cardapio-semanal:${userId}` : `cardapio-semanal:guest`;

const buildEmpty = (): CardapioData => {
  const obj: CardapioData = {};
  diasSemana.forEach((dia) => {
    obj[dia] = {};
    refeicoes.forEach((r) => (obj[dia][r] = ""));
  });
  return obj;
};

const CardapioSemanal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cardapio, setCardapio] = useState<CardapioData>(buildEmpty());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKeyFor(user?.id));
      if (saved) {
        const parsed = JSON.parse(saved);
        const merged = buildEmpty();
        diasSemana.forEach((dia) => {
          refeicoes.forEach((r) => {
            merged[dia][r] = parsed?.[dia]?.[r] ?? "";
          });
        });
        setCardapio(merged);
      } else {
        setCardapio(buildEmpty());
      }
    } catch (e) {
      console.error("Erro ao carregar cardápio:", e);
    }
    setHydrated(true);
  }, [user?.id]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKeyFor(user?.id), JSON.stringify(cardapio));
    } catch (e) {
      console.error("Erro ao salvar cardápio:", e);
    }
  }, [cardapio, hydrated, user?.id]);

  const atualizar = (dia: string, refeicao: string, valor: string) => {
    setCardapio((prev) => ({
      ...prev,
      [dia]: { ...prev[dia], [refeicao]: valor },
    }));
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate("/mensal")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Cardápio Semanal</h1>
            <p className="text-muted-foreground text-sm">
              Planeje suas refeições de domingo a sábado
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {diasSemana.map((dia) => (
            <Card key={dia}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <UtensilsCrossed className="h-5 w-5 text-primary" />
                  {dia}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {refeicoes.map((refeicao) => (
                  <div key={refeicao}>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      {refeicao}
                    </label>
                    <Textarea
                      value={cardapio[dia]?.[refeicao] || ""}
                      onChange={(e) => atualizar(dia, refeicao, e.target.value)}
                      placeholder={`O que vai ter no ${refeicao.toLowerCase()}?`}
                      className="min-h-[60px]"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button onClick={() => navigate("/anual")} size="lg">
            Continuar
          </Button>
        </div>
      </div>
      <NavigationMenu />
    </div>
  );
};

export default CardapioSemanal;
