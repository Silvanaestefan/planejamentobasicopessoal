import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Smartphone, Monitor, Calendar, FileText, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavigationMenu from "@/components/NavigationMenu";

const OrganizacaoDigital = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-primary-foreground/20 p-3 rounded-lg">
            <Smartphone className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-2xl font-bold">Organização Digital</h1>
        <p className="text-primary-foreground/80 mt-1">Celular e Notebook</p>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Organização do Celular */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Smartphone className="h-5 w-5 text-primary" />
              Organização do Celular
            </CardTitle>
            <p className="text-muted-foreground">Baixar no celular a Google Agenda e o Keep.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Agenda */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-semibold flex items-center gap-2 mb-3 text-amber-700">
                <Calendar className="h-5 w-5" />
                Agenda: preencher conforme indicações abaixo
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Período de sono e refeições.</li>
                <li>Compromissos fixos (escola, trabalho...)</li>
                <li>Outros compromissos e recorrências.</li>
                <li>Aniversários e datas comemorativas.</li>
                <li>Dia de organização da casa.</li>
                <li>Dia de compras semanais ou mensal.</li>
                <li>Dia de recebimento e pagamentos.</li>
                <li>Dia de marcação de consultas, vacinas e outros cuidados pessoais. (neste dia já pode agendar exames e anotar a data de retorno. Anote também o que é preciso levar como: exames, nome dos remédios...)</li>
              </ol>
            </div>

            {/* Keep */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-semibold flex items-center gap-2 mb-3 text-amber-700">
                <FileText className="h-5 w-5" />
                Keep: criar 2 marcadores – Pessoal e Casa (ou Todoist)
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Pessoal:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-2">
                    <li>Lista de tarefas eventuais.</li>
                    <li>Lista de roupas para viagens.</li>
                    <li>Educação: cursos</li>
                    <li>Lista de tratamentos e mês de retorno (ou pode deixar só na agenda).</li>
                  </ol>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Organização do Notebook */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Monitor className="h-5 w-5 text-primary" />
              Organizando a área de trabalho do notebook
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Redes Sociais */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-purple-700">Redes Sociais</h3>
              <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                <ul className="space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    E-mail
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    Youtube
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    TikTok
                  </li>
                </ul>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    Whatsapp
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    Instagram
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    Outros
                  </li>
                </ul>
              </div>
            </div>

            {/* Barra de Favoritos */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-semibold flex items-center gap-2 mb-2 text-primary">
                <Bookmark className="h-5 w-5" />
                Barra de Favoritos
              </h3>
              <p className="text-muted-foreground mb-4">
                Crie na barra de favoritos as pastas e subpastas seguintes e salve os sites de sua preferência, referentes a cada assunto:
              </p>
              
              <div className="bg-background rounded-lg p-4">
                <h4 className="font-medium mb-3">(Pasta principal) Seu nome</h4>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li>• Trabalho</li>
                  <li>• Educação</li>
                  <li>• Sites</li>
                  <li>• Saúde</li>
                  <li>• Financeiro</li>
                  <li>• Notícias</li>
                  <li>• Eventos</li>
                  <li>• Jogos</li>
                  <li>• Lojas</li>
                  <li>• etc.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => navigate("/documentos")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <Button onClick={() => navigate("/exportar-pdf")}>
            Continuar
          </Button>
        </div>
      </div>
      <NavigationMenu />
    </div>
  );
};

export default OrganizacaoDigital;
