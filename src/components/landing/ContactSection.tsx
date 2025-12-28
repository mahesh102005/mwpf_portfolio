import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Mail, Menu, Sparkles } from "lucide-react";

const WhatsApp = (props: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

export function ContactSection() {
  return (
    <section id="contact" className="py-12 md:py-24 px-4 bg-background flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[95%] md:max-w-[1400px] relative overflow-hidden rounded-[2.5rem] bg-white md:bg-gradient-to-br md:from-zinc-900 md:via-black md:to-zinc-950 border border-black/5 md:border-white/5 shadow-2xl"
      >
        {/* Ambient Lighting Effects */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-black/5 md:bg-white/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
        
        {/* Glass Overlay */}
        <div className="absolute inset-0 bg-black/[0.02] md:bg-white/[0.02] backdrop-blur-[1px] pointer-events-none" />

        <div className="relative z-10 flex flex-col min-h-[800px] p-8 md:p-16 justify-between">
          
          {/* Top Row */}
          <div className="flex justify-between items-start w-full">
            <div className="hidden md:block" /> {/* Spacer for center alignment */}
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 md:bg-white/5 border border-black/10 md:border-white/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium tracking-widest uppercase text-zinc-600 md:text-white/70">Available to work</span>
            </div>

            <Button variant="ghost" size="icon" className="text-black/50 md:text-white/50 hover:text-black md:hover:text-white hover:bg-black/10 md:hover:bg-white/10 rounded-full">
              <Menu className="w-6 h-6" />
            </Button>
          </div>

          {/* Center Content */}
          <div className="flex flex-col items-center text-center space-y-8 my-12 md:my-0">
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-black md:text-white drop-shadow-2xl">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-black/80 to-black/50 md:from-white md:via-white/80 md:to-white/50">Connect</span>
            </h2>
            
            <p className="text-lg md:text-xl text-zinc-600 md:text-zinc-400 max-w-lg font-light leading-relaxed">
              Feel free to contact us for projects, collaborations, or inquiries.
              We craft visual stories that matter.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="h-16 px-10 rounded-full bg-black text-white hover:bg-zinc-800 md:bg-white md:text-black md:hover:bg-zinc-200 border-4 border-black/5 md:border-white/10 shadow-[0_0_40px_-10px_rgba(0,0,0,0.1)] md:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-300 group text-lg font-medium"
                onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="mr-2 p-1 bg-white text-black md:bg-black md:text-white rounded-full">
                  <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </span>
                Book a Meeting
              </Button>
            </motion.div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-black/5 md:border-white/5">
            
            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-zinc-500 font-medium">
              <p>&copy; mwp {new Date().getFullYear()}</p>
              <a href="#" className="hover:text-black md:hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black md:hover:text-white transition-colors">Legal Notice</a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {[Mail, WhatsApp, Instagram].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-12 h-12 rounded-full bg-black/5 md:bg-white/5 border border-black/10 md:border-white/10 flex items-center justify-center text-zinc-600 md:text-zinc-400 hover:bg-black md:hover:bg-white hover:text-white md:hover:text-black hover:scale-110 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}