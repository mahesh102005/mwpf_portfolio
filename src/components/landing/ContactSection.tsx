import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Mail, Sparkles } from "lucide-react";

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
    <section id="contact" className="py-12 md:py-24 px-4 bg-black flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[95%] md:max-w-[1400px] relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-white/5 shadow-2xl"
      >
        {/* Ambient Lighting Effects */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
        
        {/* Glass Overlay */}
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[1px] pointer-events-none" />

        <div className="relative z-10 flex flex-col min-h-[800px] p-8 md:p-16 justify-between">
          
          {/* Top Row */}
          <div className="flex justify-center items-start w-full">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium tracking-widest uppercase text-white/70">Available to work</span>
            </div>
          </div>

          {/* Center Content */}
          <div className="flex flex-col items-center text-center space-y-8 my-12 md:my-0">
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white drop-shadow-2xl">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/50">Connect</span>
            </h2>
            
            <p className="text-lg md:text-xl text-zinc-400 max-w-lg font-light leading-relaxed">
              Feel free to contact us for projects, collaborations, or inquiries.
              We craft visual stories that matter.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="https://wa.me/919075178415"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    size="lg" 
                    className="h-16 px-10 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 border-4 border-white/10 shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)] transition-all duration-300 group text-lg font-medium"
                  >
                    <span className="mr-2 p-1 bg-white/10 text-white rounded-full">
                      <WhatsApp className="w-4 h-4" />
                    </span>
                    WhatsApp
                  </Button>
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="h-16 px-10 rounded-full bg-white text-black hover:bg-zinc-200 border-4 border-white/10 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-300 group text-lg font-medium"
                  onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="mr-2 p-1 bg-black text-white rounded-full">
                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </span>
                  Book a Meeting
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/5">
            
            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-zinc-500 font-medium">
              <p>&copy; mwpf 2025</p>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Legal Notice</a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Mail, href: "mailto:mauliweddingphotography@gmail.com" },
                { Icon: WhatsApp, href: "https://wa.me/919075178415" },
                { Icon: Instagram, href: "https://www.instagram.com/mwpf.in?igsh=ZWZodWJnOG43ZnNu&utm_source=qr" }
              ].map(({ Icon, href }, i) => (
                <a 
                  key={i} 
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
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