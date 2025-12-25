import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
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

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
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
          <div className={`relative w-10 h-10 flex items-center justify-center rounded-full border overflow-hidden transition-colors ${isScrolled ? "bg-black/5 border-black/10 group-hover:border-primary/50" : "bg-white/10 border-white/20 group-hover:border-primary/50"}`}>
             <span className="text-xl font-serif font-bold text-primary">M</span>
          </div>
          <div className="flex flex-col">
            <span className={`text-sm font-bold tracking-[0.2em] leading-none transition-colors ${isScrolled ? "text-foreground group-hover:text-primary" : "text-white group-hover:text-primary"}`}>MAULI</span>
            <span className={`text-[8px] tracking-[0.3em] uppercase ${isScrolled ? "text-muted-foreground" : "text-white/60"}`}>Photography</span>
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

        {/* Mobile Menu Toggle */}
        <div className="md:hidden ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${isScrolled ? "text-foreground hover:bg-black/5" : "text-white hover:bg-white/10"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95, height: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
              exit={{ opacity: 0, y: -20, scale: 0.95, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-full left-0 right-0 mt-4 p-4 rounded-3xl bg-white/90 backdrop-blur-xl border border-black/5 shadow-2xl md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-lg font-bold tracking-widest uppercase text-foreground/90 hover:text-primary hover:bg-black/5 px-4 py-3 rounded-xl transition-all"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
}