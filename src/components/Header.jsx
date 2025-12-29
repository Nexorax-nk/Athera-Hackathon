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

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ================= HEADER ================= */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur border-b border-white/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">

          {/* LOGO */}
          <a href="#home" className="group">
            <span
              className="font-cyber font-bold text-lg md:text-2xl tracking-[0.18em] text-white"
              style={{
                textShadow:
                  "0 0 14px rgba(0,240,255,0.6), 0 0 30px rgba(0,240,255,0.35)",
              }}
            >
              <GlitchText>ATHERA X MAGNUS</GlitchText>
            </span>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 rounded-full hover:bg-white/5 transition group"
              >
                <span className="font-sci text-sm font-medium tracking-wide text-gray-300 group-hover:text-white transition">
                  {link.name}
                </span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon-cyan opacity-0 group-hover:opacity-100 transition" />
              </a>
            ))}
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <a
              href="#register"
              className="
                hidden md:flex items-center px-6 py-2
                font-cyber text-sm tracking-widest font-semibold
                text-neon-cyan border border-neon-cyan/40 rounded-lg
                hover:bg-neon-cyan hover:text-black
                transition shadow-[0_0_15px_rgba(0,240,255,0.35)]
              "
            >
              REGISTER
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white hover:text-neon-cyan transition"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl md:hidden"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-red-500 transition"
            >
              <X size={28} />
            </button>

            <nav className="flex flex-col items-center justify-center h-full gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-cyber text-2xl tracking-wider text-gray-300 hover:text-white transition"
                >
                  <span className="text-neon-cyan opacity-50 mr-2">/</span>
                  {link.name}
                </motion.a>
              ))}

              <a
                href="#register"
                className="mt-6 px-10 py-4 bg-neon-cyan text-black font-cyber tracking-widest rounded-lg shadow-[0_0_25px_rgba(0,240,255,0.45)]"
              >
                REGISTER NOW
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
