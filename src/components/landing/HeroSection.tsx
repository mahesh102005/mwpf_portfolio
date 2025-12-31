import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const desktopHeroImages = [
  "https://harmless-tapir-303.convex.cloud/api/storage/bc728afb-a2f0-4ea3-9a74-94b7ad89c432",
  "https://harmless-tapir-303.convex.cloud/api/storage/b122d7c1-8a08-4e81-b598-563793135485",
  "https://harmless-tapir-303.convex.cloud/api/storage/168a96d0-77e6-4dce-8f09-dd6604b7957e",
  "https://harmless-tapir-303.convex.cloud/api/storage/f52829a0-e7ae-459e-abbb-af9e238c3141",
  "https://harmless-tapir-303.convex.cloud/api/storage/28e9b1f2-db2d-4c4d-9581-e98758916547",
  "https://harmless-tapir-303.convex.cloud/api/storage/4c267195-2f30-40a9-b4f9-967172ed94c6",
  "https://harmless-tapir-303.convex.cloud/api/storage/9220dfa0-c67a-4c34-91be-e61c6b978e31",
  "https://harmless-tapir-303.convex.cloud/api/storage/fe493285-4bb8-42a7-91da-7756fa9cb679",
];

const mobileHeroImages = [
  "https://harmless-tapir-303.convex.cloud/api/storage/07b5732b-3754-4805-9018-b663d5dd6958",
  "https://harmless-tapir-303.convex.cloud/api/storage/c1ec3c88-42a1-4c08-8f28-0fb711d12cc2",
  "https://harmless-tapir-303.convex.cloud/api/storage/a5443f3f-a551-4eeb-b243-9dfa1fed9805",
  "https://harmless-tapir-303.convex.cloud/api/storage/60a45ed4-4631-4503-a971-2b756b3988c0",
  "https://harmless-tapir-303.convex.cloud/api/storage/d5ba003b-c798-4573-a4a3-31c7df1176d8",
  "https://harmless-tapir-303.convex.cloud/api/storage/4a898f25-d7a3-4207-8dd9-713912281ca2",
  "https://harmless-tapir-303.convex.cloud/api/storage/21474769-7eb6-44b5-9d5b-a67a67f80e86",
  "https://harmless-tapir-303.convex.cloud/api/storage/c76a9d10-d523-455a-8108-43da912dd63b",
];

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const isMobile = useIsMobile();
  const heroImages = isMobile ? mobileHeroImages : desktopHeroImages;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [heroImages]);

  useEffect(() => {
    // Optimize preloading: Only preload the NEXT image to save bandwidth
    // This ensures the current image loads fastest
    const nextIndex = (currentImage + 1) % heroImages.length;
    const img = new Image();
    img.src = heroImages[nextIndex];
  }, [currentImage, heroImages]);

  return (
    <section id="home" className="relative h-dvh w-full overflow-hidden bg-black">
      {/* Background Slideshow */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${isMobile ? 'mobile' : 'desktop'}-${currentImage}`}
          initial={{ opacity: 0, scale: isMobile ? 1.25 : 1.1, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: isMobile ? 1.15 : 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={heroImages[currentImage]}
            alt={`Mauli Photography Portfolio Highlight ${currentImage + 1}`}
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            width="1920"
            height="1080"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white] tracking-tighter mb-4 drop-shadow-2xl">
            CAPTURING
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif text-transparent [-webkit-text-stroke:1px_var(--color-primary)] md:[-webkit-text-stroke:2px_var(--color-primary)] italic -mt-2 md:-mt-6 mb-8 drop-shadow-lg">
            moments
          </h2>
          
          <p className="text-sm md:text-lg text-white/80 max-w-xl mb-12 font-light tracking-[0.2em] uppercase border-t border-b border-white/10 py-4">
            Luxury Wedding Photography & Films
          </p>

          <Button 
            size="lg" 
            className="group relative overflow-hidden rounded-full bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 text-white px-10 py-8 text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:border-primary/50"
            onClick={() => document.getElementById('photo')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="View Portfolio"
          >
            <span className="relative z-10 group-hover:text-primary transition-colors duration-300">View Portfolio</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}