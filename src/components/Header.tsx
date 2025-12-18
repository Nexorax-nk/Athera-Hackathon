import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import GlitchText from "./GlitchText";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Domains", href: "#tracks" },
  { name: "Schedule", href: "#schedule" },
  { name: "Prizes", href: "#prizes" },
  { name: "FAQ", href: "#faq" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-b border-neon-cyan/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <span className="font-orbitron font-bold text-lg md:text-xl text-glow-cyan text-primary group-hover:animate-pulse-glow transition-all">
              <GlitchText>HACKWITHMAGNUS</GlitchText>
            </span>
          </a>

          {/* Desktop Nav with Glitch Effects */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-rajdhani font-medium text-foreground/80 hover:text-primary transition-colors relative group hover-glitch"
              >
                <GlitchText triggerOnHover={true}>
                  {link.name}
                </GlitchText>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <motion.a
              href="#register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-6 py-2 font-orbitron font-semibold text-sm bg-gradient-to-r from-neon-cyan to-neon-magenta text-background rounded hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.5)] transition-all duration-300 hover-glitch"
            >
              REGISTER
            </motion.a>
            
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-primary hover:text-neon-magenta transition-colors"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl"
          >
            {/* Scanlines overlay */}
            <div className="absolute inset-0 scanline pointer-events-none opacity-50" />
            
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <span className="font-orbitron font-bold text-xl text-primary text-glow-cyan">
                HACKWITHMAGNUS
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-primary hover:text-neon-magenta transition-colors"
              >
                <X size={28} />
              </button>
            </div>
            
            <nav className="flex flex-col items-center justify-center h-[80vh] gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-orbitron text-2xl text-foreground hover:text-primary transition-colors"
                >
                  <GlitchText triggerOnHover={true}>
                    {link.name}
                  </GlitchText>
                </motion.a>
              ))}
              <motion.a
                href="#register"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 px-8 py-3 font-orbitron font-semibold bg-gradient-to-r from-neon-cyan to-neon-magenta text-background rounded"
              >
                REGISTER NOW
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;