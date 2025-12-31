import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand, ImageIcon, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const photos = [
  {
    id: 1,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/500ff364-b20d-402f-8309-92abfe83df04",
    category: "Wedding",
    title: "Ceremonial Bliss"
  },
  {
    id: 2,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/9cd0b89b-4198-4326-8c92-9b335417ec78",
    category: "Celebration",
    title: "Joyful Moments"
  },
  {
    id: 3,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/14f0092a-3750-4219-a36f-268d6177f7dc",
    category: "Portrait",
    title: "Romantic Gaze"
  },
  {
    id: 4,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/1c3d2146-e798-4673-b8ec-219d28d8e452",
    category: "Wedding",
    title: "Eternal Love"
  },
  {
    id: 5,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/799ae19a-6405-40d7-bfa9-f954d55954f9",
    category: "Celebration",
    title: "First Dance"
  },
  {
    id: 6,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/8b315867-b08b-48cb-922c-ceb5b4e625fa",
    category: "Portrait",
    title: "Bridal Elegance"
  },
  {
    id: 7,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/bee45cff-7831-4509-bd5b-62975b47bf82",
    category: "Event",
    title: "Festive Spirit"
  },
  {
    id: 8,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/61f69825-eabb-444f-a949-66f845e000dc",
    category: "Event",
    title: "Joyous Celebration"
  }
];

export function PhotoSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [userStopped, setUserStopped] = useState(false);
  const [direction, setDirection] = useState(0);

  const nextPhoto = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, []);

  const prevPhoto = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, []);

  const handleManualNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    nextPhoto();
    setIsAutoPlaying(false);
    setUserStopped(true);
  };

  const handleManualPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    prevPhoto();
    setIsAutoPlaying(false);
    setUserStopped(true);
  };

  const handleImageClick = () => {
    setIsFullScreen(true);
    setIsAutoPlaying(false);
    setUserStopped(true);
  };

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying || isFullScreen) return;

    const timer = setInterval(() => {
      nextPhoto();
    }, 5000); // 5 seconds

    return () => clearInterval(timer);
  }, [isAutoPlaying, isFullScreen, nextPhoto]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleManualNext();
      if (e.key === "ArrowLeft") handleManualPrev();
      if (e.key === "Escape") setIsFullScreen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPhoto, prevPhoto]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.2,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    })
  };

  return (
    <section id="photo" className="py-24 px-4 bg-white relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-zinc-50 to-zinc-100 opacity-80" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[90rem] mx-auto flex flex-col items-center gap-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight"
          >
            PHOTOS
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 max-w-lg mx-auto"
          >
            Capturing moments that last forever
          </motion.p>
        </div>

        {/* Main Photo Panel */}
        <motion.div 
          className="relative group w-full max-w-5xl mx-auto aspect-video rounded-[2rem] overflow-hidden bg-white/30 border-2 border-zinc-300 md:border md:border-white/50 shadow-2xl backdrop-blur-md"
          onMouseEnter={() => !userStopped && setIsAutoPlaying(false)}
          onMouseLeave={() => !userStopped && setIsAutoPlaying(true)}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Glass Overlay & Vignette */}
          <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] rounded-[2rem]" />
          
          {/* Image Slider */}
          <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentIndex}
                src={photos[currentIndex].src}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 }
                }}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={handleImageClick}
                alt={photos[currentIndex].title}
                loading="lazy"
              />
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-0 z-30 flex items-center justify-between px-4 md:px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleManualPrev}
              className="h-12 w-12 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md border border-white/10 pointer-events-auto transition-transform hover:scale-110"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleManualNext}
              className="h-12 w-12 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md border border-white/10 pointer-events-auto transition-transform hover:scale-110"
            >
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-30 p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="flex items-end justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="pointer-events-auto text-white/80 hover:text-white hover:bg-white/10 gap-2"
                onClick={handleImageClick}
              >
                <Expand className="w-4 h-4" />
                Full Screen
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Controls */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="h-12 px-8 rounded-full bg-white/80 border-zinc-200 text-zinc-900 hover:bg-white hover:text-primary backdrop-blur-md transition-all hover:scale-105 shadow-sm"
            onClick={handleManualNext}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Change Photo
          </Button>
        </div>

      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6 z-50 text-white/50 hover:text-white hover:bg-white/10 rounded-full h-12 w-12"
              onClick={() => setIsFullScreen(false)}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={currentIndex}
                  src={photos[currentIndex].src}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="max-w-full max-h-full object-contain shadow-2xl"
                />
              </AnimatePresence>
            </div>

            {/* Floating Controls Panel */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleManualPrev}
                className="text-white hover:bg-white/10 rounded-full"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              
              <div className="h-8 w-[1px] bg-white/10" />
              
              <Button
                variant="ghost"
                onClick={handleManualNext}
                className="text-white hover:bg-white/10 rounded-full px-6"
              >
                Change Photo
              </Button>

              <div className="h-8 w-[1px] bg-white/10" />

              <Button
                variant="ghost"
                size="icon"
                onClick={handleManualNext}
                className="text-white hover:bg-white/10 rounded-full"
              >
                <ArrowRight className="w-6 h-6" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}