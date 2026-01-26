import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const pages = [
  { path: "/", label: "Início" },
  { path: "/comecar", label: "Sobre" },
  { path: "/pilares", label: "Pilares" },
  { path: "/metas", label: "Metas" },
  { path: "/rotina", label: "Rotina" },
  { path: "/horario-semanal", label: "Horário" },
  { path: "/planilha-financeira", label: "Finanças" },
  { path: "/mensal", label: "Mensal" },
  { path: "/anual", label: "Anual" },
  { path: "/festas", label: "Festas" },
  { path: "/documentos", label: "Docs" },
  { path: "/organizacao-digital", label: "Digital" },
  { path: "/exportar-pdf", label: "PDF" },
];

const NavigationMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll to active item when route changes
  useEffect(() => {
    if (activeButtonRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeButton = activeButtonRef.current;
      
      // Calculate scroll position to center the active button
      const containerWidth = container.offsetWidth;
      const buttonLeft = activeButton.offsetLeft;
      const buttonWidth = activeButton.offsetWidth;
      const scrollPosition = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
      
      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: "smooth"
      });
    }
  }, [location.pathname]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-1 p-2 min-w-max justify-center">
          {pages.map((page, index) => {
            const isActive = location.pathname === page.path;
            return (
              <button
                key={page.path}
                ref={isActive ? activeButtonRef : null}
                onClick={() => navigate(page.path)}
                className={cn(
                  "flex flex-col items-center px-3 py-2 rounded-lg text-xs font-medium transition-all min-w-[60px]",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <span className="text-[10px] text-muted-foreground mb-0.5">
                  {index + 1}
                </span>
                <span className="truncate">{page.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
