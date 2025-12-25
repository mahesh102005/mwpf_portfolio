import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand, Film, Play, X, MonitorPlay } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";

const videos = [
  {
    id: 1,
    title: "Cinematic Wedding Highlight",
    category: "Wedding Films",
    thumbnail: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=2070&auto=format&fit=crop",
    videoUrl: "" // Empty for now as requested
  },
  {
    id: 2,
    title: "Pre-Wedding Love Story",
    category: "Love Stories",
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    videoUrl: ""
  },
  {
    id: 3,
    title: "Aerial Drone Cinematography",
    category: "Drone",
    thumbnail: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=2069&auto=format&fit=crop",
    videoUrl: ""
  },
  {
    id: 4,
    title: "Event Highlights",
    category: "Events",
    thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
    videoUrl: ""
  }
];

export function VideoSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const nextVideo = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  }, []);

  const prevVideo = useCallback(() => {
    setDirection(-1);
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
    setIsAutoPlaying(false); // Stop auto-play when entering full screen
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
    handleInteraction(); // Will resume auto-play after delay
  };

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying || isFullScreen) return;

    const timer = setInterval(() => {
      nextVideo();
    }, 6000); // 6 seconds interval

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

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1,
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
      scale: 0.9,
    })
  };

  return (
    <section id="video" className="py-24 px-4 bg-zinc-950 relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Cinematic Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black opacity-80" />
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[90rem] mx-auto flex flex-col items-center gap-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 text-primary/80 mb-2"
          >
            <Film className="w-6 h-6" />
            <span className="uppercase tracking-[0.2em] text-sm font-medium">Cinematography</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
          >
            Visual <span className="text-primary font-serif italic">Stories</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-lg mx-auto"
          >
            Capturing emotions in motion. Experience our cinematic films.
          </motion.p>
        </div>

        {/* Main Video Panel */}
        <motion.div 
          className="relative group w-full max-w-5xl aspect-video rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm"
          onMouseEnter={handleInteraction}
          onMouseMove={handleInteraction}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Vignette & Overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] rounded-[2rem]" />
          <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
          
          {/* Video/Thumbnail Slider */}
          <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
            <AnimatePresence initial={false} custom={direction}>
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
                className="absolute inset-0 w-full h-full"
              >
                <img 
                  src={videos[currentIndex].thumbnail} 
                  alt={videos[currentIndex].title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Play Button */}
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer pointer-events-auto group/play hover:bg-primary/90 hover:border-primary transition-all duration-300 shadow-lg"
              onClick={handleVideoClick}
            >
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1 group-hover/play:text-black group-hover/play:fill-black transition-colors" />
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-0 z-30 flex items-center justify-between px-4 md:px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleManualPrev}
              className="h-14 w-14 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 pointer-events-auto transition-transform hover:scale-110"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleManualNext}
              className="h-14 w-14 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 pointer-events-auto transition-transform hover:scale-110"
            >
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-30 p-6 md:p-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="flex items-end justify-between">
              <div className="text-left">
                <motion.p 
                  key={`cat-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-primary font-medium text-sm tracking-wider uppercase mb-1"
                >
                  {videos[currentIndex].category}
                </motion.p>
                <motion.h3 
                  key={`title-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl md:text-3xl font-bold text-white"
                >
                  {videos[currentIndex].title}
                </motion.h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex pointer-events-auto text-white/70 hover:text-white hover:bg-white/10 gap-2 border border-white/10 rounded-full px-4"
                onClick={handleVideoClick}
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
            className="h-12 px-8 rounded-full bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-primary backdrop-blur-md transition-all hover:scale-105 shadow-lg"
            onClick={handleManualNext}
          >
            <MonitorPlay className="w-4 h-4 mr-2" />
            Change Video
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
              className="absolute top-6 right-6 z-50 text-white/50 hover:text-white hover:bg-white/10 rounded-full h-12 w-12 border border-white/10"
              onClick={handleCloseFullScreen}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Main Content */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="w-full max-w-7xl aspect-video relative shadow-2xl bg-black rounded-xl overflow-hidden"
                >
                  {/* Placeholder for Video Player */}
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                     <img 
                      src={videos[currentIndex].thumbnail} 
                      alt={videos[currentIndex].title}
                      className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <Play className="w-10 h-10 text-white/50 fill-white/50 ml-1" />
                      </div>
                      <p className="text-white/50 font-light tracking-widest uppercase text-sm">Video Source Empty</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Floating Controls Panel */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 p-4 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-md shadow-2xl">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleManualPrev}
                className="text-white hover:bg-white/10 rounded-full hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              
              <div className="h-8 w-[1px] bg-white/10" />
              
              <div className="flex flex-col items-center px-4 min-w-[200px]">
                <span className="text-xs text-zinc-400 uppercase tracking-wider">{videos[currentIndex].category}</span>
                <span className="text-sm font-medium text-white truncate max-w-[200px]">{videos[currentIndex].title}</span>
              </div>

              <div className="h-8 w-[1px] bg-white/10" />

              <Button
                variant="ghost"
                size="icon"
                onClick={handleManualNext}
                className="text-white hover:bg-white/10 rounded-full hover:text-primary transition-colors"
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