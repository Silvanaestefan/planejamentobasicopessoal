import { Button } from "@/components/ui/button";
import { IconBox } from "@/components/ui/icon-box";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavigationMenu from "@/components/NavigationMenu";

const Comecar = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12 pb-24">
      <div className="max-w-2xl w-full flex flex-col items-center text-center space-y-8">
        {/* Icon */}
        <IconBox>
          <CalendarCheck className="w-10 h-10 text-primary" />
        </IconBox>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Sobre o <span className="text-primary">Método</span>
        </h1>

        {/* Card */}
        <div className="bg-card rounded-2xl shadow-lg p-8 max-w-xl w-full">
          <p className="text-foreground/80 text-lg leading-relaxed">
            O Planejamento Básico Pessoal é organizado em{" "}
            <span className="text-primary font-semibold">8 pilares da vida</span>, que
            representam as principais áreas que sustentam uma vida equilibrada,
            funcional e consciente.
          </p>
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          onClick={() => navigate("/pilares")}
          className="px-10 py-6 text-lg font-semibold gap-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Continuar
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
      <NavigationMenu />
    </div>
  );
};

export default Comecar;
