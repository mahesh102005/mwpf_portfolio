import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-black/10 group">
              <img 
                src="/assets/about/team.jpg" 
                alt="MWPF Team" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold mb-6 text-primary tracking-tight whitespace-nowrap">
              About <span className="text-primary">MWPF TEAM</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed font-light">
              We are a passionate team of photographers and videographers dedicated to capturing the essence of every moment. With a keen eye for detail and a love for storytelling, we strive to create visual masterpieces that resonate with emotion and beauty.
            </p>
            <p className="text-muted-foreground/80 mb-8 leading-relaxed font-light">
              Whether it's a wedding, a corporate event, or a personal portrait session, we bring creativity and professionalism to every project. Let's work together to create something unforgettable.
            </p>

            <div className="grid grid-cols-2 gap-8 mt-8">
              <div className="p-6 rounded-xl bg-secondary/30 border border-black/5 backdrop-blur-sm hover:border-primary/30 transition-colors">
                <h3 className="text-4xl font-bold text-primary mb-2">5+</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Years Experience</p>
              </div>
              <div className="p-6 rounded-xl bg-secondary/30 border border-black/5 backdrop-blur-sm hover:border-primary/30 transition-colors">
                <h3 className="text-4xl font-bold text-primary mb-2">200+</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Projects Completed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}