import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X, ChevronDown, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type MesesType = {
  [key: string]: string[];
};

const Anual = () => {
  const navigate = useNavigate();
  
  const [meses, setMeses] = useState<MesesType>({
    "Janeiro": ["DPVAT"],
    "Fevereiro": ["Carnaval", "IPTU", "Taxa de Bombeiro"],
    "Março": ["Imposto de Renda"],
    "Abril": [],
    "Maio": [],
    "Junho": [],
    "Julho": [],
    "Agosto": [],
    "Setembro": [],
    "Outubro": [],
    "Novembro": [],
    "Dezembro": [],
  });

  const [openMeses, setOpenMeses] = useState<string[]>(["Janeiro", "Fevereiro", "Março"]);
  const [novosItens, setNovosItens] = useState<{ [key: string]: string }>({});

  const toggleMes = (mes: string) => {
    setOpenMeses(prev => 
      prev.includes(mes) 
        ? prev.filter(m => m !== mes)
        : [...prev, mes]
    );
  };

  const adicionarItem = (mes: string) => {
    const novoItem = novosItens[mes]?.trim();
    if (novoItem) {
      setMeses(prev => ({
        ...prev,
        [mes]: [...prev[mes], novoItem]
      }));
      setNovosItens(prev => ({ ...prev, [mes]: "" }));
    }
  };

  const removerItem = (mes: string, index: number) => {
    setMeses(prev => ({
      ...prev,
      [mes]: prev[mes].filter((_, i) => i !== index)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent, mes: string) => {
    if (e.key === "Enter") {
      adicionarItem(mes);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/mensal")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Página 9</p>
            <h1 className="text-3xl font-bold text-foreground">Planejamento Anual</h1>
          </div>
        </div>

        {/* Lista de Meses */}
        <div className="space-y-3">
          {Object.keys(meses).map((mes) => (
            <Collapsible
              key={mes}
              open={openMeses.includes(mes)}
              onOpenChange={() => toggleMes(mes)}
            >
              <div className="border rounded-lg bg-card">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    {openMeses.includes(mes) ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span className="font-semibold text-lg">{mes}</span>
                    {meses[mes].length > 0 && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {meses[mes].length} {meses[mes].length === 1 ? "item" : "itens"}
                      </span>
                    )}
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="px-4 pb-4 pt-2 border-t">
                    {/* Lista de itens do mês */}
                    {meses[mes].length > 0 && (
                      <ul className="space-y-1 mb-3">
                        {meses[mes].map((item, index) => (
                          <li 
                            key={index}
                            className="flex items-center justify-between text-sm bg-muted/50 rounded px-3 py-1.5"
                          >
                            <span>{item}</span>
                            <button
                              onClick={() => removerItem(mes, index)}
                              className="text-destructive hover:text-destructive/80 ml-2"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {/* Input para adicionar */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Adicionar item..."
                        value={novosItens[mes] || ""}
                        onChange={(e) => setNovosItens(prev => ({ ...prev, [mes]: e.target.value }))}
                        onKeyPress={(e) => handleKeyPress(e, mes)}
                        className="flex-1"
                      />
                      <Button
                        size="icon"
                        onClick={() => adicionarItem(mes)}
                        disabled={!novosItens[mes]?.trim()}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Anual;
