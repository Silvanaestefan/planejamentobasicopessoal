import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Comecar from "./pages/Comecar";
import Pilares from "./pages/Pilares";
import Metas from "./pages/Metas";
import Rotina from "./pages/Rotina";
import HorarioSemanal from "./pages/HorarioSemanal";
import PlanilhaFinanceira from "./pages/PlanilhaFinanceira";
import Mensal from "./pages/Mensal";
import Anual from "./pages/Anual";
import Festas from "./pages/Festas";
import Documentos from "./pages/Documentos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/comecar" element={<Comecar />} />
          <Route path="/pilares" element={<Pilares />} />
          <Route path="/metas" element={<Metas />} />
          <Route path="/rotina" element={<Rotina />} />
          <Route path="/horario-semanal" element={<HorarioSemanal />} />
          <Route path="/planilha-financeira" element={<PlanilhaFinanceira />} />
          <Route path="/mensal" element={<Mensal />} />
          <Route path="/anual" element={<Anual />} />
          <Route path="/festas" element={<Festas />} />
          <Route path="/documentos" element={<Documentos />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
