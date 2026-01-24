import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calendar, Plus, X } from "lucide-react";

const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const periodos = [
  { id: "manha", label: "🌅 Manhã" },
  { id: "tarde", label: "☀️ Tarde" },
  { id: "noite", label: "🌙 Noite" }
];

type TarefasPorCelula = Record<string, string[]>;

const HorarioSemanal = () => {
  const navigate = useNavigate();
  
  const [tarefas, setTarefas] = useState<TarefasPorCelula>({});
  const [novaTarefa, setNovaTarefa] = useState<Record<string, string>>({});

  const getCelulaKey = (dia: string, periodo: string) => `${dia}-${periodo}`;

  const adicionarTarefa = (dia: string, periodo: string) => {
    const key = getCelulaKey(dia, periodo);
    const texto = novaTarefa[key]?.trim();
    if (!texto) return;

    setTarefas(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), texto]
    }));
    setNovaTarefa(prev => ({ ...prev, [key]: "" }));
  };

  const removerTarefa = (dia: string, periodo: string, index: number) => {
    const key = getCelulaKey(dia, periodo);
    setTarefas(prev => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/rotina")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Horário Semanal</h1>
            <p className="text-muted-foreground text-sm">Planeje sua semana por períodos</p>
          </div>
        </div>

        {/* Planner Semanal */}
        <Card className="mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-primary" />
              Planner Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 text-left text-sm font-medium text-muted-foreground border-b w-20">
                      Período
                    </th>
                    {diasSemana.map(dia => (
                      <th key={dia} className="p-2 text-center text-sm font-medium text-foreground border-b min-w-[120px]">
                        {dia}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {periodos.map((periodo, rowIndex) => (
                    <tr key={periodo.id} className={rowIndex % 2 === 0 ? "bg-muted/30" : "bg-background"}>
                      <td className="p-2 font-medium text-sm border-b whitespace-nowrap">
                        {periodo.label}
                      </td>
                      {diasSemana.map(dia => {
                        const key = getCelulaKey(dia, periodo.id);
                        return (
                          <td key={key} className="p-2 border-b align-top">
                            <div className="space-y-1 min-h-[80px]">
                              {/* Lista de tarefas */}
                              {(tarefas[key] || []).map((tarefa, index) => (
                                <div 
                                  key={index} 
                                  className="flex items-center gap-1 bg-primary/10 rounded px-2 py-1 text-xs group"
                                >
                                  <span className="flex-1 truncate">{tarefa}</span>
                                  <button
                                    onClick={() => removerTarefa(dia, periodo.id, index)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive/80"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                              
                              {/* Adicionar nova tarefa */}
                              <div className="flex gap-1">
                                <Input
                                  placeholder="+ Tarefa"
                                  value={novaTarefa[key] || ""}
                                  onChange={(e) => setNovaTarefa(prev => ({ ...prev, [key]: e.target.value }))}
                                  onKeyDown={(e) => e.key === "Enter" && adicionarTarefa(dia, periodo.id)}
                                  className="text-xs h-7 px-2"
                                />
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 shrink-0"
                                  onClick={() => adicionarTarefa(dia, periodo.id)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Navegação */}
        <div className="flex justify-center">
          <Button onClick={() => navigate("/resultado")} size="lg">
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HorarioSemanal;
