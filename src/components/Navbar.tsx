import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, Variants, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
    { name: "About", href: "#about" },
    { name: "Form", href: "#form" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
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

  const mobileMenuVariants: Variants = {
    closed: { opacity: 0, scale: 0.95, y: 10 },
    open: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      } 
    }
  };

  return (
    <>
      <motion.header
        className="absolute top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
      >
        <motion.nav
          initial="hidden"
          animate="visible"
          variants={navVariants}
          className={`pointer-events-auto relative flex items-center justify-between px-6 md:px-8 py-4 w-full max-w-6xl transition-all duration-500 ${
            isScrolled 
              ? "bg-white/20 backdrop-blur-lg shadow-lg rounded-full border border-white/20" 
              : "bg-white/5 backdrop-blur-sm rounded-full border border-white/10 shadow-sm"
          }`}
        >
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border overflow-hidden transition-colors ${isScrolled ? "bg-black/5 border-black/10 group-hover:border-primary/50" : "bg-white/10 border-white/20 group-hover:border-primary/50"}`}>
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
                    className={`absolute inset-0 rounded-full -z-10 border ${isScrolled ? "bg-black/5 border-black/5" : "bg-white/5 border-white/30"}`}
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

          {/* Mobile Menu Toggle */}
          <div className="md:hidden ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className={`rounded-full ${isScrolled ? "text-foreground hover:bg-black/5" : "text-white hover:bg-white/10"}`}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-transparent md:hidden flex items-start justify-end p-4 pt-24"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/60 backdrop-blur-xl border border-white/20 w-full max-w-[250px] rounded-[1.5rem] shadow-2xl overflow-hidden relative"
            >
              <div className="absolute top-4 right-4 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="h-8 w-8 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-black/5"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex flex-col items-center py-10 px-6 gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm font-medium text-neutral-700 hover:text-black tracking-[0.2em] uppercase transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                
                {isAuthenticated && (
                  <a
                    href="/dashboard"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/dashboard");
                      setIsMobileMenuOpen(false);
                    }}
                    className="mt-2 px-6 py-2 bg-neutral-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-neutral-800 transition-colors"
                  >
                    Dashboard
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}