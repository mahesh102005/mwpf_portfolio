import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

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
            VIDEOS
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Life isn't a still image. We make sure your memories move with you
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-5xl mx-auto aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-white/50 bg-white/30 backdrop-blur-md group"
        >
          {!isPlaying ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
              {/* Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-[2px]" />
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPlaying(true)}
                className="relative z-10 w-24 h-24 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/40 text-white transition-all duration-300 hover:scale-110 shadow-lg group-hover:shadow-xl"
              >
                <Play className="w-10 h-10 fill-white ml-1" />
              </Button>
              
              <div className="absolute bottom-8 left-0 right-0 text-center z-10">
                <p className="text-zinc-600 font-medium tracking-widest text-sm uppercase">
                  Watch Showreel
                </p>
              </div>
            </div>
          ) : (
            <iframe
              src="https://player.vimeo.com/video/1150366269?autoplay=1&title=0&byline=0&portrait=0"
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}