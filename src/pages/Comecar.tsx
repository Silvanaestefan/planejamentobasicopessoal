import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Comecar = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full text-center space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Próxima Etapa
        </h1>
        <p className="text-lg text-muted-foreground">
          Esta é a página seguinte do seu planejamento pessoal.
        </p>

        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar ao início
        </Button>
      </div>
    </div>
  );
};

export default Comecar;
