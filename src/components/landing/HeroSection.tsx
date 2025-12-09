import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Facebook, Instagram, Phone, Twitter } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-[#1a1a1a]">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* Yellow Diagonal Background Shape */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-primary skew-x-[-15deg] translate-x-[20%] z-0 hidden lg:block" />
      
      {/* Content Container */}
      <div className="container mx-auto px-4 z-10 relative h-full flex flex-col justify-center min-h-[80vh]">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 text-center lg:text-left pt-10 lg:pt-0"
          >
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[0.9] mb-2 tracking-tight">
              PHOTOGRAPHY
            </h1>
            <h2 className="text-5xl md:text-7xl font-serif text-primary italic mb-12 transform -rotate-2 origin-left inline-block">
              Capturing moment
            </h2>

            <div className="flex flex-col items-center lg:items-start gap-2 mb-12 text-sm tracking-[0.2em] uppercase text-white/70 font-medium">
              <p>Nov. 10, 2025 <span className="mx-2">|</span> 10 AM</p>
              <p>At Building Name, Country</p>
            </div>

            <Button 
              size="lg" 
              className="rounded-full text-sm tracking-[0.15em] px-10 py-7 bg-primary hover:bg-primary/90 text-black font-bold shadow-lg hover:shadow-xl transition-all uppercase"
              onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Register Now
            </Button>

            <p className="mt-12 text-white/50 text-xs tracking-[0.2em] uppercase">
              Contact 1400 555 8888
            </p>
          </motion.div>

          {/* Right Image Composition */}
          <div className="lg:col-span-6 relative h-[500px] lg:h-[700px] w-full hidden md:block">
            {/* Main Lens */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:translate-x-0 lg:-translate-y-1/2 z-20"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-black border-[10px] border-[#222] shadow-2xl flex items-center justify-center overflow-hidden">
                 {/* Lens Reflection Effect */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-30 rounded-full"></div>
                 <img 
                  src="https://images.unsplash.com/photo-1616423664045-60dd55b87d36?q=80&w=1000&auto=format&fit=crop" 
                  alt="Camera Lens" 
                  className="w-full h-full object-cover scale-150"
                />
                <div className="absolute inset-0 border-[20px] border-black/50 rounded-full z-20"></div>
                
                {/* Lens Text Ring */}
                <div className="absolute inset-4 border border-white/20 rounded-full z-20 flex items-center justify-center">
                   <span className="absolute top-2 text-[8px] text-white/60 tracking-widest">24-105mm 1:4</span>
                   <span className="absolute bottom-2 text-[8px] text-white/60 tracking-widest rotate-180">LENS</span>
                </div>
              </div>
            </motion.div>

            {/* Tripod Head (Bottom Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -50, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-10 left-0 lg:-left-10 z-10"
            >
               <img 
                  src="https://images.unsplash.com/photo-1589872378322-6e925580d5a7?q=80&w=300&auto=format&fit=crop" 
                  alt="Tripod" 
                  className="w-32 h-32 object-cover rounded-xl grayscale opacity-60 hover:opacity-100 transition-opacity mask-image-gradient"
                  style={{ maskImage: 'radial-gradient(circle, black 50%, transparent 100%)' }}
                />
            </motion.div>

            {/* Remote (Bottom Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 50, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-0 right-0 lg:right-10 z-30"
            >
              <div className="bg-[#222] p-4 rounded-xl border border-white/10 shadow-2xl transform rotate-12">
                <div className="w-24 h-32 bg-black rounded-lg flex flex-col items-center justify-center gap-2 p-2">
                  <div className="w-full h-1/2 bg-[#333] rounded flex items-center justify-center text-[8px] text-white/50 font-mono">
                    ALL 1 2 3 4
                  </div>
                  <div className="grid grid-cols-2 gap-1 w-full">
                    <div className="h-8 bg-[#333] rounded"></div>
                    <div className="h-8 bg-[#333] rounded"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Lens Cap (Bottom Center) */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10"
            >
              <div className="w-24 h-24 rounded-full bg-[#111] border border-white/5 shadow-xl flex items-center justify-center">
                <div className="w-20 h-4 bg-[#222] rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Socials */}
        <div className="absolute bottom-8 left-4 lg:left-8 flex items-center gap-4 text-primary">
          <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          <Phone className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          <span className="text-[10px] text-white/40 ml-4 tracking-wider">© Company Name 2020. All rights reserved.</span>
        </div>
      </div>
    </section>
  );
}