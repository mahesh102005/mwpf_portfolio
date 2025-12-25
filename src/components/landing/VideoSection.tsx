import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Play, X, Maximize2, Film, MonitorPlay } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

const videos = [
  {
    id: 1,
    title: "Cinematic Wedding Highlights",
    category: "Wedding Films",
    thumbnail: "https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=2076&auto=format&fit=crop",
    videoUrl: "", // Placeholder
  },
  {
    id: 2,
    title: "Pre-Wedding Story",
    category: "Love Stories",
    thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop",
    videoUrl: "", // Placeholder
  },
  {
    id: 3,
    title: "Traditional Ceremony",
    category: "Cultural Events",
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    videoUrl: "", // Placeholder
  },
];

export function VideoSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const nextVideo = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  }, []);

  const prevVideo = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, []);

  const handleInteraction = useCallback(() => {
    setIsAutoPlaying(false);
    
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = setTimeout(() => {
      if (!isFullScreen) {
        setIsAutoPlaying(true);
      }
    }, 5000); // Resume after 5 seconds of inactivity
  }, [isFullScreen]);

  const handleManualNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    handleInteraction();
    nextVideo();
  };

  const handleManualPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    handleInteraction();
    prevVideo();
  };

  const handleVideoClick = () => {
    handleInteraction();
    setIsFullScreen(true);
    setIsAutoPlaying(false);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
    handleInteraction();
  };

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying || isFullScreen) return;

    const timer = setInterval(() => {
      nextVideo();
    }, 6000); // Switch every 6 seconds

    return () => clearInterval(timer);
  }, [isAutoPlaying, isFullScreen, nextVideo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleManualNext();
      if (e.key === "ArrowLeft") handleManualPrev();
      if (e.key === "Escape") handleCloseFullScreen();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextVideo, prevVideo]);

  return (
    <section id="video" className="relative w-full overflow-hidden bg-neutral-950 py-20 md:py-32">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black opacity-80" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 flex flex-col justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 text-white">
            Visual <span className="text-primary/80">Stories</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
            Cinematic moments captured in motion. Experience the emotion and beauty of your special day through our lens.
          </p>
        </motion.div>

        {/* Main Video Panel */}
        <div className="relative max-w-6xl mx-auto w-full">
          <div className="relative aspect-video w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full cursor-pointer"
                onClick={handleVideoClick}
              >
                {/* Thumbnail */}
                <img
                  src={videos[currentIndex].thumbnail}
                  alt={videos[currentIndex].title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play className="w-6 h-6 md:w-10 md:h-10 text-white fill-white ml-1" />
                  </div>
                </div>

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-primary/90 font-medium tracking-wider uppercase text-sm md:text-base mb-2">
                      {videos[currentIndex].category}
                    </p>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                      {videos[currentIndex].title}
                    </h3>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons (Desktop/Tablet) */}
            <div className="absolute inset-y-0 left-4 md:left-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <button
                onClick={(e) => { e.stopPropagation(); handleManualPrev(e); }}
                className="p-3 md:p-4 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all pointer-events-auto transform hover:scale-105"
              >
                <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-4 md:right-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <button
                onClick={(e) => { e.stopPropagation(); handleManualNext(e); }}
                className="p-3 md:p-4 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all pointer-events-auto transform hover:scale-105"
              >
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation & Controls Below Panel */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-6 md:mt-8 gap-4">
            <div className="flex items-center gap-4 md:hidden">
              <Button
                variant="outline"
                size="icon"
                onClick={handleManualPrev}
                className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <span className="text-white/50 text-sm">
                {currentIndex + 1} / {videos.length}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleManualNext}
                className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <Button
              onClick={handleManualNext}
              variant="outline"
              className="w-full md:w-auto px-8 py-6 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-primary transition-all group"
            >
              <Film className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
              Change Video
            </Button>
            
            <div className="hidden md:flex items-center gap-2 text-white/30 text-sm font-mono">
              <span>{String(currentIndex + 1).padStart(2, '0')}</span>
              <div className="w-12 h-[1px] bg-white/20" />
              <span>{String(videos.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Full Screen Modal */}
        <AnimatePresence>
          {isFullScreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-0 md:p-10"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseFullScreen}
                className="absolute top-4 right-4 md:top-8 md:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 group"
              >
                <X className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full h-full md:max-w-7xl md:aspect-video bg-black md:rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
              >
                 {/* Video Placeholder Content */}
                 <div className="flex-1 relative bg-neutral-900 flex items-center justify-center overflow-hidden">
                    <img 
                      src={videos[currentIndex].thumbnail} 
                      alt="Background" 
                      className="absolute inset-0 w-full h-full object-cover opacity-20 blur-3xl"
                    />
                    
                    <div className="relative z-10 flex flex-col items-center justify-center text-white/50 p-4 text-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 animate-pulse">
                          <Play className="w-8 h-8 md:w-10 md:h-10 opacity-50 fill-white/50" />
                        </div>
                        <p className="text-xl md:text-2xl font-light tracking-wide text-white mb-2">Video Source Empty</p>
                        <p className="text-sm md:text-base text-white/40">Placeholder for: {videos[currentIndex].title}</p>
                    </div>
                 </div>
                 
                 {/* Full Screen Controls */}
                 <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                      <div className="w-full md:w-auto">
                        <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">{videos[currentIndex].category}</p>
                        <h3 className="text-2xl md:text-4xl font-bold text-white">{videos[currentIndex].title}</h3>
                      </div>
                      
                      <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-6">
                        <button 
                          onClick={(e) => handleManualPrev(e)} 
                          className="p-3 md:p-4 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all"
                        >
                          <ArrowLeft className="w-6 h-6" />
                        </button>
                        
                        <Button
                          onClick={handleManualNext}
                          variant="outline"
                          className="hidden md:flex px-6 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/20"
                        >
                          Change Video
                        </Button>

                        <button 
                          onClick={(e) => handleManualNext(e)} 
                          className="p-3 md:p-4 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all"
                        >
                          <ArrowRight className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                 </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}