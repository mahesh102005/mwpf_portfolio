import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useState, useCallback } from "react";

const videos = [
  {
    id: 1,
    title: "Cinematic Wedding Highlights",
    category: "Wedding Films",
    // Using the Google Drive preview link for embedding
    videoUrl: "https://drive.google.com/file/d/1zbV8NjOu8dlA_HhY_XFRKl7PJ7-MbHCz/preview",
    thumbnail: "https://harmless-tapir-303.convex.cloud/api/storage/1f4f90b5-0f53-43c4-9662-c8378ed0a32b",
  },
  {
    id: 2,
    title: "Pre-Wedding Story",
    category: "Love Stories",
    // Duplicate for demo purposes since only one link was provided
    videoUrl: "https://drive.google.com/file/d/1zbV8NjOu8dlA_HhY_XFRKl7PJ7-MbHCz/preview",
    thumbnail: "https://harmless-tapir-303.convex.cloud/api/storage/1f4f90b5-0f53-43c4-9662-c8378ed0a32b",
  },
  {
    id: 3,
    title: "Traditional Ceremony",
    category: "Cultural Events",
    // Duplicate for demo purposes
    videoUrl: "https://drive.google.com/file/d/1zbV8NjOu8dlA_HhY_XFRKl7PJ7-MbHCz/preview",
    thumbnail: "https://harmless-tapir-303.convex.cloud/api/storage/1f4f90b5-0f53-43c4-9662-c8378ed0a32b",
  },
];

export function VideoSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState(0);

  const nextVideo = useCallback(() => {
    setDirection(1);
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
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
    <section id="video" className="py-24 px-4 bg-white relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Ambient Background - Matching PhotoSection */}
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
            VIDEOS
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 max-w-lg mx-auto"
          >
            Life isn't a still image. We make sure your memories move with you
          </motion.p>
        </div>

        {/* Main Video Panel */}
        <motion.div 
          className="relative group w-full max-w-5xl mx-auto aspect-video rounded-[2rem] overflow-hidden bg-white/30 border border-white/50 shadow-2xl backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Video/Thumbnail Container */}
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-black">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              {!isPlaying ? (
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
                    className="w-full h-full object-cover opacity-80"
                  />
                  
                  {/* Glass Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePlay}
                      className="group/play relative flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-300 hover:bg-white/20"
                    >
                      <div className="absolute inset-0 rounded-full bg-white/5 blur-md" />
                      <Play className="w-10 h-10 text-white fill-white ml-1 relative z-10" />
                    </motion.button>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-2xl font-bold text-white mb-1">{videos[currentIndex].title}</h3>
                    <p className="text-white/70">{videos[currentIndex].category}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full"
                >
                  <iframe
                    src={videos[currentIndex].videoUrl}
                    className="w-full h-full"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title={videos[currentIndex].title}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom Controls */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="h-12 px-8 rounded-full bg-white/80 border-zinc-200 text-zinc-900 hover:bg-white hover:text-primary backdrop-blur-md transition-all hover:scale-105 shadow-sm"
            onClick={nextVideo}
          >
            Next Video
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

      </div>
    </section>
  );
}