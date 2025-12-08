import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", active: true },
    { name: "Photo", href: "#photo", active: false },
    { name: "Video", href: "#video", active: false },
    { name: "Form", href: "#form", active: false },
    { name: "Contact", href: "#contact", active: false },
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

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`pointer-events-auto relative flex items-center justify-between px-8 py-4 w-full max-w-7xl transition-all duration-300 ${
          isScrolled 
            ? "bg-black/80 backdrop-blur-xl shadow-2xl rounded-full border border-white/10" 
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src="https://harmless-tapir-303.convex.cloud/api/storage/12f3af3e-9161-4b2f-bfd5-081de370261e" 
            alt="Logo" 
            className="w-12 h-12 object-contain rounded-full bg-white/10" 
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-[0.2em] text-white leading-none">MAULI</span>
            <span className="text-[10px] tracking-[0.3em] text-white/50 uppercase">Wedding Photography</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12 ml-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors relative group ${
                link.active ? "text-primary" : "text-white hover:text-primary"
              }`}
            >
              {link.active ? (
                <span>[ {link.name} ]</span>
              ) : (
                <>
                  <span className="group-hover:hidden">{link.name}</span>
                  <span className="hidden group-hover:inline text-primary">[ {link.name} ]</span>
                </>
              )}
            </a>
          ))}
          {isAuthenticated && (
            <a
              href="/dashboard"
              onClick={(e) => {
                e.preventDefault();
                navigate("/dashboard");
              }}
              className="text-xs font-bold tracking-[0.2em] uppercase text-white hover:text-primary transition-colors relative group"
            >
              <span className="group-hover:hidden">Dashboard</span>
              <span className="hidden group-hover:inline text-primary">[ Dashboard ]</span>
            </a>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-white/10 hover:text-primary rounded-full ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-4 p-4 rounded-3xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-lg font-bold tracking-widest uppercase text-white/90 hover:text-primary hover:bg-white/5 px-4 py-3 rounded-xl transition-all"
                  >
                    {link.name}
                  </a>
                ))}
                <Button 
                  onClick={() => scrollToSection("#form")}
                  className="w-full rounded-xl bg-primary hover:bg-primary/90 text-black font-bold mt-2"
                >
                  REGISTER NOW
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}