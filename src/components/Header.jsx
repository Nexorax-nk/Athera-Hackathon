import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // Import Menu/X icons
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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        // REMOVED 'hidden md:block' so it appears on mobile
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled 
            ? "bg-black border-b border-white/10 py-3 shadow-lg" 
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="container mx-auto px-6 relative z-10 flex items-center justify-between">
          
          {/* ================= LEFT: LOGO ================= */}
          <a href="#home" className="group hover:scale-105 transition-transform duration-300 relative z-50">
            <span 
              // Adjusted text size: text-lg for mobile, text-2xl for desktop
              className="font-orbitron font-bold text-lg md:text-2xl tracking-wider text-white transition-all duration-300"
              style={{ 
                textShadow: "0 0 10px rgba(0, 240, 255, 0.6), 0 0 20px rgba(0, 240, 255, 0.4)" 
              }}
            >
              <GlitchText>ATHERA X MAGNUS</GlitchText>
            </span>
          </a>

          {/* ================= CENTER: NAV LINKS (HIDDEN ON MOBILE) ================= */}
          <nav className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
             <div className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="relative px-5 py-2 rounded-full transition-all duration-300 hover:bg-white/5 group"
                  >
                    <span className="font-rajdhani font-semibold text-sm text-gray-300 group-hover:text-white transition-colors relative z-10">
                      {link.name}
                    </span>
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 box-glow-cyan" />
                  </a>
                ))}
             </div>
          </nav>

          {/* ================= RIGHT SECTION ================= */}
          <div className="flex items-center gap-4">
            
            {/* REGISTER BUTTON (HIDDEN ON MOBILE) */}
            <motion.a
              href="#register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                hidden md:flex items-center gap-2 px-6 py-2 rounded-lg 
                font-orbitron font-bold text-sm tracking-wide transition-all duration-300
                ${isScrolled 
                  ? "bg-neon-cyan text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]" 
                  : "bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan hover:text-black hover:box-glow-cyan"}
              `}
            >
              REGISTER
            </motion.a>

            {/* SIDEBAR ICON (VISIBLE ONLY ON MOBILE) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-white hover:text-neon-cyan transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ================= MOBILE SIDEBAR OVERLAY ================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl md:hidden"
          >
            {/* Close Button */}
            <div className="absolute top-5 right-6 z-50">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white hover:text-red-500 transition-colors border border-white/10 rounded-full bg-white/5"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-orbitron text-2xl text-gray-300 hover:text-white transition-colors"
                >
                  <span className="text-neon-cyan mr-2 text-lg opacity-50">/</span>
                  {link.name}
                </motion.a>
              ))}

              <motion.a
                href="#register"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 px-10 py-4 bg-neon-cyan text-black font-bold font-orbitron rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.4)]"
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