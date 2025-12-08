import { motion } from "framer-motion";
import { Film, Play } from "lucide-react";

export function VideoSection() {
  return (
    <section id="video" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3 text-white">
            <Film className="w-8 h-8 text-primary" /> Video Production
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cinematic storytelling that brings your vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: item * 0.1 }}
              className="group relative aspect-video rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-xl"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-6 h-6 fill-black text-black ml-1" />
                </div>
              </div>
              <img 
                src={`https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop`} 
                alt="Video Thumbnail" 
                className="w-full h-full object-cover -z-10 opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
