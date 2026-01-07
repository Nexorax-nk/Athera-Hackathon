import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown, Calendar, MapPin, Clock, Users } from "lucide-react";
import heroVideo from "@/assets/herobg1.mp4";
import heroLogo from "@/assets/logo.png";

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

/* ======================= HERO ======================= */
const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRegistrationClosed, setIsRegistrationClosed] = useState(false);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  useEffect(() => {
    const targetDate = new Date("2026-01-17T23:59:59").getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsRegistrationClosed(true); // Mark as closed
        return;
      }

      setIsRegistrationClosed(false);

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

        {/* Logo */}
        <motion.img
          src={heroLogo}
          alt="HackWithMagnus 2026"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="
            mx-auto
            max-w-none
            w-[300px]
            sm:w-[420px]
            md:w-[600px]
            lg:w-[720px]
            xl:w-[820px]
            drop-shadow-[0_0_40px_rgba(0,255,255,0.4)]
            mb-6
          "
        />

        <p className="font-rajdhani text-lg sm:text-2xl text-neon-cyan font-semibold mt-2">
          Ideate • Build • Innovate • Impact
        </p>

        {/* Pills */}
        <div className="flex justify-center gap-4 sm:gap-6 mt-8 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2 border border-neon-magenta/30 rounded-full bg-background/40 backdrop-blur-sm">
            <Clock className="w-4 h-4 text-neon-magenta" />
            <span className="font-mono text-xs sm:text-sm">6 HOURS</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 border border-neon-cyan/30 rounded-full bg-background/40 backdrop-blur-sm">
            <Users className="w-4 h-4 text-neon-cyan" />
            <span className="font-mono text-xs sm:text-sm">2–4 MEMBERS</span>
          </div>

          <div className="px-5 py-2 border border-accent/30 rounded-full bg-background/40 backdrop-blur-sm">
            <span className="font-mono text-xs sm:text-sm text-accent font-semibold">
              FREE REGISTRATION
            </span>
          </div>
        </div>

        {/* Countdown or Closed Message */}
        <p className="mt-10 mb-4 font-mono text-sm tracking-widest text-neon-magenta uppercase">
          {isRegistrationClosed ? "" : "Registration Closes In"}
        </p>

        {isRegistrationClosed ? (
          <div className="py-8">
            <p className="font-orbitron text-3xl md:text-5xl font-bold text-red-500 drop-shadow-lg">
              REGISTRATION CLOSED
            </p>
            <p className="mt-4 text-muted-foreground text-sm md:text-base">
              Thank you for your interest! Registrations are now closed.
            </p>
          </div>
        ) : (
          <div className="flex justify-center gap-4 md:gap-8">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        )}

        {/* Buttons */}
        <div className="mt-10 flex gap-4 justify-center flex-wrap">
          {isRegistrationClosed ? (
            <button
              disabled
              className="px-8 py-4 font-orbitron font-bold bg-gray-600 text-gray-400 rounded cursor-not-allowed"
            >
              REGISTRATION CLOSED
            </button>
          ) : (
            <a
              href="#register"
              className="px-8 py-4 font-orbitron font-bold bg-gradient-to-r from-neon-cyan to-neon-magenta text-background rounded hover:scale-105 transition"
            >
              REGISTER NOW
            </a>
          )}

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