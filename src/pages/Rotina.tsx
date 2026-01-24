import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Plus, Trash2, Calendar, Home, DollarSign, Heart, BookOpen, Palette, Sparkles } from "lucide-react";

interface Tarefa {
  id: string;
  texto: string;
  concluida: boolean;
}

interface CategoriaRotina {
  id: number;
  nome: string;
  icon: React.ReactNode;
  tarefasPadrao: string[];
}

const categoriasRotina: CategoriaRotina[] = [
  {
    id: 1,
    nome: "Organização do dia",
    icon: <Calendar className="h-5 w-5" />,
    tarefasPadrao: ["Verificar agenda", "Mensagens", "Listas de compras", "Tarefas"]
  },
  {
    id: 2,
    nome: "Moradia",
    icon: <Home className="h-5 w-5" />,
    tarefasPadrao: ["Arrumar a casa", "Fazer compras", "Cozinhar", "Lavar roupas", "Passar"]
  },
  {
    id: 3,
    nome: "Financeiro",
    icon: <DollarSign className="h-5 w-5" />,
    tarefasPadrao: ["Verificar gastos", "Verificar saldo"]
  },
  {
    id: 4,
    nome: "Cuidados Pessoais",
    icon: <Heart className="h-5 w-5" />,
    tarefasPadrao: ["Exercício físico"]
  },
  {
    id: 5,
    nome: "Educação",
    icon: <BookOpen className="h-5 w-5" />,
    tarefasPadrao: ["Estudar"]
  },
  {
    id: 6,
    nome: "Lazer",
    icon: <Palette className="h-5 w-5" />,
    tarefasPadrao: ["Artesanato", "Leitura", "Cuidar de plantas"]
  },
  {
    id: 7,
    nome: "Espiritual",
    icon: <Sparkles className="h-5 w-5" />,
    tarefasPadrao: ["Momento de reequilíbrio"]
  }
];

const Rotina = () => {
  const navigate = useNavigate();
  
  const inicializarTarefas = () => {
    const inicial: Record<number, Tarefa[]> = {};
    categoriasRotina.forEach(cat => {
      inicial[cat.id] = cat.tarefasPadrao.map((texto, index) => ({
        id: `${cat.id}-${index}`,
        texto,
        concluida: false
      }));
    });
    return inicial;
  };

  const [tarefasPorCategoria, setTarefasPorCategoria] = useState<Record<number, Tarefa[]>>(inicializarTarefas);
  const [lixeira, setLixeira] = useState<Tarefa[]>([]);
  const [novaTarefa, setNovaTarefa] = useState<Record<number, string>>({});

  const adicionarTarefa = (categoriaId: number) => {
    const texto = novaTarefa[categoriaId]?.trim();
    if (!texto) return;

    setTarefasPorCategoria(prev => ({
      ...prev,
      [categoriaId]: [
        ...prev[categoriaId],
        { id: `${categoriaId}-${Date.now()}`, texto, concluida: false }
      ]
    }));
    setNovaTarefa(prev => ({ ...prev, [categoriaId]: "" }));
  };

  const toggleTarefa = (categoriaId: number, tarefaId: string) => {
    const tarefa = tarefasPorCategoria[categoriaId].find(t => t.id === tarefaId);
    if (!tarefa) return;

    if (!tarefa.concluida) {
      // Move para lixeira
      setLixeira(prev => [...prev, { ...tarefa, concluida: true }]);
      setTarefasPorCategoria(prev => ({
        ...prev,
        [categoriaId]: prev[categoriaId].filter(t => t.id !== tarefaId)
      }));
    }
  };

  const removerDaLixeira = (tarefaId: string) => {
    setLixeira(prev => prev.filter(t => t.id !== tarefaId));
  };

  const limparLixeira = () => {
    setLixeira([]);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/metas")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Rotina Diária</h1>
            <p className="text-muted-foreground text-sm">Organize suas tarefas do dia</p>
          </div>
        </div>

        {/* Categorias */}
        <div className="space-y-4 mb-8">
          {categoriasRotina.map((categoria) => (
            <Card key={categoria.id} className="border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-primary">{categoria.icon}</span>
                  {categoria.nome}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* Lista de tarefas */}
                {tarefasPorCategoria[categoria.id]?.map((tarefa) => (
                  <div key={tarefa.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id={tarefa.id}
                      checked={tarefa.concluida}
                      onCheckedChange={() => toggleTarefa(categoria.id, tarefa.id)}
                    />
                    <label
                      htmlFor={tarefa.id}
                      className="flex-1 text-sm cursor-pointer"
                    >
                      {tarefa.texto}
                    </label>
                  </div>
                ))}

                {/* Adicionar nova tarefa */}
                <div className="flex gap-2 mt-3">
                  <Input
                    placeholder="Adicionar nova rotina..."
                    value={novaTarefa[categoria.id] || ""}
                    onChange={(e) => setNovaTarefa(prev => ({ ...prev, [categoria.id]: e.target.value }))}
                    onKeyDown={(e) => e.key === "Enter" && adicionarTarefa(categoria.id)}
                    className="flex-1"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => adicionarTarefa(categoria.id)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lixeira */}
        {lixeira.length > 0 && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                  <Trash2 className="h-5 w-5" />
                  Tarefas Concluídas ({lixeira.length})
                </CardTitle>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={limparLixeira}
                >
                  Limpar tudo
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {lixeira.map((tarefa) => (
                <div key={tarefa.id} className="flex items-center justify-between p-2 rounded-md bg-background/50">
                  <span className="text-sm text-muted-foreground line-through">
                    {tarefa.texto}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => removerDaLixeira(tarefa.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Navegação */}
        <div className="flex justify-center mt-8">
          <Button onClick={() => navigate("/resultado")} size="lg">
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Rotina;
