import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureBadgeProps {
  text: string;
  className?: string;
}

export function FeatureBadge({ text, className }: FeatureBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-primary font-medium",
        className
      )}
    >
      <Sparkles className="w-4 h-4" />
      <span>{text}</span>
    </div>
  );
}
