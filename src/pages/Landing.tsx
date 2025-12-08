import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Camera, Film, Mail, Play, Send, Twitter, Linkedin, Instagram, ArrowRight, Sparkles, Aperture, Facebook, Phone } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export default function Landing() {
  const submitContact = useMutation(api.contacts.submit);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await submitContact({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
        type: "booking",
      });
      toast.success("Message sent successfully!");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-sans text-foreground selection:bg-primary/30 bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
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
                Workshop
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

      {/* Video Section */}
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

      {/* Photo Section */}
      <section id="photo" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3 text-white">
              <Camera className="w-8 h-8 text-primary" /> Photography
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Freezing time, one shutter click at a time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1520854221256-17451cc330e7?q=80&w=800&auto=format&fit=crop"
            ].map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer bg-black/40"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="text-black font-bold text-xl">Project Name</p>
                  <p className="text-black/80 text-sm font-medium">Category</p>
                </div>
                <img 
                  src={src} 
                  alt={`Gallery ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative bg-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-3xl blur-2xl opacity-20 transform rotate-3" />
                <img 
                  src="https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=1000&auto=format&fit=crop" 
                  alt="Photographer" 
                  className="relative rounded-3xl border border-white/10 shadow-2xl w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 space-y-6"
            >
              <h2 className="text-4xl font-bold text-white">About <span className="text-primary">mwp</span></h2>
              <div className="h-1 w-20 bg-primary rounded-full" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                I am a passionate photographer and videographer dedicated to capturing the essence of every moment. With a keen eye for detail and a love for storytelling, I strive to create visual masterpieces that resonate with emotion and beauty.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether it's a wedding, a corporate event, or a personal portrait session, I bring creativity and professionalism to every project. Let's work together to create something unforgettable.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm">
                  <h3 className="text-3xl font-bold text-primary">5+</h3>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm">
                  <h3 className="text-3xl font-bold text-primary">100+</h3>
                  <p className="text-sm text-muted-foreground">Projects Completed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form" className="py-24 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Book a Session</h2>
            <p className="text-muted-foreground">Ready to start your project? Fill out the form below.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium ml-1 text-white">Name</label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Your Name" 
                    required 
                    className="bg-white/5 border-white/10 focus:border-primary/50 h-12 rounded-xl text-white placeholder:text-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium ml-1 text-white">Email</label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    required 
                    className="bg-white/5 border-white/10 focus:border-primary/50 h-12 rounded-xl text-white placeholder:text-white/30"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium ml-1 text-white">Message</label>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Tell me about your project..." 
                  required 
                  className="bg-white/5 border-white/10 focus:border-primary/50 min-h-[150px] rounded-xl resize-none text-white placeholder:text-white/30"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-12 rounded-xl text-lg font-bold bg-primary text-black hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>Send Message <Send className="ml-2 w-4 h-4" /></>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
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
    </div>
  );
}