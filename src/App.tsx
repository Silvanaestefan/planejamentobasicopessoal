import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlanejamentoProvider } from "@/contexts/PlanejamentoContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import Comecar from "./pages/Comecar";
import Pilares from "./pages/Pilares";
import Metas from "./pages/Metas";
import Rotina from "./pages/Rotina";
import HorarioSemanal from "./pages/HorarioSemanal";
import PlanilhaFinanceira from "./pages/PlanilhaFinanceira";
import Mensal from "./pages/Mensal";
import CardapioSemanal from "./pages/CardapioSemanal";
import Anual from "./pages/Anual";
import Festas from "./pages/Festas";
import Documentos from "./pages/Documentos";
import OrganizacaoDigital from "./pages/OrganizacaoDigital";
import ExportarPDF from "./pages/ExportarPDF";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import EsqueciSenha from "./pages/EsqueciSenha";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <PlanejamentoProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/esqueci-senha" element={<EsqueciSenha />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/app" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/comecar" element={<ProtectedRoute><Comecar /></ProtectedRoute>} />
              <Route path="/pilares" element={<ProtectedRoute><Pilares /></ProtectedRoute>} />
              <Route path="/metas" element={<ProtectedRoute><Metas /></ProtectedRoute>} />
              <Route path="/rotina" element={<ProtectedRoute><Rotina /></ProtectedRoute>} />
              <Route path="/horario-semanal" element={<ProtectedRoute><HorarioSemanal /></ProtectedRoute>} />
              <Route path="/planilha-financeira" element={<ProtectedRoute><PlanilhaFinanceira /></ProtectedRoute>} />
              <Route path="/mensal" element={<ProtectedRoute><Mensal /></ProtectedRoute>} />
              <Route path="/cardapio-semanal" element={<ProtectedRoute><CardapioSemanal /></ProtectedRoute>} />
              <Route path="/anual" element={<ProtectedRoute><Anual /></ProtectedRoute>} />
              <Route path="/festas" element={<ProtectedRoute><Festas /></ProtectedRoute>} />
              <Route path="/documentos" element={<ProtectedRoute><Documentos /></ProtectedRoute>} />
              <Route path="/organizacao-digital" element={<ProtectedRoute><OrganizacaoDigital /></ProtectedRoute>} />
              <Route path="/exportar-pdf" element={<ProtectedRoute><ExportarPDF /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PlanejamentoProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
