import { ArrowLeft, FileText, Smartphone, FolderOpen, Archive } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Documentos = () => {
  const navigate = useNavigate();

  const documentosPessoais = [
    "Certidão de Nascimento",
    "Cartão Nacional de Saúde (SUS)",
    "Cartão de Vacinação",
    "Identificação Civil (RG)",
    "CPF (Cadastro de Pessoas Físicas)",
    "Título Eleitoral (16 anos)",
    "Habilitação",
    "Documento de Veículo (IPVA)",
    "Inscrição no INSS",
    "Carteira de Trabalho Digital ou Física",
    "Alistamento Militar (homens 18 anos)",
    "Xerox autenticado da certidão e da identidade",
    "Comprovante de Residência",
    "Conta Corrente"
  ];

  const apps = [
    "Gov.com",
    "Meu INSS",
    "SUS",
    "Carteira Digital",
    "e-Título",
    "Carteira de Trabalho",
    "Posto digital Detran",
    "IPTU",
    "Luz",
    "Água"
  ];

  const pastasDigitais = [
    "Financeiro (guardar planilhas, recibos para Imposto de Renda)",
    "Documentos Pessoais e Imobiliário (escrituras, contratos...)",
    "Saúde (exames, receitas...)",
    "Educação (cursos, diplomas, ebook...)",
    "Trabalho",
    "Lembranças pessoais",
    "Documentos de outras pessoas"
  ];

  const documentosFisicos = [
    "Certidão de Nascimento e cópia autenticada",
    "Carteira de Identidade e cópia autenticada",
    "Diplomas"
  ];

  const documentosImoveis = [
    "Escrituras",
    "Recibos (comuns e para Imposto de Renda – educação, saúde...)",
    "Garantias"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            className="text-primary-foreground hover:bg-primary-foreground/10 mb-4 -ml-2"
            onClick={() => navigate("/festas")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Documentos</h1>
            <p className="text-primary-foreground/80">Lista de documentos importantes</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Documentos Pessoais */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-primary" />
              Documentos Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {documentosPessoais.map((doc, index) => (
              <div key={index} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">{doc}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Apps */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Smartphone className="w-5 h-5 text-primary" />
              Apps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {apps.map((app, index) => (
              <div key={index} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">{app}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Criando pastas para documentos digitais */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FolderOpen className="w-5 h-5 text-primary" />
              Criando pastas para documentos digitais
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              No Google Drive, crie uma pasta com seu nome e as subpastas a seguir, para ter acesso aos conteúdos mais rapidamente.
            </p>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="font-medium text-foreground mb-3">(Pasta principal) Seu nome</p>
              <div className="space-y-2 pl-4">
                {pastasDigitais.map((pasta, index) => (
                  <p key={index} className="text-foreground">
                    {index + 1}. {pasta}
                  </p>
                ))}
              </div>
            </div>
            <p className="text-sm text-primary italic mt-4">
              Dentro de cada pasta dessa, arquivar os documentos, recibos, exames e outros
            </p>
          </CardContent>
        </Card>

        {/* Organização dos documentos físicos */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Archive className="w-5 h-5 text-primary" />
              Organização dos documentos físicos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
              <p className="font-medium text-amber-900 dark:text-amber-100 mb-3">
                Documentos físicos - guarde-os em uma pasta de plástico sanfonada
              </p>
              <div className="space-y-2">
                {documentosFisicos.map((doc, index) => (
                  <p key={index} className="text-amber-800 dark:text-amber-200 pl-2">
                    • {doc}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
              <p className="font-medium text-amber-900 dark:text-amber-100 mb-3">
                Documentos de imóveis – guarde-os em outra pasta de plástico sanfonada
              </p>
              <div className="space-y-2">
                {documentosImoveis.map((doc, index) => (
                  <p key={index} className="text-amber-800 dark:text-amber-200 pl-2">
                    • {doc}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navegação */}
        <div className="pt-4">
          <Button 
            className="w-full"
            onClick={() => navigate("/organizacao-digital")}
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Documentos;
