import { motion } from "framer-motion";

export function AboutSection() {
  return (
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
                src="https://harmless-tapir-303.convex.cloud/api/storage/06f46d55-88a9-47c1-a440-d55eefa6b1ee" 
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
            <h2 className="text-4xl font-bold text-white">About <span className="text-primary">MWPF TEAM</span></h2>
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
  );
}