import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand, Film, Play, X, MonitorPlay } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";

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

  return (
    <section id="video" className="relative min-h-screen w-full overflow-hidden bg-white py-20">
      {/* Background Elements - Adjusted for white theme */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-100 via-white to-white opacity-80" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-foreground">
            Visual Stories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Cinematic moments captured in motion. Experience the emotion and beauty of your special day.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto aspect-video">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer border border-white/50 bg-white/30 backdrop-blur-md"
              onClick={handleVideoClick}
              onMouseEnter={handleInteraction}
              onMouseMove={handleInteraction}
            >
              {/* Video Thumbnail */}
              <img
                src={videos[currentIndex].thumbnail}
                alt={videos[currentIndex].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Overlay - Adjusted for better visibility on hover */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

              {/* Navigation Arrows (Hover) */}
              <div className="absolute inset-y-0 left-0 w-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => { e.stopPropagation(); handleManualPrev(e); }}
                  className="p-3 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 w-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => { e.stopPropagation(); handleManualNext(e); }}
                  className="p-3 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Full Screen Modal */}
        <AnimatePresence>
          {isFullScreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            >
              <button
                onClick={handleCloseFullScreen}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative w-full max-w-7xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10">
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50">
                    <Play className="w-16 h-16 mb-4 opacity-50" />
                    <p className="text-lg">Video Source Empty</p>
                    <p className="text-sm opacity-70">({videos[currentIndex].title})</p>
                 </div>
                 
                 {/* Controls */}
                 <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{videos[currentIndex].title}</h3>
                      <p className="text-white/70">{videos[currentIndex].category}</p>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={(e) => handleManualPrev(e)} className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                      </button>
                      <button onClick={(e) => handleManualNext(e)} className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                        <ArrowRight className="w-6 h-6" />
                      </button>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}