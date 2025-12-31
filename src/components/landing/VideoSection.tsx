import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Play, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState, useCallback } from "react";
import { videos } from "@/lib/videos";
import { useIsMobile } from "@/hooks/use-mobile";

export function VideoSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState(0);
  const isMobile = useIsMobile();

  const nextVideo = useCallback(() => {
>>>>>>> REPLACE
<<<<<<< SEARCH
                    {/* Glass Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="flex items-center gap-3 md:gap-6">
                        <motion.div 
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="flex items-center gap-2 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 shadow-lg pointer-events-none"
                        >
                          <span className="text-xs md:text-sm font-medium">Click to Play</span>
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                          >
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                          </motion.div>
                        </motion.div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handlePlay}
                          className="group/play relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-300 hover:bg-white/20 cursor-pointer"
                        >
                          <Play className="w-6 h-6 md:w-10 md:h-10 text-white fill-white ml-1" />
                        </motion.button>
                      </div>
                    </div>
=======
                    {/* Glass Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="flex items-center gap-3 md:gap-6">
                        {/* Hide 'Click to Play' label on mobile to prevent multiple button confusion */}
                        {!isMobile && (
                          <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="flex items-center gap-2 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 shadow-lg pointer-events-none"
                          >
                            <span className="text-xs md:text-sm font-medium">Click to Play</span>
                            <motion.div
                              animate={{ x: [0, 4, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            >
                              <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                            </motion.div>
                          </motion.div>
                        )}

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handlePlay}
                          className="group/play relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-300 hover:bg-white/20 cursor-pointer z-30"
                          aria-label="Play Video"
                        >
                          <Play className="w-6 h-6 md:w-10 md:h-10 text-white fill-white ml-1" />
                        </motion.button>
                      </div>
                    </div>
    setDirection(1);
    setIsPlaying(false);
    setIsLoading(false);
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  }, []);

  const prevVideo = useCallback(() => {
    setDirection(-1);
    setIsPlaying(false);
    setIsLoading(false);
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    setIsLoading(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

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
    <section id="video" className="py-4 md:py-24 px-4 bg-white relative overflow-hidden min-h-[50vh] md:min-h-screen flex items-center justify-center">
      {/* Ambient Background - Matching PhotoSection */}
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
            className="text-3xl md:text-6xl font-bold text-zinc-900 tracking-tight"
          >
            VIDEOS
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base text-zinc-500 max-w-lg mx-auto px-4"
          >
            Life isn't a still image. We make sure your memories move with you
          </motion.p>
        </div>

        {/* Main Video Panel */}
        <motion.div 
          className="relative group w-full max-w-5xl mx-auto aspect-video rounded-[2rem] overflow-hidden bg-white/30 border-2 border-zinc-300 md:border md:border-white/50 shadow-2xl backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prevVideo(); }}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 h-14 w-14 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextVideo(); }}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 h-14 w-14 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
            aria-label="Next video"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Video/Thumbnail Container */}
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-black">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
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
                className="absolute inset-0 w-full h-full z-10"
              >
                {!isPlaying ? (
                  <div className="w-full h-full relative">
                    <img
                      src={videos[currentIndex].thumbnail}
                      alt={videos[currentIndex].title}
                      className="w-full h-full object-cover opacity-80"
                      loading="lazy"
                    />
                    
                    {/* Glass Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="flex items-center gap-3 md:gap-6">
                        <motion.div 
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="flex items-center gap-2 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 shadow-lg pointer-events-none"
                        >
                          <span className="text-xs md:text-sm font-medium">Click to Play</span>
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                          >
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                          </motion.div>
                        </motion.div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handlePlay}
                          className="group/play relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-300 hover:bg-white/20 cursor-pointer"
                        >
                          <Play className="w-6 h-6 md:w-10 md:h-10 text-white fill-white ml-1" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                      <h3 className="text-lg md:text-2xl font-bold text-white mb-1">{videos[currentIndex].title}</h3>
                      <p className="text-xs md:text-base text-white/70">{videos[currentIndex].category}</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full relative bg-black">
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <Loader2 className="w-12 h-12 text-white animate-spin" />
                      </div>
                    )}
                    <iframe
                      src={`${videos[currentIndex].videoUrl}`}
                      className="absolute top-1/2 left-1/2 w-[108%] h-[108%] -translate-x-1/2 -translate-y-1/2 z-20"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      onLoad={handleIframeLoad}
                      title={videos[currentIndex].title}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}