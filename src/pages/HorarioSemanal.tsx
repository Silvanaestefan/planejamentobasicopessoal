import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calendar } from "lucide-react";

interface HorarioDia {
  manha: string;
  tarde: string;
  noite: string;
}

const diasSemana = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
];

const HorarioSemanal = () => {
  const navigate = useNavigate();
  
  const inicializarHorarios = (): Record<string, HorarioDia> => {
    const inicial: Record<string, HorarioDia> = {};
    diasSemana.forEach(dia => {
      inicial[dia] = { manha: "", tarde: "", noite: "" };
    });
    return inicial;
  };

  const [horarios, setHorarios] = useState<Record<string, HorarioDia>>(inicializarHorarios);

  const atualizarHorario = (dia: string, periodo: keyof HorarioDia, valor: string) => {
    setHorarios(prev => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        [periodo]: valor
      }
    }));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-5xl mx-auto">
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
                    <th className="p-2 text-left text-sm font-medium text-muted-foreground border-b">
                      Dia
                    </th>
                    <th className="p-2 text-center text-sm font-medium text-muted-foreground border-b min-w-[150px]">
                      🌅 Manhã
                    </th>
                    <th className="p-2 text-center text-sm font-medium text-muted-foreground border-b min-w-[150px]">
                      ☀️ Tarde
                    </th>
                    <th className="p-2 text-center text-sm font-medium text-muted-foreground border-b min-w-[150px]">
                      🌙 Noite
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {diasSemana.map((dia, index) => (
                    <tr 
                      key={dia} 
                      className={index % 2 === 0 ? "bg-muted/30" : "bg-background"}
                    >
                      <td className="p-2 font-medium text-sm border-b">
                        {dia}
                      </td>
                      <td className="p-2 border-b">
                        <Input
                          placeholder="Tarefas da manhã..."
                          value={horarios[dia]?.manha || ""}
                          onChange={(e) => atualizarHorario(dia, "manha", e.target.value)}
                          className="text-sm"
                        />
                      </td>
                      <td className="p-2 border-b">
                        <Input
                          placeholder="Tarefas da tarde..."
                          value={horarios[dia]?.tarde || ""}
                          onChange={(e) => atualizarHorario(dia, "tarde", e.target.value)}
                          className="text-sm"
                        />
                      </td>
                      <td className="p-2 border-b">
                        <Input
                          placeholder="Tarefas da noite..."
                          value={horarios[dia]?.noite || ""}
                          onChange={(e) => atualizarHorario(dia, "noite", e.target.value)}
                          className="text-sm"
                        />
                      </td>
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
