import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown, Calendar, MapPin, Clock, Users } from "lucide-react";
import heroVideo from "@/assets/herobg1.mp4";

const CountdownUnit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="relative">
      {/* MOBILE FIX: Changed w-16 h-16 to w-12 h-12 for small screens, scaling up at sm and md breakpoints */}
      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 flex items-center justify-center border border-neon-cyan/50 bg-background/50 backdrop-blur-sm box-glow-cyan rounded">
        <span className="font-orbitron text-lg sm:text-2xl md:text-4xl font-bold text-primary text-glow-cyan">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
    <span className="mt-2 font-mono text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-widest">
      {label}
    </span>
  </div>
);

// Animated title - Updated with Blue/Purple Gradient Glow
const AnimatedTitle = () => {
  const titleParts = [
    { text: "HACKWITHMAGNUS", className: "text-white" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  // NEW: Blue-Purple Gradient Glow
  const glowVariants = {
    idle: {
      textShadow: [
        "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(138, 43, 226, 0.6)",
        "0 0 15px rgba(0, 255, 255, 1), 0 0 30px rgba(138, 43, 226, 0.8), 0 0 40px rgba(0, 255, 255, 0.4)",
        "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(138, 43, 226, 0.6)",
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.h1
      // MOBILE FIX: Adjusted text size to start at text-2xl for small mobile screens
      className="flex flex-col items-center justify-center w-full font-orbitron font-black text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-4 leading-tight tracking-widest z-20 relative mr-[-0.1em]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {titleParts.map((part, partIndex) => (
        <motion.span
          key={partIndex}
          className={`${part.className} inline-block text-center break-words max-w-full`}
          animate="idle"
          variants={glowVariants}
        >
          {part.text.split("").map((letter, letterIndex) => (
            <motion.span
              key={`${partIndex}-${letterIndex}`}
              variants={letterVariants}
              className="inline-block hover:text-neon-cyan transition-colors duration-300"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.span>
      ))}
      <motion.span
        // MOBILE FIX: Adjusted text size for the year
        className="block text-xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 text-foreground font-bold tracking-normal"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        2026
      </motion.span>
    </motion.h1>
  );
};

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  
  const orbLeftX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const orbRightX = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const targetDate = new Date("2026-02-02T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Background video with parallax */}
      <motion.div
        className="absolute inset-0 overflow-hidden will-change-transform pointer-events-none"
        style={{
          y: backgroundY,
          scale: backgroundScale,
          transformStyle: "preserve-3d",
        }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-background/70 pointer-events-none"
        style={{ y: backgroundY }}
      />

      {/* Cyber grid */}
      <motion.div
        className="absolute inset-0 bg-cyber-grid bg-grid-40 opacity-30 will-change-transform pointer-events-none"
        style={{ y: gridY }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 via-transparent to-neon-magenta/5 pointer-events-none" />

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
      >
        <motion.div
          className="absolute left-0 right-0 h-1 bg-neon-cyan"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Animated orbs */}
      <motion.div
        style={{ x: orbLeftX }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-neon-cyan/20 blur-[100px] will-change-transform pointer-events-none"
      />
      <motion.div
        style={{ x: orbRightX }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-neon-magenta/20 blur-[100px] will-change-transform pointer-events-none"
      />

      {/* Main content */}
      <motion.div
        className="container mx-auto px-4 text-center relative z-10"
        style={{
          y: contentY,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          // MOBILE FIX: Added px-2 to prevent side collision on very small screens
          className="flex flex-col items-center pb-10 px-2" 
        >
          {/* Date badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            // MOBILE FIX: flex-col for small screens, row for larger. Reduced margins.
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2 px-4 py-2 mt-4 mb-6 sm:mb-8 border border-neon-cyan/30 rounded-2xl sm:rounded-full bg-background/50 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neon-cyan" />
              <span className="font-mono text-xs sm:text-sm text-foreground/80 whitespace-nowrap">
                FEBRUARY 2, 2026
              </span>
            </div>
            
            <span className="hidden sm:inline text-foreground/40">|</span>
            
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-neon-magenta" />
              <span className="font-mono text-xs sm:text-sm text-foreground/80 text-center sm:text-left">
                CHENNAI INSTITUTE OF TECHNOLOGY
              </span>
            </div>
          </motion.div>

          <AnimatedTitle />

          <motion.p
            className="font-rajdhani text-lg sm:text-xl md:text-2xl lg:text-3xl text-neon-cyan mb-4 font-semibold px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            Ideate • Build • Innovate • Impact
          </motion.p>

          {/* Event Details Pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-neon-magenta/30 rounded-full bg-background/30 backdrop-blur-sm">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-neon-magenta" />
              <span className="font-mono text-[10px] sm:text-xs text-foreground/80 whitespace-nowrap">
                8 HOURS
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-neon-cyan/30 rounded-full bg-background/30 backdrop-blur-sm">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-neon-cyan" />
              <span className="font-mono text-[10px] sm:text-xs text-foreground/80 whitespace-nowrap">
                3-5 MEMBERS
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-accent/30 rounded-full bg-background/30 backdrop-blur-sm">
              <span className="font-mono text-[10px] sm:text-xs text-accent font-semibold whitespace-nowrap">
                FREE REGISTRATION
              </span>
            </div>
          </motion.div>

          {/* Countdown - MOBILE FIX: Adjusted gap */}
          <motion.div
            className="flex justify-center gap-3 sm:gap-4 md:gap-8 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            <CountdownUnit value={timeLeft.days} label="Days" />
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </motion.div>

          {/* CTAs - MOBILE FIX: Full width buttons on mobile, row on desktop */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto px-6 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            <motion.a
              href="#register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 sm:py-4 font-orbitron font-bold text-base sm:text-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background rounded hover:shadow-[0_0_40px_hsl(var(--neon-cyan)/0.5)] transition-all duration-300 hover-glitch w-full sm:w-auto"
            >
              REGISTER NOW
            </motion.a>
            <motion.a
              href="#schedule"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 sm:py-4 font-orbitron font-bold text-base sm:text-lg border-2 border-neon-magenta text-neon-magenta rounded hover:bg-neon-magenta/10 hover:shadow-[0_0_30px_hsl(var(--neon-magenta)/0.3)] transition-all duration-300 w-full sm:w-auto"
            >
              VIEW SCHEDULE
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator - MOBILE FIX: Hide on very small screens if needed, otherwise keep */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
          style={{ pointerEvents: "auto" }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center cursor-pointer"
          >
            <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-neon-cyan" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;