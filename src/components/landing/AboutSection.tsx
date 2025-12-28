import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Ambient Background - adjusted for white theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-zinc-50 to-zinc-100 opacity-80" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Image Side */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=2000&auto=format&fit=crop"
              alt="Photographer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>

        {/* Content Side */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
              About <span className="text-primary">MWPF TEAM</span>
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
          </div>

          <div className="space-y-6 text-lg text-zinc-600 leading-relaxed">
            <p>
              I am a passionate photographer and videographer dedicated to capturing the essence of 
              every moment. With a keen eye for detail and a love for storytelling, I strive to create visual 
              masterpieces that resonate with emotion and beauty.
            </p>
            <p>
              Whether it's a wedding, a corporate event, or a personal portrait session, I bring creativity 
              and professionalism to every project. Let's work together to create something 
              unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-primary/20 transition-colors">
              <div className="text-4xl font-bold text-primary mb-2">5+</div>
              <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-primary/20 transition-colors">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Projects Completed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}