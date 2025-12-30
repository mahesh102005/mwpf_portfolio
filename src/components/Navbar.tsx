import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, Variants } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Photos", href: "#photo" },
    { name: "Videos", href: "#video" },
    { name: "Form", href: "#form" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      }
    }
  };

  return (
    <motion.header
      className="absolute top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
    >
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`pointer-events-auto relative flex items-center justify-between px-8 py-4 w-full max-w-6xl transition-all duration-500 ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-xl shadow-2xl rounded-full border border-black/5" 
            : "bg-transparent rounded-full"
        }`}
      >
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className={`relative w-12 h-12 flex items-center justify-center rounded-full border overflow-hidden transition-colors ${isScrolled ? "bg-black/5 border-black/10 group-hover:border-primary/50" : "bg-white/10 border-white/20 group-hover:border-primary/50"}`}>
             <img 
               src="https://harmless-tapir-303.convex.cloud/api/storage/2c18c70f-4dfb-4399-b2c8-a9ebf3589d8e" 
               alt="Mauli Photography Logo" 
               className="w-full h-full object-cover"
             />
          </div>
          <div className="flex flex-col">
            <span className={`text-sm font-bold tracking-[0.2em] leading-none transition-colors ${isScrolled ? "text-foreground group-hover:text-primary" : "text-white group-hover:text-primary"}`}>MAULI</span>
            <span className={`text-[8px] tracking-[0.3em] uppercase ${isScrolled ? "text-muted-foreground" : "text-white/60"}`}>Wedding Photography & Film's</span>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 ml-auto">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative px-5 py-2 text-xs font-medium tracking-[0.15em] uppercase transition-colors ${isScrolled ? "text-foreground/80 hover:text-foreground" : "text-white/80 hover:text-white"}`}
            >
              {hoveredIndex === index && (
                <motion.span
                  layoutId="nav-hover-bg"
                  className={`absolute inset-0 rounded-full -z-10 border ${isScrolled ? "bg-black/5 border-black/5" : "bg-white/10 border-white/10"}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {link.name}
            </motion.a>
          ))}
          
          {isAuthenticated && (
            <motion.a
              href="/dashboard"
              onClick={(e) => {
                e.preventDefault();
                navigate("/dashboard");
              }}
              className="ml-4 px-6 py-2 bg-primary text-white text-xs font-bold tracking-[0.15em] uppercase rounded-full hover:bg-primary/90 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Dashboard
            </motion.a>
          )}
        </div>
      </motion.nav>
    </motion.header>
  );
}