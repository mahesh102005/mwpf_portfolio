import { cn } from "@/lib/utils";
import React from "react";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  light?: boolean;
}

export function Spinner({ className, size = "md", light = false, ...props }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div className={cn("relative inline-block", sizeClasses[size], className)} {...props}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute top-[37.5%] left-[45%] w-[10%] h-[25%] rounded-full animate-spinner-leaf",
            light ? "bg-white" : "bg-current"
          )}
          style={{
            transform: `rotate(${i * 30}deg) translate(0, -150%)`,
            animationDelay: `${-1.2 + i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}
