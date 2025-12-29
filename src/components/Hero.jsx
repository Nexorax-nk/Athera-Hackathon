import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown, Calendar, MapPin, Clock, Users } from "lucide-react";
import heroVideo from "@/assets/herobg1.mp4";

/* ======================= COUNTDOWN UNIT ======================= */
const CountdownUnit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 flex items-center justify-center border border-neon-cyan/50 bg-background/50 backdrop-blur-sm box-glow-cyan rounded">
      <span className="font-orbitron text-lg sm:text-2xl md:text-4xl font-bold text-primary text-glow-cyan">
        {value.toString().padStart(2, "0")}
      </span>
    </div>
    <span className="mt-2 font-mono text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-widest">
      {label}
    </span>
  </div>
);

/* ======================= TITLE ======================= */
const AnimatedTitle = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.5 },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className="font-orbitron font-black text-3xl sm:text-5xl md:text-7xl tracking-widest text-white"
    >
      {"HACKWITHMAGNUS".split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letter}
          className="inline-block hover:text-neon-cyan transition-colors"
        >
          {char}
        </motion.span>
      ))}
      <div className="text-xl sm:text-3xl md:text-4xl mt-2 font-bold">
        2026
      </div>
    </motion.h1>
  );
};

/* ======================= HERO ======================= */
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

  useEffect(() => {
    const targetDate = new Date("2026-01-10T23:59:59").getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Video */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY, scale: backgroundScale }}
      >
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-background/70" />

      <div className="relative z-10 text-center px-4">
        {/* Date Badge */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-5 py-2 mb-6 border border-neon-cyan/30 rounded-full bg-background/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-neon-cyan" />
            <span className="font-mono text-xs sm:text-sm">
              FEBRUARY 2, 2026
            </span>
          </div>
          <span className="hidden sm:block text-muted-foreground">|</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-neon-magenta" />
            <span className="font-mono text-xs sm:text-sm">
              CHENNAI INSTITUTE OF TECHNOLOGY
            </span>
          </div>
        </div>

        <AnimatedTitle />

        <p className="font-rajdhani text-lg sm:text-2xl text-neon-cyan font-semibold mt-4">
          Ideate • Build • Innovate • Impact
        </p>

        {/* ✅ FIXED PILLS WITH GAP */}
        <div className="flex justify-center gap-4 sm:gap-6 mt-8 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2 border border-neon-magenta/30 rounded-full bg-background/40 backdrop-blur-sm">
            <Clock className="w-4 h-4 text-neon-magenta" />
            <span className="font-mono text-xs sm:text-sm">8 HOURS</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 border border-neon-cyan/30 rounded-full bg-background/40 backdrop-blur-sm">
            <Users className="w-4 h-4 text-neon-cyan" />
            <span className="font-mono text-xs sm:text-sm">3–5 MEMBERS</span>
          </div>

          <div className="px-5 py-2 border border-accent/30 rounded-full bg-background/40 backdrop-blur-sm">
            <span className="font-mono text-xs sm:text-sm text-accent font-semibold">
              FREE REGISTRATION
            </span>
          </div>
        </div>

        <p className="mt-10 mb-4 font-mono text-sm tracking-widest text-neon-magenta uppercase">
          Registration Closes In
        </p>

        <div className="flex justify-center gap-4 md:gap-8">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        <div className="mt-10 flex gap-4 justify-center flex-wrap">
          <a
            href="#register"
            className="px-8 py-4 font-orbitron font-bold bg-gradient-to-r from-neon-cyan to-neon-magenta text-background rounded hover:scale-105 transition"
          >
            REGISTER NOW
          </a>
          <a
            href="#schedule"
            className="px-8 py-4 font-orbitron font-bold border-2 border-neon-magenta text-neon-magenta rounded hover:bg-neon-magenta/10 transition"
          >
            VIEW SCHEDULE
          </a>
        </div>

        <div className="mt-12 flex justify-center">
          <ChevronDown className="w-8 h-8 text-neon-cyan animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
