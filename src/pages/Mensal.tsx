import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X } from "lucide-react";

type ListaCompras = {
  [categoria: string]: string[];
};

const categoriasCompras = [
  "Medicamentos",
  "Perfumaria",
  "Supermercado",
  "Legumes e verduras",
  "Frutas",
  "Padaria",
  "Guloseimas",
  "Chás e condimentos",
  "Outros"
];

const tarefasMensais = [
  "Organizar armários.",
  "Fazer listas de compras.",
  "Agendar consultas.",
  "Receber o salário e pagar os boletos.",
  "Fazer as compras mensais."
];

const Mensal = () => {
  const navigate = useNavigate();
  const [listas, setListas] = useState<ListaCompras>(() => {
    const initial: ListaCompras = {};
    categoriasCompras.forEach(cat => {
      initial[cat] = [];
    });
    return initial;
  });
  const [novoItem, setNovoItem] = useState<Record<string, string>>({});

  const adicionarItem = (categoria: string) => {
    const item = novoItem[categoria]?.trim();
    if (!item) return;
    
    setListas(prev => ({
      ...prev,
      [categoria]: [...prev[categoria], item]
    }));
    setNovoItem(prev => ({ ...prev, [categoria]: "" }));
  };

  const removerItem = (categoria: string, index: number) => {
    setListas(prev => ({
      ...prev,
      [categoria]: prev[categoria].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/planilha-financeira")}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Mensal</h1>
        </div>
        <p className="text-primary-foreground/80">
          Organize suas tarefas e listas de compras mensais.
        </p>
      </div>

      <div className="p-4 space-y-6">
        {/* Tarefas Mensais */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-accent/50 rounded-t-lg">
            <CardTitle className="text-lg">Tarefas Mensais</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ol className="list-decimal list-inside space-y-2">
              {tarefasMensais.map((tarefa, index) => (
                <li key={index} className="text-foreground">
                  {tarefa}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Listas de Compras */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-accent/50 rounded-t-lg">
            <CardTitle className="text-lg">Listas de Compras</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {categoriasCompras.map((categoria) => (
                <div key={categoria} className="border-b pb-4 last:border-b-0">
                  <h3 className="font-semibold text-sm mb-2 text-primary">
                    {categoria}
                  </h3>
                  
                  {/* Lista de itens */}
                  <ul className="space-y-1 mb-2">
                    {listas[categoria].map((item, index) => (
                      <li 
                        key={index} 
                        className="flex items-center justify-between text-sm bg-muted/50 rounded px-3 py-1.5"
                      >
                        <span>{item}</span>
                        <button
                          onClick={() => removerItem(categoria, index)}
                          className="text-destructive hover:text-destructive/80 ml-2"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Input para adicionar */}
                  <div className="flex gap-2 max-w-md">
                    <Input
                      value={novoItem[categoria] || ""}
                      onChange={(e) => setNovoItem(prev => ({ 
                        ...prev, 
                        [categoria]: e.target.value 
                      }))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          adicionarItem(categoria);
                        }
                      }}
                      placeholder="Adicionar item..."
                      className="h-8 text-sm"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 shrink-0"
                      onClick={() => adicionarItem(categoria)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navegação */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => navigate("/planilha-financeira")}
          >
            Voltar
          </Button>
          <Button onClick={() => navigate("/")}>
            Finalizar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Mensal;
