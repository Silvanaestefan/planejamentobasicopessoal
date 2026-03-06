import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { CalendarCheck, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EsqueciSenha = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-sm w-full text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Email enviado</h1>
          <p className="text-muted-foreground">
            Se o email <strong className="text-foreground">{email}</strong> estiver cadastrado, você receberá um link para redefinir sua senha.
          </p>
          <Link to="/login">
            <Button variant="outline" className="w-full">Voltar ao login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-sm w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <CalendarCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Esqueci minha senha</h1>
          <p className="text-muted-foreground text-sm">Insira seu email para redefinir</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Enviando..." : "Enviar link"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          <Link to="/login" className="text-primary hover:underline">Voltar ao login</Link>
        </p>
      </div>
    </div>
  );
};

export default EsqueciSenha;
