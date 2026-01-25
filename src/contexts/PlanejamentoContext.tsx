import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
  // Pilares (avaliações de 1-5)
  avaliacoesPilares: Record<number, number>;
  // Metas por pilar
  metasPorPilar: Record<number, string[]>;
  // Rotina por categoria
  tarefasRotina: Record<number, Tarefa[]>;
  // Lixeira de tarefas da rotina
  lixeiraRotina: Tarefa[];
  // Horário semanal
  horarioSemanal: Record<string, string[]>;
  // Planilha financeira
  despesas: ItemFinanceiro[];
  cabecalhoDespesas: string;
  docsPessoais: Documento[];
  docsResidencia: Documento[];
  docsImoveis: Documento[];
  // Mensal
  listasCompras: Record<string, string[]>;
  // Anual
  planejamentoAnual: Record<string, string[]>;
  // Festas
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
    "Março": ["Imposto de Renda"],
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

const STORAGE_KEY = "planejamento-basico-pessoal";

interface PlanejamentoContextType {
  data: PlanejamentoData;
  updateData: (updates: Partial<PlanejamentoData>) => void;
  resetData: () => void;
}

const PlanejamentoContext = createContext<PlanejamentoContextType | undefined>(undefined);

export const PlanejamentoProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PlanejamentoData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults to ensure all fields exist
        return { ...defaultData, ...parsed };
      }
    } catch (e) {
      console.error("Error loading saved data:", e);
    }
    return defaultData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Error saving data:", e);
    }
  }, [data]);

  const updateData = (updates: Partial<PlanejamentoData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const resetData = () => {
    setData(defaultData);
    localStorage.removeItem(STORAGE_KEY);
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
