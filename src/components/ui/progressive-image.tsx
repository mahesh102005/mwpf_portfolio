import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderColor?: string;
}

export function ProgressiveImage({
  src,
  className,
  alt,
  placeholderColor = "bg-zinc-100 dark:bg-zinc-800",
  ...props
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;
    
    // Reset loaded state when src changes
    setIsLoaded(false);

    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Placeholder */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700 ease-in-out z-10",
          placeholderColor,
          isLoaded ? "opacity-0" : "opacity-100"
        )}
      />
      
      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        className={cn(
          "h-full w-full object-cover transition-all duration-700 ease-in-out",
          isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-sm",
          className
        )}
        {...props}
      />
    </div>
  );
}
