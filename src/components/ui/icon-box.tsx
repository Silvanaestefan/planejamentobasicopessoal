import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface IconBoxProps {
  children: ReactNode;
  className?: string;
}

export function IconBox({ children, className }: IconBoxProps) {
  return (
    <div
      className={cn(
        "w-20 h-20 rounded-2xl bg-card shadow-lg flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}
