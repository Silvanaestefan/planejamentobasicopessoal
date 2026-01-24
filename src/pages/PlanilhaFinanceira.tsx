import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, DollarSign, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ItemFinanceiro {
  id: string;
  nome: string;
  valor: number;
}

interface Documento {
  id: string;
  nome: string;
  informacao: string;
}

const PlanilhaFinanceira = () => {
  // Estado para despesas mensais
  const [despesas, setDespesas] = useState<ItemFinanceiro[]>([
    { id: "1", nome: "Recebimento", valor: 0 },
    { id: "2", nome: "Reserva de segurança", valor: 0 },
  ]);
  const [novaDespesa, setNovaDespesa] = useState({ nome: "", valor: "" });

  // Estado para documentos pessoais
  const [docsPessoais, setDocsPessoais] = useState<Documento[]>([]);
  const [novoDocPessoal, setNovoDocPessoal] = useState({ nome: "", informacao: "" });

  // Estado para documentos da residência
  const [docsResidencia, setDocsResidencia] = useState<Documento[]>([]);
  const [novoDocResidencia, setNovoDocResidencia] = useState({ nome: "", informacao: "" });

  // Estado para documentos de imóveis
  const [docsImoveis, setDocsImoveis] = useState<Documento[]>([]);
  const [novoDocImovel, setNovoDocImovel] = useState({ nome: "", informacao: "" });

  // Cálculos financeiros
  const receitas = despesas.find(d => d.nome === "Recebimento")?.valor || 0;
  const gastos = despesas.filter(d => d.nome !== "Recebimento").reduce((acc, d) => acc + d.valor, 0);
  const saldo = receitas - gastos;

  // Funções para despesas
  const adicionarDespesa = () => {
    if (novaDespesa.nome.trim()) {
      setDespesas([...despesas, {
        id: Date.now().toString(),
        nome: novaDespesa.nome,
        valor: parseFloat(novaDespesa.valor) || 0
      }]);
      setNovaDespesa({ nome: "", valor: "" });
    }
  };

  const atualizarValorDespesa = (id: string, valor: number) => {
    setDespesas(despesas.map(d => d.id === id ? { ...d, valor } : d));
  };

  const removerDespesa = (id: string) => {
    setDespesas(despesas.filter(d => d.id !== id));
  };

  // Funções genéricas para documentos
  const adicionarDocumento = (
    docs: Documento[],
    setDocs: React.Dispatch<React.SetStateAction<Documento[]>>,
    novoDoc: { nome: string; informacao: string },
    setNovoDoc: React.Dispatch<React.SetStateAction<{ nome: string; informacao: string }>>
  ) => {
    if (novoDoc.nome.trim()) {
      setDocs([...docs, {
        id: Date.now().toString(),
        nome: novoDoc.nome,
        informacao: novoDoc.informacao
      }]);
      setNovoDoc({ nome: "", informacao: "" });
    }
  };

  const removerDocumento = (
    docs: Documento[],
    setDocs: React.Dispatch<React.SetStateAction<Documento[]>>,
    id: string
  ) => {
    setDocs(docs.filter(d => d.id !== id));
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="p-4">
        <Link to="/horario-semanal" className="inline-flex items-center text-primary-foreground hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Link>
      </div>

      {/* Título */}
      <div className="text-center pb-8 text-primary-foreground">
        <DollarSign className="w-12 h-12 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Planilha Financeira</h1>
        <p className="text-primary-foreground/80">
          Registre todas as despesas da casa e documentos pessoais.
        </p>
      </div>

      {/* Resumo Financeiro */}
      <div className="bg-white rounded-t-3xl min-h-screen">
        <div className="max-w-4xl mx-auto p-6 space-y-8">
          
          {/* Cards de Resumo */}
          <div className="grid grid-cols-3 gap-4 py-4 border-b">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Receitas</p>
              <p className="text-xl font-bold text-green-600">
                R$ {receitas.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Gastos</p>
              <p className="text-xl font-bold text-red-600">
                R$ {gastos.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Saldo</p>
              <p className={`text-xl font-bold ${saldo >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                R$ {saldo.toFixed(2)}
              </p>
            </div>
          </div>

          {/* 1. Despesas Mensais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Despesas Mensais</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50%]">Pagamentos</TableHead>
                    <TableHead className="text-right">Valor (R$)</TableHead>
                    <TableHead className="text-right w-[80px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {despesas.map((despesa) => (
                    <TableRow key={despesa.id}>
                      <TableCell>{despesa.nome}</TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          value={despesa.valor || ""}
                          onChange={(e) => atualizarValorDespesa(despesa.id, parseFloat(e.target.value) || 0)}
                          className="w-24 ml-auto text-right"
                          placeholder="0"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removerDespesa(despesa.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <Input
                        value={novaDespesa.nome}
                        onChange={(e) => setNovaDespesa({ ...novaDespesa, nome: e.target.value })}
                        placeholder="Novo item..."
                        className="border-dashed"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Input
                        type="number"
                        value={novaDespesa.valor}
                        onChange={(e) => setNovaDespesa({ ...novaDespesa, valor: e.target.value })}
                        placeholder="0.00"
                        className="w-24 ml-auto text-right border-dashed"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" onClick={adicionarDespesa}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 2. Documentos Pessoais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documentos Pessoais</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Documento</TableHead>
                    <TableHead>Informação</TableHead>
                    <TableHead className="text-right w-[80px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {docsPessoais.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.nome}</TableCell>
                      <TableCell>{doc.informacao}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removerDocumento(docsPessoais, setDocsPessoais, doc.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <Input
                        value={novoDocPessoal.nome}
                        onChange={(e) => setNovoDocPessoal({ ...novoDocPessoal, nome: e.target.value })}
                        placeholder="Novo documento..."
                        className="border-dashed"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={novoDocPessoal.informacao}
                        onChange={(e) => setNovoDocPessoal({ ...novoDocPessoal, informacao: e.target.value })}
                        placeholder="Informação..."
                        className="border-dashed"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="icon" 
                        className="bg-violet-400 hover:bg-violet-500"
                        onClick={() => adicionarDocumento(docsPessoais, setDocsPessoais, novoDocPessoal, setNovoDocPessoal)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 3. Documentos da Residência */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documentos da Residência</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Documento</TableHead>
                    <TableHead>Informação</TableHead>
                    <TableHead className="text-right w-[80px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {docsResidencia.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.nome}</TableCell>
                      <TableCell>{doc.informacao}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removerDocumento(docsResidencia, setDocsResidencia, doc.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <Input
                        value={novoDocResidencia.nome}
                        onChange={(e) => setNovoDocResidencia({ ...novoDocResidencia, nome: e.target.value })}
                        placeholder="Novo documento..."
                        className="border-dashed"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={novoDocResidencia.informacao}
                        onChange={(e) => setNovoDocResidencia({ ...novoDocResidencia, informacao: e.target.value })}
                        placeholder="Informação..."
                        className="border-dashed"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="icon" 
                        className="bg-violet-400 hover:bg-violet-500"
                        onClick={() => adicionarDocumento(docsResidencia, setDocsResidencia, novoDocResidencia, setNovoDocResidencia)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 4. Documentos de Imóveis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documentos de Imóveis</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Documento</TableHead>
                    <TableHead>Informação</TableHead>
                    <TableHead className="text-right w-[80px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {docsImoveis.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.nome}</TableCell>
                      <TableCell>{doc.informacao}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removerDocumento(docsImoveis, setDocsImoveis, doc.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <Input
                        value={novoDocImovel.nome}
                        onChange={(e) => setNovoDocImovel({ ...novoDocImovel, nome: e.target.value })}
                        placeholder="Novo documento..."
                        className="border-dashed"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={novoDocImovel.informacao}
                        onChange={(e) => setNovoDocImovel({ ...novoDocImovel, informacao: e.target.value })}
                        placeholder="Informação..."
                        className="border-dashed"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="icon" 
                        className="bg-violet-400 hover:bg-violet-500"
                        onClick={() => adicionarDocumento(docsImoveis, setDocsImoveis, novoDocImovel, setNovoDocImovel)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Botão Continuar */}
          <div className="flex justify-center pt-6 pb-12">
            <Button size="lg" className="px-12" onClick={() => navigate("/mensal")}>
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanilhaFinanceira;
