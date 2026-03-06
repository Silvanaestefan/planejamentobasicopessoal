import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Plus, Trash2, Calendar, Home, DollarSign, Heart, BookOpen, Palette, Sparkles, ChevronDown, ChevronRight, TreePine, Briefcase, ShieldCheck } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { usePlanejamento, Tarefa } from "@/contexts/PlanejamentoContext";
import NavigationMenu from "@/components/NavigationMenu";

interface CategoriaRotina {
  id: number;
  nome: string;
  descricao?: string;
  icon: React.ReactNode;
  tarefasPadrao: string[];
}

const categoriasRotina: CategoriaRotina[] = [
  {
    id: 1,
    nome: "Organização do dia",
    descricao: "(Verificar compromissos, tarefas, mensagens e listas de compras)",
    icon: <Calendar className="h-5 w-5" />,
    tarefasPadrao: []
  },
  {
    id: 2,
    nome: "Moradia",
    descricao: "(Arrumar a casa, lavar e passar roupas, fazer compras, cozinhar, regar as plantas)",
    icon: <Home className="h-5 w-5" />,
    tarefasPadrao: []
  },
  {
    id: 3,
    nome: "Financeiro",
    descricao: "(Verificar gastos e saldo do dia)",
    icon: <DollarSign className="h-5 w-5" />,
    tarefasPadrao: []
  },
  {
    id: 4,
    nome: "Saúde e Cuidados Pessoais",
    descricao: "(Exercício físico)",
    icon: <Heart className="h-5 w-5" />,
    tarefasPadrao: []
  },
  {
    id: 5,
    nome: "Educação",
    descricao: "(Organizar escrivaninha, estudar)",
    icon: <BookOpen className="h-5 w-5" />,
    tarefasPadrao: []
  },
  {
    id: 6,
    nome: "Lazer",
    descricao: "(Artesanato, leitura, artes)",
    icon: <Palette className="h-5 w-5" />,
    tarefasPadrao: []
  },
  {
    id: 7,
    nome: "Espiritual",
    descricao: "(Momento de reequilíbrio)",
    icon: <Sparkles className="h-5 w-5" />,
    tarefasPadrao: []
  },
  {
    id: 8,
    nome: "Contato com a Natureza",
    icon: <TreePine className="h-5 w-5" />,
    tarefasPadrao: []
  },
  {
    id: 9,
    nome: "Trabalho",
    icon: <Briefcase className="h-5 w-5" />,
    tarefasPadrao: []
  },
  {
    id: 10,
    nome: "Outros",
    icon: <ShieldCheck className="h-5 w-5" />,
    tarefasPadrao: []
  }
];

const Rotina = () => {
  const navigate = useNavigate();
  const { data, updateData } = usePlanejamento();
  
  // Initialize tasks from context or defaults
  const inicializarTarefas = (): Record<number, Tarefa[]> => {
    if (Object.keys(data.tarefasRotina).length > 0) {
      return data.tarefasRotina;
    }
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
  const [lixeira, setLixeira] = useState<Tarefa[]>(data.lixeiraRotina || []);
  const [novaTarefa, setNovaTarefa] = useState<Record<number, string>>({});
  const [openCategories, setOpenCategories] = useState<number[]>([]);

  const toggleCategory = (categoryId: number) => {
    setOpenCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Save to context whenever tarefasPorCategoria changes
  const saveTarefas = (newTarefas: Record<number, Tarefa[]>) => {
    setTarefasPorCategoria(newTarefas);
    updateData({ tarefasRotina: newTarefas });
  };

  const adicionarTarefa = (categoriaId: number) => {
    const texto = novaTarefa[categoriaId]?.trim();
    if (!texto) return;

    const newTarefas = {
      ...tarefasPorCategoria,
      [categoriaId]: [
        ...tarefasPorCategoria[categoriaId],
        { id: `${categoriaId}-${Date.now()}`, texto, concluida: false }
      ]
    };
    saveTarefas(newTarefas);
    setNovaTarefa(prev => ({ ...prev, [categoriaId]: "" }));
  };

  const toggleTarefa = (categoriaId: number, tarefaId: string) => {
    const tarefa = tarefasPorCategoria[categoriaId].find(t => t.id === tarefaId);
    if (!tarefa) return;

    // Move para a lixeira e persiste
    const novaLixeira = [...lixeira, { ...tarefa, concluida: true }];
    setLixeira(novaLixeira);
    updateData({ lixeiraRotina: novaLixeira });
    
    const newTarefas = {
      ...tarefasPorCategoria,
      [categoriaId]: tarefasPorCategoria[categoriaId].filter(t => t.id !== tarefaId)
    };
    saveTarefas(newTarefas);
  };

  const removerDaLixeira = (tarefaId: string) => {
    const novaLixeira = lixeira.filter(t => t.id !== tarefaId);
    setLixeira(novaLixeira);
    updateData({ lixeiraRotina: novaLixeira });
  };

  const limparLixeira = () => {
    setLixeira([]);
    updateData({ lixeiraRotina: [] });
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-24">
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
            <Collapsible
              key={categoria.id}
              open={openCategories.includes(categoria.id)}
              onOpenChange={() => toggleCategory(categoria.id)}
            >
              <Card className="border-l-4 border-l-primary">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-lg font-semibold flex-wrap">
                        <span className="text-primary">{categoria.icon}</span>
                        {categoria.nome}
                        {categoria.descricao && (
                          <span className="text-sm font-normal text-muted-foreground">{categoria.descricao}</span>
                        )}
                        {tarefasPorCategoria[categoria.id]?.length > 0 && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {tarefasPorCategoria[categoria.id].length}
                          </span>
                        )}
                      </div>
                      {openCategories.includes(categoria.id) ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-2 pt-0">
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
                </CollapsibleContent>
              </Card>
            </Collapsible>
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
          <Button onClick={() => navigate("/horario-semanal")} size="lg">
            Continuar
          </Button>
        </div>
      </div>
      <NavigationMenu />
    </div>
  );
};

export default Rotina;
