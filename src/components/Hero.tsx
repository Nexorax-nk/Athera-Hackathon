import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Calendar, MapPin } from "lucide-react";
import heroVideo from "@/assets/hero-bgm.mp4";

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="relative">
      <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center border border-neon-cyan/50 bg-background/50 backdrop-blur-sm box-glow-cyan rounded">
        <span className="font-orbitron text-2xl md:text-4xl font-bold text-primary text-glow-cyan">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
    <span className="mt-2 font-mono text-xs md:text-sm text-muted-foreground uppercase tracking-widest">
      {label}
    </span>
  </div>
);

// Animated title with letter-by-letter reveal and glitch
const AnimatedTitle = () => {
  const titleParts = [
    { text: "HACKS", className: "gradient-text-cyber" },
    { text: "WITH", className: "text-foreground" },
    { text: "MAGNUS", className: "gradient-text-sunset" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: -90,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const glitchVariants = {
    idle: {
      textShadow: [
        "0 0 10px hsl(var(--neon-cyan)), 0 0 20px hsl(var(--neon-cyan))",
        "2px 0 hsl(var(--neon-magenta)), -2px 0 hsl(var(--neon-cyan))",
        "0 0 10px hsl(var(--neon-cyan)), 0 0 20px hsl(var(--neon-cyan))",
      ],
      x: [0, -1, 1, 0],
    },
  };

  return (
    <motion.h1 
      className="font-orbitron font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 leading-tight"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {titleParts.map((part, partIndex) => (
        <motion.span
          key={partIndex}
          className={`${part.className} inline-block`}
          animate="idle"
          variants={glitchVariants}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3 + partIndex,
          }}
        >
          {part.text.split("").map((letter, letterIndex) => (
            <motion.span
              key={`${partIndex}-${letterIndex}`}
              variants={letterVariants}
              className="inline-block"
              style={{ 
                textShadow: partIndex === 0 || partIndex === 2 
                  ? "0 0 20px currentColor" 
                  : "none" 
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      ))}
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

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // 3D Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const orbLeftX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const orbRightX = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const targetDate = new Date("2077-03-15T00:00:00").getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
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
      {/* 3D Parallax Hero background image */}
      <motion.div
  className="absolute inset-0 overflow-hidden will-change-transform"
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

      <motion.div 
        className="absolute inset-0 bg-background/70"
        style={{ y: backgroundY }}
      />
      
      {/* Background grid with parallax */}
      <motion.div 
        className="absolute inset-0 bg-cyber-grid bg-grid-40 opacity-30 will-change-transform"
        style={{ y: gridY }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 via-transparent to-neon-magenta/5" />
      
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
      
      {/* Animated orbs with 3D parallax */}
      <motion.div
        style={{ x: orbLeftX }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-neon-cyan/20 blur-[100px] will-change-transform"
      />
      <motion.div
        style={{ x: orbRightX }}
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-neon-magenta/20 blur-[100px] will-change-transform"
      />

      {/* Content with parallax */}
      <motion.div 
        className="container mx-auto px-4 text-center relative z-10"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Date badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-neon-cyan/30 rounded-full bg-background/50 backdrop-blur-sm"
          >
            <Calendar className="w-4 h-4 text-neon-cyan" />
            <span className="font-mono text-sm text-foreground/80">
              MARCH 15-17, 2077
            </span>
            <span className="text-foreground/40">|</span>
            <MapPin className="w-4 h-4 text-neon-magenta" />
            <span className="font-mono text-sm text-foreground/80">
              NIGHT CITY
            </span>
          </motion.div>

          {/* Animated Main title */}
          <AnimatedTitle />

          <motion.p 
            className="font-rajdhani text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            Night City's Premier Hackathon 2077
          </motion.p>

          <motion.p 
            className="font-mono text-sm md:text-base text-neon-cyan/80 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            BUILD THE FUTURE IN THE DARK FUTURE | 48 HOURS OF INNOVATION
          </motion.p>

          {/* Countdown */}
          <motion.div 
            className="flex justify-center gap-4 md:gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            <CountdownUnit value={timeLeft.days} label="Days" />
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </motion.div>

          {/* CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            <motion.a
              href="#register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 font-orbitron font-bold text-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background rounded hover:shadow-[0_0_40px_hsl(var(--neon-cyan)/0.5)] transition-all duration-300 hover-glitch"
            >
              REGISTER NOW
            </motion.a>
            <motion.a
              href="#schedule"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 font-orbitron font-bold text-lg border-2 border-neon-magenta text-neon-magenta rounded hover:bg-neon-magenta/10 hover:shadow-[0_0_30px_hsl(var(--neon-magenta)/0.3)] transition-all duration-300"
            >
              VIEW SCHEDULE
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <span className="font-mono text-xs text-muted-foreground">SCROLL</span>
            <ChevronDown className="w-6 h-6 text-neon-cyan" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
