import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const heroImages = [
  "https://harmless-tapir-303.convex.cloud/api/storage/7b2dadc5-a34b-4f8b-96c2-bd715046688d",
  "https://harmless-tapir-303.convex.cloud/api/storage/30672191-da0c-412d-a90e-ecd73f4fe5aa",
  "https://harmless-tapir-303.convex.cloud/api/storage/9ad40ea7-67f5-4db4-bde3-f8d81c18d428",
  "https://harmless-tapir-303.convex.cloud/api/storage/5cc5446d-e17c-4be0-ae21-1b51f54feffd",
  "https://harmless-tapir-303.convex.cloud/api/storage/db1f7a39-9b26-45d6-9314-b4fd1a8a375d",
  "https://harmless-tapir-303.convex.cloud/api/storage/9493e58c-0bdf-4804-afa3-220848db242f",
  "https://harmless-tapir-303.convex.cloud/api/storage/ef832735-70a2-4999-b8f2-129c585f6a85",
  "https://harmless-tapir-303.convex.cloud/api/storage/6b57dafd-6162-4a29-8fa6-e89a4e9fe226",
  "https://harmless-tapir-303.convex.cloud/api/storage/a6672e13-e9d3-4838-a2ef-948801689222",
  "https://harmless-tapir-303.convex.cloud/api/storage/ea6b6155-aa9c-49d3-acac-ae401d1aa71f",
];

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    // Preload images for smoother transitions
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Slideshow */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={heroImages[currentImage]}
            alt="Cinematic Photography"
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
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
          >
            <span className="relative z-10 group-hover:text-primary transition-colors duration-300">View Portfolio</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/40 uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}