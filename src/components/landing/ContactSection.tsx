import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Linkedin, Mail, Sparkles, Twitter } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 relative min-h-[60vh] flex flex-col justify-between bg-black">
      <div className="container mx-auto px-4 flex-1 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <p className="text-muted-foreground italic font-serif text-lg">Available to work</p>
          
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
            Let's <span className="text-primary">Connect</span>
          </h2>
          
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            Feel free to contact me if having any questions.
            <br />
            I'm available for new projects or just for chatting.
          </p>

          <div className="pt-8">
            <Button 
              size="lg" 
              className="rounded-full h-16 px-8 text-lg bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-all group text-white"
              onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="bg-primary text-black rounded-full p-1 mr-3">
                <Sparkles className="w-4 h-4" />
              </div>
              Book a Meeting
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 mt-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10 text-sm text-muted-foreground">
          <div className="flex items-center gap-6">
            <p>&copy; mwp, {new Date().getFullYear()}</p>
            <a href="#" className="hover:text-primary transition-colors">Legal Notice</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          </div>
          
          <div className="flex items-center gap-4">
            {[Mail, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all text-white"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
