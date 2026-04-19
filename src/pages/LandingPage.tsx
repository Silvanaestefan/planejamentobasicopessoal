import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, 
  Check, 
  Calendar, 
  Target, 
  Wallet, 
  ListTodo, 
  CalendarDays, 
  Clock, 
  Bell,
  UserPlus,
  Unlock,
  CalendarCheck,
  TrendingUp,
  Scale,
  Menu,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PWAInstallButton } from "@/components/PWAInstallButton";

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Planejamento Básico Pessoal</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("recursos")} className="text-muted-foreground hover:text-foreground transition-colors">
              Recursos
            </button>
            <button onClick={() => scrollToSection("beneficios")} className="text-muted-foreground hover:text-foreground transition-colors">
              Benefícios
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Entrar
            </Button>
            <Button onClick={() => navigate("/cadastro")}>
              Criar Conta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background p-4 space-y-4">
            <button onClick={() => scrollToSection("recursos")} className="block w-full text-left py-2">
              Recursos
            </button>
            <button onClick={() => scrollToSection("beneficios")} className="block w-full text-left py-2">
              Benefícios
            </button>
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full" onClick={() => navigate("/login")}>
                Entrar
              </Button>
              <Button className="w-full" onClick={() => navigate("/cadastro")}>
                Criar Conta
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Organize sua vida pessoal</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Seu planejamento pessoal simplificado
          </h1>

          <p className="text-base md:text-lg text-primary font-medium mb-4">
            Baseado no Ebook Planejamento Básico Pessoal
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Organize suas metas, tarefas e finanças em um só lugar.
          </p>

          <div className="flex justify-center mb-10">
            <Button 
              size="lg" 
              onClick={() => navigate("/cadastro")}
              className="px-8 py-6 text-lg gap-2"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              <span>Seus dados seguros</span>
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Plano único: <span className="font-semibold text-primary">R$ 9,90/mês</span>
            <br />
            <span className="text-xs">Pagamento processado pela Google Play Store</span>
          </p>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-16 bg-muted/30 px-4" id="recursos">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Conheça o app PBP
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Interface simples e intuitiva para organizar sua vida pessoal.
          </p>

          {/* Phone Mockup */}
          <div className="relative mx-auto max-w-xs">
            <div className="bg-background rounded-3xl shadow-2xl p-6 border">
              <p className="text-sm text-muted-foreground mb-4 italic">
                Não existe certo ou errado — existe clareza.
              </p>
              <div className="space-y-3">
                {[
                  { icon: "❤️", name: "Saúde e Cuidados Pessoais", stars: 3 },
                  { icon: "🏠", name: "Moradia", stars: 3 },
                  { icon: "📚", name: "Educação", stars: 3 },
                  { icon: "💰", name: "Finanças", stars: 3 },
                  { icon: "🌿", name: "Contato com a Natureza", stars: 3 },
                  { icon: "🎉", name: "Lazer e Social", stars: 3 },
                  { icon: "✨", name: "Espiritual", stars: 3 },
                  { icon: "💼", name: "Trabalho", stars: 3 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < item.stars ? "text-primary" : "text-muted"}>★</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tudo que você precisa
            </h2>
            <p className="text-lg text-muted-foreground">
              Ferramentas simples e poderosas para organizar sua rotina pessoal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Metas Pessoais", description: "Defina e acompanhe suas metas de curto e longo prazo com facilidade." },
              { icon: Wallet, title: "Controle Financeiro", description: "Gerencie receitas, despesas e orçamento mensal de forma simples." },
              { icon: ListTodo, title: "Lista de Tarefas", description: "Organize suas tarefas diárias e nunca esqueça compromissos importantes." },
              { icon: CalendarDays, title: "Listas Personalizadas", description: "Crie listas de compras, festas, viagens e muito mais." },
              { icon: Clock, title: "Relatórios Visuais", description: "Acompanhe seu progresso com gráficos e baixe uma cópia em PDF." },
              { icon: Bell, title: "Rotinas", description: "Mantenha uma rotina diária organizada e produtiva." },
            ].map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist Section */}
      <section className="py-16 bg-muted/30 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            O que você vai encontrar no app PBP?
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Os 8 pilares organizados",
              "Rotinas diárias, semanais e mensais",
              "Checklists práticos",
              "Planilhas simples",
              "Área de metas",
              "Relatórios de progresso",
              "Conteúdos exclusivos",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-xl border">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button 
              size="lg" 
            onClick={() => navigate("/cadastro")}
            className="px-8 py-6 text-lg gap-2"
          >
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 px-4" id="beneficios">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Por que escolher o Planejamento Básico Pessoal?
            </h2>
            <p className="text-lg text-muted-foreground">
              Criado para pessoas que querem organizar a vida sem complicação.
              <br />
              Simples, eficiente e focado no que realmente importa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Organiza todas as áreas da vida em um único aplicativo, podendo ter uma cópia em PDF no final",
              "Foi criado para pessoas que precisam definir uma rotina",
              "Transforma desorganização em clareza",
              "Foca no que realmente importa, não no que só ocupa tempo",
              "Incentiva hábitos simples que geram grandes mudanças",
              "Promove equilíbrio, bem-estar e controle da própria vida",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Como funciona?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: UserPlus, text: "Você cria sua conta no app" },
              { icon: CalendarCheck, text: "Preenche com calma" },
              { icon: Unlock, text: "Acessa todos os conteúdos" },
              { icon: CalendarCheck, text: "Aplica o método no seu dia a dia" },
              { icon: TrendingUp, text: "Acompanha seu progresso" },
              { icon: Scale, text: "Ajusta sua rotina com clareza e equilíbrio" },
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-background rounded-xl border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">{step.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-primary/5 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Junte-se a milhares de pessoas que já estão no controle das suas metas, tarefas e finanças.
          </h2>
          <Button 
            size="lg" 
            onClick={() => navigate("/cadastro")}
            className="px-8 py-6 text-lg gap-2"
          >
            Começar Agora
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-semibold">
              Planejamento Básico Pessoal
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
              <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-foreground transition-colors">Suporte</a>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Planejamento Básico Pessoal. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
      <PWAInstallButton />
    </div>
  );
};

export default LandingPage;
