import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate, useLocation } from "react-router";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
    { name: "Photo", href: "#photo" },
    { name: "Video", href: "#video" },
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

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
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
        className={`pointer-events-auto relative flex items-center justify-between px-6 py-3 w-full max-w-7xl transition-all duration-500 ${
          isScrolled 
            ? "bg-black/80 backdrop-blur-xl shadow-2xl rounded-full border border-white/10" 
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img 
            src="https://harmless-tapir-303.convex.cloud/api/storage/12f3af3e-9161-4b2f-bfd5-081de370261e" 
            alt="Logo" 
            className="w-10 h-10 object-contain rounded-full bg-white/10 border border-white/10" 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: "circOut" }}
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-[0.2em] text-white leading-none group-hover:text-primary transition-colors">MAULI</span>
            <span className="text-[10px] tracking-[0.3em] text-white/50 uppercase">Wedding Photography</span>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              variants={itemVariants}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase text-white transition-colors hover:text-primary"
            >
              {hoveredIndex === index && (
                <motion.span
                  layoutId="nav-hover-bg"
                  className="absolute inset-0 bg-white/10 rounded-full -z-10"
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
              variants={itemVariants}
              onClick={(e) => {
                e.preventDefault();
                navigate("/dashboard");
              }}
              className="ml-4 px-5 py-2 bg-primary text-black text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Dashboard
            </motion.a>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <motion.div variants={itemVariants} className="md:hidden ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 hover:text-primary rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </motion.div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95, height: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
              exit={{ opacity: 0, y: -20, scale: 0.95, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-full left-0 right-0 mt-4 p-4 rounded-3xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl md:hidden overflow-hidden"
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
                    className="text-lg font-bold tracking-widest uppercase text-white/90 hover:text-primary hover:bg-white/5 px-4 py-3 rounded-xl transition-all"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button 
                    onClick={() => scrollToSection("#form")}
                    className="w-full rounded-xl bg-primary hover:bg-primary/90 text-black font-bold mt-2"
                  >
                    REGISTER NOW
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
}