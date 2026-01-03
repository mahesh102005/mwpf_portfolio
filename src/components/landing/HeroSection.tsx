import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
const desktopHeroImages = [
  "/assets/hero/desktop-1.jpg",
  "/assets/hero/desktop-2.jpg",
  "/assets/hero/desktop-3.jpg",
  "/assets/hero/desktop-4.jpg",
  "/assets/hero/desktop-5.jpg",
  "/assets/hero/desktop-6.jpg",
  "/assets/hero/desktop-7.jpg",
  "/assets/hero/desktop-8.jpg",
];

const mobileHeroImages = [
  "/assets/hero/mobile-1.jpg",
  "/assets/hero/mobile-2.jpg",
  "/assets/hero/mobile-3.jpg",
  "/assets/hero/mobile-4.jpg",
  "/assets/hero/mobile-5.jpg",
  "/assets/hero/mobile-6.jpg",
  "/assets/hero/mobile-7.jpg",
  "/assets/hero/mobile-8.jpg",
];

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);

  // Start slideshow only after the first image has loaded
  useEffect(() => {
    if (!isSlideshowActive) return;
    
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % desktopHeroImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isSlideshowActive]);

  // Optimize preloading: Only preload the NEXT image
  useEffect(() => {
    if (!isSlideshowActive) return;

    const preloadNext = () => {
      const nextIndex = (currentImage + 1) % desktopHeroImages.length;
      
      // Preload both desktop and mobile versions for the next slide
      // to ensure smooth transition regardless of viewport changes
      const imgDesktop = new Image();
      imgDesktop.src = desktopHeroImages[nextIndex];
      
      const imgMobile = new Image();
      imgMobile.src = mobileHeroImages[nextIndex];
    };

    if ('requestIdleCallback' in window) {
      // @ts-ignore
      window.requestIdleCallback(preloadNext);
    } else {
      setTimeout(preloadNext, 100);
    }
  }, [currentImage, isSlideshowActive]);

  return (
    <section id="home" className="relative h-dvh w-full overflow-hidden bg-black">
      {/* Background Slideshow */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImage}
          // Instant appearance for the first image (LCP optimization), fade in for subsequent slides
          initial={currentImage === 0 && !isSlideshowActive ? { opacity: 1, scale: 1.1 } : { opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0 will-change-transform"
        >
          {/* Use picture tag for native responsive image switching - fastest possible load */}
          <picture className="w-full h-full block">
            <source media="(max-width: 768px)" srcSet={mobileHeroImages[currentImage]} />
            <img
              src={desktopHeroImages[currentImage]}
              alt="Cinematic Photography"
              className="w-full h-full object-cover opacity-80"
              fetchPriority={currentImage === 0 ? "high" : "auto"}
              loading={currentImage === 0 ? "eager" : "lazy"}
              decoding="async"
              onLoad={() => {
                if (currentImage === 0) setIsSlideshowActive(true);
              }}
            />
          </picture>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content - Render immediately to prevent layout shift and improve LCP */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter mb-2 drop-shadow-2xl">
            CAPTURING
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif font-black text-primary italic -mt-2 md:-mt-4 mb-8 drop-shadow-lg">
            moments
          </h2>
          
          <p className="text-sm md:text-lg text-white/80 max-w-xl mb-12 font-extrabold tracking-[0.2em] uppercase border-t border-b border-white/10 py-4">
            Luxury Wedding Photography & Films
          </p>

          <Button 
            size="lg" 
            className="group relative overflow-hidden rounded-full bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 text-white px-10 py-8 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:border-primary/50"
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
        transition={{ delay: 1.0, duration: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/60 uppercase tracking-[0.3em] font-black">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}