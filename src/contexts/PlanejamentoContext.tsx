import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

// Types
export interface Tarefa {
  id: string;
  texto: string;
  concluida: boolean;
}

export interface ItemFinanceiro {
  id: string;
  nome: string;
  valor: number;
}

export interface Documento {
  id: string;
  nome: string;
  informacao: string;
}

export interface FestaType {
  titulo: string;
  categorias: {
    [key: string]: string[];
  };
}

export interface PlanejamentoData {
  avaliacoesPilares: Record<number, number>;
  metasPorPilar: Record<number, string[]>;
  tarefasRotina: Record<number, Tarefa[]>;
  lixeiraRotina: Tarefa[];
  horarioSemanal: Record<string, string[]>;
  despesas: ItemFinanceiro[];
  cabecalhoDespesas: string;
  docsPessoais: Documento[];
  docsResidencia: Documento[];
  docsImoveis: Documento[];
  listasCompras: Record<string, string[]>;
  planejamentoAnual: Record<string, string[]>;
  festas: FestaType[];
}

const defaultData: PlanejamentoData = {
  avaliacoesPilares: {},
  metasPorPilar: {
    1: [""], 2: [""], 3: [""], 4: [""], 5: [""], 6: [""], 7: [""], 8: [""]
  },
  tarefasRotina: {},
  lixeiraRotina: [],
  horarioSemanal: {},
  despesas: [
    { id: "1", nome: "Recebimento", valor: 0 },
    { id: "2", nome: "Reserva de Segurança", valor: 0 },
  ],
  cabecalhoDespesas: "Salário",
  docsPessoais: [],
  docsResidencia: [],
  docsImoveis: [],
  listasCompras: {
    "Medicamentos": [],
    "Perfumaria": [],
    "Supermercado": [],
    "Legumes e verduras": [],
    "Frutas": [],
    "Padaria": [],
    "Guloseimas": [],
    "Chás e condimentos": [],
    "Outros": []
  },
  planejamentoAnual: {
    "Janeiro": ["DPVAT"],
    "Fevereiro": ["Carnaval", "IPTU", "Taxa de Bombeiro"],
    "Março": ["Imposto de Renda (IR) — separar os boletos e extratos"],
    "Abril": [],
    "Maio": [],
    "Junho": [],
    "Julho": [],
    "Agosto": [],
    "Setembro": [],
    "Outubro": [],
    "Novembro": [],
    "Dezembro": [],
  },
  festas: [
    {
      titulo: "Aniversário",
      categorias: {
        "Salgados": [],
        "Doces": [],
        "Bebidas": [],
        "Decoração": [],
        "Convidados": [],
      }
    }
  ]
};

// Per-user localStorage key — prevents data leakage between accounts on the same device
const storageKeyFor = (userId: string | null | undefined) =>
  userId ? `planejamento-basico-pessoal:${userId}` : `planejamento-basico-pessoal:guest`;

interface PlanejamentoContextType {
  data: PlanejamentoData;
  updateData: (updates: Partial<PlanejamentoData>) => void;
  resetData: () => void;
}

const PlanejamentoContext = createContext<PlanejamentoContextType | undefined>(undefined);

export const PlanejamentoProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<PlanejamentoData>(defaultData);
  const [hydrated, setHydrated] = useState(false);
  const currentUserIdRef = useRef<string | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load data whenever the authenticated user changes
  useEffect(() => {
    if (authLoading) return;

    const userId = user?.id ?? null;
    currentUserIdRef.current = userId;
    setHydrated(false);

    const loadData = async () => {
      // 1) Try local cache scoped to this user
      let initial: PlanejamentoData = defaultData;
      try {
        const saved = localStorage.getItem(storageKeyFor(userId));
        if (saved) {
          initial = { ...defaultData, ...JSON.parse(saved) };
        }
      } catch (e) {
        console.error("Error loading local data:", e);
      }

      // 2) If logged in, fetch from backend (source of truth) and override
      if (userId) {
        try {
          const { data: row, error } = await supabase
            .from("planejamento_data")
            .select("data")
            .eq("user_id", userId)
            .maybeSingle();

          if (!error && row?.data) {
            initial = { ...defaultData, ...(row.data as Partial<PlanejamentoData>) };
          }
        } catch (e) {
          console.error("Error loading remote data:", e);
        }
      }

      // Only apply if user hasn't changed mid-flight
      if (currentUserIdRef.current === userId) {
        setData(initial);
        setHydrated(true);
      }
    };

    loadData();
  }, [user?.id, authLoading]);

  // Persist on change: localStorage immediately, Supabase debounced
  useEffect(() => {
    if (!hydrated) return;
    const userId = currentUserIdRef.current;

    try {
      localStorage.setItem(storageKeyFor(userId), JSON.stringify(data));
    } catch (e) {
      console.error("Error saving local data:", e);
    }

    if (!userId) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await supabase
          .from("planejamento_data")
          .upsert(
            { user_id: userId, data: data as any, updated_at: new Date().toISOString() },
            { onConflict: "user_id" }
          );
      } catch (e) {
        console.error("Error saving remote data:", e);
      }
    }, 800);
  }, [data, hydrated]);

  const updateData = (updates: Partial<PlanejamentoData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const resetData = () => {
    const userId = currentUserIdRef.current;
    setData(defaultData);
    try {
      localStorage.removeItem(storageKeyFor(userId));
    } catch {}
    if (userId) {
      supabase
        .from("planejamento_data")
        .upsert(
          { user_id: userId, data: defaultData as any, updated_at: new Date().toISOString() },
          { onConflict: "user_id" }
        )
        .then(({ error }) => {
          if (error) console.error("Error resetting remote data:", error);
        });
    }
  };

  return (
    <PlanejamentoContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </PlanejamentoContext.Provider>
  );
};

export const usePlanejamento = () => {
  const context = useContext(PlanejamentoContext);
  if (!context) {
    throw new Error("usePlanejamento must be used within a PlanejamentoProvider");
  }
  return context;
};
