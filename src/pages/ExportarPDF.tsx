import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePlanejamento } from "@/contexts/PlanejamentoContext";
import { ArrowLeft, FileDown, Share2, Heart, Home, GraduationCap, Wallet, Briefcase, Leaf, Users, Sparkles, Loader2 } from "lucide-react";
import SubscriptionGate from "@/components/SubscriptionGate";
import NavigationMenu from "@/components/NavigationMenu";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const pilaresInfo = [
  { id: 1, nome: "Saúde e Cuidados Pessoais", icon: Heart },
  { id: 2, nome: "Moradia", icon: Home },
  { id: 3, nome: "Educação", icon: GraduationCap },
  { id: 4, nome: "Finanças", icon: Wallet },
  { id: 5, nome: "Trabalho", icon: Briefcase },
  { id: 6, nome: "Natureza", icon: Leaf },
  { id: 7, nome: "Lazer e Social", icon: Users },
  { id: 8, nome: "Espiritual", icon: Sparkles },
];

const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const periodos = ["manha", "tarde", "noite"];
const periodosLabel: Record<string, string> = {
  manha: "Manhã",
  tarde: "Tarde",
  noite: "Noite"
};

const ExportarPDF = () => {
  const navigate = useNavigate();
  const { data } = usePlanejamento();
  const contentRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [gateAction, setGateAction] = useState<"download" | "share">("download");

  const generatePDFBlob = async (): Promise<Blob | null> => {
    const element = contentRef.current;
    if (!element) return null;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    return pdf.output("blob");
  };

  const handleDownloadPDF = async () => {
    setGenerating(true);
    try {
      const blob = await generatePDFBlob();
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "planejamento-basico-pessoal.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setGenerating(false);
      setShowGate(false);
    }
  };

  const handleSharePDF = async () => {
    setGenerating(true);
    try {
      const blob = await generatePDFBlob();
      if (!blob) return;
      const file = new File([blob], "planejamento-basico-pessoal.pdf", { type: "application/pdf" });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Planejamento Básico Pessoal",
          files: [file],
        });
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "planejamento-basico-pessoal.pdf";
        link.click();
        URL.revokeObjectURL(url);
      }
    } finally {
      setGenerating(false);
      setShowGate(false);
    }
  };

  const openGate = (action: "download" | "share") => {
    setGateAction(action);
    setShowGate(true);
  };

  const handleGateProceed = () => {
    if (gateAction === "download") {
      handleDownloadPDF();
    } else {
      handleSharePDF();
    }
  };

  // Check if there's any data filled
  const hasAvaliacoes = Object.keys(data.avaliacoesPilares).length > 0;
  const hasMetas = Object.values(data.metasPorPilar).some(metas => metas.some(m => m.trim()));
  const hasRotina = Object.values(data.tarefasRotina).some(tarefas => tarefas.length > 0);
  const hasHorario = Object.values(data.horarioSemanal).some(tarefas => tarefas.length > 0);
  const hasDespesas = data.despesas.some(d => d.valor > 0 || (d.nome !== "Recebimento" && d.nome !== "Reserva de segurança"));
  const hasDocsPessoais = data.docsPessoais.length > 0;
  const hasDocsResidencia = data.docsResidencia.length > 0;
  const hasDocsImoveis = data.docsImoveis.length > 0;
  const hasCompras = Object.values(data.listasCompras).some(itens => itens.length > 0);
  const hasAnual = Object.values(data.planejamentoAnual).some(itens => itens.length > 0);
  const hasFestas = data.festas.some(f => Object.values(f.categorias).some(cat => cat.length > 0));

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header - hidden in print */}
      <div className="bg-primary text-primary-foreground p-6 print:hidden">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/organizacao-digital")}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl md:text-3xl font-bold">Planejamento Básico Pessoal</h1>
              <p className="text-primary-foreground/80 text-sm md:text-base">Baixe ou compartilhe seu planejamento</p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => openGate("share")}
                disabled={generating}
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
              >
                {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Share2 className="h-4 w-4" />}
                <span className="hidden sm:inline ml-2">Compartilhar</span>
              </Button>
              <Button 
                onClick={() => openGate("download")}
                disabled={generating}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                {generating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FileDown className="h-4 w-4 mr-2" />}
                Baixar PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Content - this div is captured for PDF generation */}
      <div ref={contentRef} className="bg-white">
        {/* PDF Header */}
        <div className="text-center py-8 border-b-2 border-primary">
          <h1 className="text-2xl md:text-3xl font-bold text-primary whitespace-nowrap">Planejamento Básico Pessoal</h1>
          <p className="text-muted-foreground mt-2">Gerado em {new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto p-6 space-y-6">
        
        {/* 1. Avaliação dos Pilares */}
        {hasAvaliacoes && (
          <Card className="print:break-inside-avoid print:shadow-none print:border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Avaliação dos 8 Pilares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {pilaresInfo.map(pilar => {
                  const valor = data.avaliacoesPilares[pilar.id];
                  if (!valor) return null;
                  return (
                    <div key={pilar.id} className="flex items-center justify-between py-1 border-b">
                      <span>{pilar.nome}</span>
                      <span className="font-semibold text-primary">{valor}/5</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 2. Metas */}
        {hasMetas && (
          <Card className="print:break-inside-avoid print:shadow-none print:border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Metas Simples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pilaresInfo.map(pilar => {
                const metas = data.metasPorPilar[pilar.id]?.filter(m => m.trim()) || [];
                if (metas.length === 0) return null;
                return (
                  <div key={pilar.id}>
                    <h4 className="font-semibold text-sm text-primary">{pilar.nome}</h4>
                    <ul className="list-disc list-inside text-sm">
                      {metas.map((meta, i) => (
                        <li key={i}>{meta}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* 3. Rotina Diária */}
        {hasRotina && (
          <Card className="print:break-inside-avoid print:shadow-none print:border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Rotina Diária</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(data.tarefasRotina).map(([catId, tarefas]) => {
                if (tarefas.length === 0) return null;
                const categoria = ["Organização do dia", "Moradia", "Financeiro", "Cuidados Pessoais", "Educação", "Lazer", "Espiritual"][parseInt(catId) - 1];
                return (
                  <div key={catId}>
                    <h4 className="font-semibold text-sm text-primary">{categoria}</h4>
                    <ul className="list-disc list-inside text-sm">
                      {tarefas.map((t) => (
                        <li key={t.id}>{t.texto}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* 4. Horário Semanal */}
        {hasHorario && (
          <Card className="print:break-inside-avoid print:shadow-none print:border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Horário Semanal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-1 bg-muted"></th>
                      {diasSemana.map(dia => (
                        <th key={dia} className="border p-1 bg-muted">{dia}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {periodos.map(periodo => (
                      <tr key={periodo}>
                        <td className="border p-1 font-medium bg-muted">{periodosLabel[periodo]}</td>
                        {diasSemana.map(dia => {
                          const key = `${dia}-${periodo}`;
                          const tarefas = data.horarioSemanal[key] || [];
                          return (
                            <td key={key} className="border p-1 align-top">
                              {tarefas.map((t, i) => (
                                <div key={i} className="text-xs">{t}</div>
                              ))}
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
        )}

        {/* 5. Planilha Financeira */}
        {hasDespesas && (
          <Card className="print:break-inside-avoid print:shadow-none print:border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Despesas Mensais</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-1">Pagamento</th>
                    <th className="text-right py-1">Valor (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.despesas.map(d => (
                    <tr key={d.id} className="border-b">
                      <td className="py-1">{d.nome}</td>
                      <td className="text-right py-1">{d.valor.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {/* 6. Documentos */}
        {(hasDocsPessoais || hasDocsResidencia || hasDocsImoveis) && (
          <Card className="print:break-inside-avoid print:shadow-none print:border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Documentos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hasDocsPessoais && (
                <div>
                  <h4 className="font-semibold text-sm text-primary mb-1">Documentos Pessoais</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      {data.docsPessoais.map(d => (
                        <tr key={d.id} className="border-b">
                          <td className="py-1">{d.nome}</td>
                          <td className="py-1 text-muted-foreground">{d.informacao}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {hasDocsResidencia && (
                <div>
                  <h4 className="font-semibold text-sm text-primary mb-1">Documentos da Residência</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      {data.docsResidencia.map(d => (
                        <tr key={d.id} className="border-b">
                          <td className="py-1">{d.nome}</td>
                          <td className="py-1 text-muted-foreground">{d.informacao}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {hasDocsImoveis && (
                <div>
                  <h4 className="font-semibold text-sm text-primary mb-1">Documentos de Imóveis</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      {data.docsImoveis.map(d => (
                        <tr key={d.id} className="border-b">
                          <td className="py-1">{d.nome}</td>
                          <td className="py-1 text-muted-foreground">{d.informacao}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* 7. Listas de Compras */}
        {hasCompras && (
          <Card className="print:break-inside-avoid print:shadow-none print:border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Listas de Compras Mensais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {Object.entries(data.listasCompras).map(([categoria, itens]) => {
                  if (itens.length === 0) return null;
                  return (
                    <div key={categoria}>
                      <h4 className="font-semibold text-primary">{categoria}</h4>
                      <ul className="list-disc list-inside">
                        {itens.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 8. Planejamento Anual */}
        {hasAnual && (
          <Card className="print:break-inside-avoid print:shadow-none print:border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Planejamento Anual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {Object.entries(data.planejamentoAnual).map(([mes, itens]) => {
                  if (itens.length === 0) return null;
                  return (
                    <div key={mes}>
                      <h4 className="font-semibold text-primary">{mes}</h4>
                      <ul className="list-disc list-inside">
                        {itens.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 9. Festas */}
        {hasFestas && (
          <Card className="print:break-inside-avoid print:shadow-none print:border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Planejamento de Festas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.festas.map((festa, i) => {
                const temItens = Object.values(festa.categorias).some(cat => cat.length > 0);
                if (!temItens) return null;
                return (
                  <div key={i}>
                    <h4 className="font-semibold text-primary">{festa.titulo}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm mt-1">
                      {Object.entries(festa.categorias).map(([cat, itens]) => {
                        if (itens.length === 0) return null;
                        return (
                          <div key={cat}>
                            <span className="font-medium">{cat}:</span>
                            <span className="ml-1">{itens.join(", ")}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!hasAvaliacoes && !hasMetas && !hasRotina && !hasHorario && !hasDespesas && 
         !hasDocsPessoais && !hasDocsResidencia && !hasDocsImoveis && !hasCompras && 
         !hasAnual && !hasFestas && (
          <Card className="print:hidden">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground text-lg">
                Nenhum dado preenchido ainda.
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Preencha as seções do planejamento para visualizar aqui.
              </p>
              <Button className="mt-4" onClick={() => navigate("/comecar")}>
                Começar Planejamento
              </Button>
            </CardContent>
          </Card>
        )}
        </div>
      </div>

      {/* Navigation - hidden in PDF capture */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => navigate("/organizacao-digital")}>
            Voltar
          </Button>
          <Button onClick={() => navigate("/")}>
            Página Inicial
          </Button>
        </div>
      </div>

      {showGate && (
        <SubscriptionGate
          onProceed={handleGateProceed}
          generating={generating}
          onClose={() => setShowGate(false)}
        />
      )}

      <NavigationMenu />
    </div>
  );
};

export default ExportarPDF;
