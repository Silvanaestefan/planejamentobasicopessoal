import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X, Pencil, Check } from "lucide-react";

type FestaType = {
  titulo: string;
  categorias: {
    [key: string]: string[];
  };
};

const categoriasIniciais = ["Salgados", "Doces", "Bebidas", "Decoração", "Convidados"];

const Festas = () => {
  const navigate = useNavigate();
  
  const [festas, setFestas] = useState<FestaType[]>([
    {
      titulo: "Aniversário",
      categorias: {
        "Salgados": [],
        "Doces": [],
        "Bebidas": [],
        "Decoração": [],
        "Convidados": [],
      }
    }
  ]);

  const [novosItens, setNovosItens] = useState<{ [key: string]: string }>({});
  const [editandoTitulo, setEditandoTitulo] = useState<number | null>(null);
  const [tituloTemp, setTituloTemp] = useState("");
  const [novaFestaTitulo, setNovaFestaTitulo] = useState("");

  const adicionarItem = (festaIndex: number, categoria: string) => {
    const key = `${festaIndex}-${categoria}`;
    const novoItem = novosItens[key]?.trim();
    if (novoItem) {
      setFestas(prev => {
        const novasFestas = [...prev];
        novasFestas[festaIndex].categorias[categoria] = [
          ...novasFestas[festaIndex].categorias[categoria],
          novoItem
        ];
        return novasFestas;
      });
      setNovosItens(prev => ({ ...prev, [key]: "" }));
    }
  };

  const removerItem = (festaIndex: number, categoria: string, itemIndex: number) => {
    setFestas(prev => {
      const novasFestas = [...prev];
      novasFestas[festaIndex].categorias[categoria] = 
        novasFestas[festaIndex].categorias[categoria].filter((_, i) => i !== itemIndex);
      return novasFestas;
    });
  };

  const iniciarEdicaoTitulo = (index: number, tituloAtual: string) => {
    setEditandoTitulo(index);
    setTituloTemp(tituloAtual);
  };

  const salvarTitulo = (index: number) => {
    if (tituloTemp.trim()) {
      setFestas(prev => {
        const novasFestas = [...prev];
        novasFestas[index].titulo = tituloTemp.trim();
        return novasFestas;
      });
    }
    setEditandoTitulo(null);
    setTituloTemp("");
  };

  const adicionarNovaFesta = () => {
    const titulo = novaFestaTitulo.trim() || `Festa ${festas.length + 1}`;
    setFestas(prev => [
      ...prev,
      {
        titulo,
        categorias: {
          "Salgados": [],
          "Doces": [],
          "Bebidas": [],
          "Decoração": [],
          "Convidados": [],
        }
      }
    ]);
    setNovaFestaTitulo("");
  };

  const removerFesta = (index: number) => {
    setFestas(prev => prev.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent, festaIndex: number, categoria: string) => {
    if (e.key === "Enter") {
      adicionarItem(festaIndex, categoria);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 mb-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/anual")}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <p className="text-sm text-primary-foreground/80">Página 10</p>
              <h1 className="text-3xl font-bold">Planejamento de Festas</h1>
              <p className="text-primary-foreground/80 text-sm mt-1">Organize celebrações</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-6">
        {/* Lista de Festas */}
        <div className="space-y-6">
          {festas.map((festa, festaIndex) => (
            <Card key={festaIndex} className="border shadow-lg">
              <CardHeader className="bg-accent/50 rounded-t-lg">
                <div className="flex items-center justify-between">
                  {editandoTitulo === festaIndex ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        value={tituloTemp}
                        onChange={(e) => setTituloTemp(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") salvarTitulo(festaIndex);
                        }}
                        className="text-xl font-bold h-10"
                        autoFocus
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => salvarTitulo(festaIndex)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold">{festa.titulo}</h2>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => iniciarEdicaoTitulo(festaIndex, festa.titulo)}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {festas.length > 1 && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removerFesta(festaIndex)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categoriasIniciais.map((categoria) => (
                    <div key={categoria} className="border rounded-lg p-3">
                      <h3 className="font-semibold text-sm mb-2 text-primary">
                        {categoria}
                      </h3>
                      
                      {/* Lista de itens */}
                      {festa.categorias[categoria]?.length > 0 && (
                        <ul className="space-y-1 mb-2">
                          {festa.categorias[categoria].map((item, itemIndex) => (
                            <li 
                              key={itemIndex}
                              className="flex items-center justify-between text-sm bg-muted/50 rounded px-2 py-1"
                            >
                              <span>{item}</span>
                              <button
                                onClick={() => removerItem(festaIndex, categoria, itemIndex)}
                                className="text-destructive hover:text-destructive/80 ml-2"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {/* Input para adicionar */}
                      <div className="flex gap-1">
                        <Input
                          placeholder="Adicionar..."
                          value={novosItens[`${festaIndex}-${categoria}`] || ""}
                          onChange={(e) => setNovosItens(prev => ({ 
                            ...prev, 
                            [`${festaIndex}-${categoria}`]: e.target.value 
                          }))}
                          onKeyPress={(e) => handleKeyPress(e, festaIndex, categoria)}
                          className="h-8 text-sm"
                        />
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 shrink-0"
                          onClick={() => adicionarItem(festaIndex, categoria)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Adicionar Nova Festa */}
        <Card className="mt-6 border-dashed border-2">
          <CardContent className="p-4">
            <div className="flex gap-2 items-center">
              <Input
                placeholder="Nome da nova festa (ex: Carnaval, Natal...)"
                value={novaFestaTitulo}
                onChange={(e) => setNovaFestaTitulo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") adicionarNovaFesta();
                }}
                className="flex-1"
              />
              <Button onClick={adicionarNovaFesta}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Festa
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navegação */}
        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={() => navigate("/anual")}
          >
            Voltar
          </Button>
          <Button onClick={() => navigate("/documentos")}>
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Festas;
