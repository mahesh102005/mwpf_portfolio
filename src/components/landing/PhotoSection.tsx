import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand, ImageIcon, Minimize, X } from "lucide-react";
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
  },
  {
    id: 9,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/3bf386d5-3629-4a49-af82-b62819322d77",
    category: "Wedding",
    title: "Traditional Elegance"
  },
  {
    id: 10,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/b46b6057-635b-44b7-878f-96f0a9ad1e04",
    category: "Portrait",
    title: "Candid Moment"
  },
  {
    id: 11,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/659d6868-212b-41aa-9eb1-1b0a7fd1358f",
    category: "Portrait",
    title: "Natural Beauty"
  },
  {
    id: 12,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/4319c1d5-d297-4736-9354-20ae9453d32d",
    category: "Wedding",
    title: "Groom's Portrait"
  },
  {
    id: 13,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/92c7983d-8f02-4d8f-9538-6cfe66c19dbb",
    category: "Wedding",
    title: "Couple's Joy"
  },
  {
    id: 14,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/70285e90-7108-4145-9119-7d6333338aec",
    category: "Wedding",
    title: "Timeless Moment"
  },
  {
    id: 15,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/417629d8-cb25-463e-9534-0b380f2865e4",
    category: "Wedding",
    title: "Ceremonial Joy"
  },
  {
    id: 16,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/5765e692-1a35-448d-99ea-06286638d7a1",
    category: "Portrait",
    title: "Couple's Portrait"
  },
  {
    id: 17,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/352d8519-c6e7-420f-b925-0d931e032895",
    category: "Wedding",
    title: "Intimate Moment"
  },
  {
    id: 18,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/21bdc6b9-6f08-4555-adac-4afe563df4eb",
    category: "Portrait",
    title: "Groom's Style"
  },
  {
    id: 19,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/ceaedea7-f32b-4f66-815a-7306017f2c9b",
    category: "Wedding",
    title: "Beach Romance"
  },
  {
    id: 20,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/cd09934d-f8eb-49cf-8497-0fab26403798",
    category: "Wedding",
    title: "Seaside Joy"
  },
  {
    id: 21,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/9ac3b742-dbab-4c49-9988-ab8b57f0c9d2",
    category: "Portrait",
    title: "Artistic Shadow"
  },
  {
    id: 22,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/b6c8f5ec-5c13-4850-a7b8-c25eecf18d08",
    category: "Wedding",
    title: "Elegant Couple"
  },
  {
    id: 23,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/246afbec-b7a9-400f-b1d3-01163976b097",
    category: "Wedding",
    title: "Intimate Moment"
  },
  {
    id: 24,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/6b496982-5ee4-40c8-afa2-d09aaf3c015b",
    category: "Wedding",
    title: "Joyful Couple"
  },
  {
    id: 25,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/d1c9679b-77cb-45f0-ace8-105bc558d983",
    category: "Wedding",
    title: "Traditional Moment"
  },
  {
    id: 26,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/11be9199-6ccc-468c-a319-017be442f177",
    category: "Wedding",
    title: "Ceremonial Smile"
  },
  {
    id: 27,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/97c57884-bb2e-4424-8f41-5a4dc9bc057f",
    category: "Portrait",
    title: "Beach Romance"
  },
  {
    id: 28,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/1cc374bc-424d-4241-9bad-a32bb0bf29d6",
    category: "Portrait",
    title: "Seaside Walk"
  },
  {
    id: 29,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/efe55dcd-1703-4d61-b306-a63de30bd196",
    category: "Wedding",
    title: "Romantic Gaze"
  },
  {
    id: 30,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/92b5380c-009e-4fb9-be40-939d416949e7",
    category: "Wedding",
    title: "Loving Glance"
  },
  {
    id: 31,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/cb8f7625-4491-4694-8d51-1a40bc79b120",
    category: "Wedding",
    title: "First Dance"
  },
  {
    id: 32,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/caf97ecb-08fe-47ff-9191-5e9ca7928fef",
    category: "Portrait",
    title: "Close Embrace"
  },
  {
    id: 33,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/d15b2502-a9c6-4782-b9ad-9970d7a38ed5",
    category: "Wedding",
    title: "Together Forever"
  },
  {
    id: 34,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/4cbc9760-eca0-4e9d-b0e5-9d8491adee3b",
    category: "Wedding",
    title: "Captured Moment"
  },
  {
    id: 35,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/bd734005-6366-4148-bd99-979beeba239d",
    category: "Portrait",
    title: "Timeless Memory"
  },
  {
    id: 36,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/c9e36912-2911-449d-9b47-c786d4cc99c7",
    category: "Event",
    title: "Joyful Celebration"
  },
  {
    id: 37,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/0faf31a6-87c5-43dc-8360-174ca1456c6f",
    category: "Wedding",
    title: "Elegant Detail"
  },
  {
    id: 38,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/c8488970-089d-4a67-93f4-0912ef717932",
    category: "Portrait",
    title: "Beautiful Smile"
  },
  {
    id: 39,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/b1d8c8b7-0cbb-4c08-b9aa-093d5f6a2af8",
    category: "Wedding",
    title: "Joyful Walk"
  },
  {
    id: 40,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/23bcd895-71fd-4651-9960-188095d618e0",
    category: "Portrait",
    title: "Loving Gaze"
  },
  {
    id: 41,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/737b50a2-ceba-4090-b17c-d409b7980a2a",
    category: "Wedding",
    title: "Couple's Portrait"
  },
  {
    id: 42,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/2715621d-2af0-4ef8-ba2e-e16f07e95ca8",
    category: "Event",
    title: "Proposal Moment"
  },
  {
    id: 43,
    src: "https://harmless-tapir-303.convex.cloud/api/storage/f8d9b8ed-49a1-44f6-ae6f-ad2cacdce612",
    category: "Event",
    title: "She Said Yes"
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
    <section id="photo" className="py-6 md:py-24 px-4 bg-white relative overflow-hidden min-h-[50vh] md:min-h-screen flex items-center justify-center">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-zinc-50 to-zinc-100 opacity-80" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[90rem] mx-auto flex flex-col items-center gap-2 md:gap-12">
        
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

          {/* Navigation Controls (Internal - Desktop Hover / Mobile Touch) */}
          <div className="absolute inset-0 z-30 flex items-center justify-between px-2 md:px-4 pointer-events-none">
             {/* Left Arrow */}
             <div className="pointer-events-auto opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleManualPrev}
                  className="h-10 w-10 md:h-14 md:w-14 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md border border-white/10 transition-transform hover:scale-110 active:scale-95"
                >
                  <ArrowLeft className="w-5 h-5 md:w-8 md:h-8" />
                </Button>
             </div>

             {/* Right Arrow */}
             <div className="pointer-events-auto opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleManualNext}
                  className="h-10 w-10 md:h-14 md:w-14 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md border border-white/10 transition-transform hover:scale-110 active:scale-95"
                >
                  <ArrowRight className="w-5 h-5 md:w-8 md:h-8" />
                </Button>
             </div>
          </div>

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-30 p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          </div>

          {/* Explicit Bottom Right Full Screen Button */}
          <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6 z-40 flex items-center gap-3">
             <motion.div 
               initial={{ opacity: 0, x: 10 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5, duration: 0.5 }}
               className="flex items-center gap-2 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 shadow-lg pointer-events-none"
             >
               <span className="text-xs md:text-sm font-medium">View photos in full-screen mode</span>
               <motion.div
                 animate={{ x: [0, 4, 0] }}
                 transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
               >
                 <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
               </motion.div>
             </motion.div>

             <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 md:h-14 md:w-14 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 pointer-events-auto transition-transform hover:scale-110 active:scale-95 shadow-lg"
                onClick={handleImageClick}
              >
                <Expand className="w-5 h-5 md:w-8 md:h-8" />
              </Button>
          </div>
        </motion.div>

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
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 md:gap-6 p-2 md:p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl w-[90%] md:w-auto justify-between md:justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleManualPrev}
                className="text-white hover:bg-white/10 rounded-full shrink-0"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              
              <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
              
              <Button
                variant="ghost"
                onClick={handleManualNext}
                className="text-white hover:bg-white/10 rounded-full px-2 md:px-6 text-sm md:text-base whitespace-nowrap"
              >
                Change Photo
              </Button>

              <div className="h-8 w-[1px] bg-white/10 hidden md:block" />

              <Button
                variant="ghost"
                size="icon"
                onClick={handleManualNext}
                className="text-white hover:bg-white/10 rounded-full shrink-0"
              >
                <ArrowRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Bottom Right Minimize Button */}
            <div className="absolute bottom-8 right-8 z-50 hidden md:block">
               <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-transform hover:scale-110 active:scale-95"
                onClick={() => setIsFullScreen(false)}
              >
                <Minimize className="w-6 h-6" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}