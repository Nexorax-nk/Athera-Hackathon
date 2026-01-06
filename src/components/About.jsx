import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Users,
  Clock,
  Calendar,
  MapPin,
  GraduationCap,
  Zap,
  Lightbulb,
  Hammer,
  Rocket,
} from "lucide-react";

/* ======================= STATS ======================= */
const StatItem = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center justify-center p-4 text-center"
  >
    <div className={`p-3 rounded-full bg-${color}/10 mb-3`}>
      <Icon className={`w-6 h-6 text-${color}`} />
    </div>
    <span className="font-orbitron text-2xl font-bold text-white mb-1">
      {value}
    </span>
    <span className="font-rajdhani text-sm text-muted-foreground uppercase tracking-widest">
      {label}
    </span>
  </motion.div>
);

/* ======================= GLASS CARD ======================= */
/* 🔴 FIX: overflow-hidden → overflow-visible */
const GlassCard = ({ title, children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={`relative group overflow-visible rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 via-transparent to-neon-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      {title && (
        <h3 className="font-orbitron text-xl font-bold text-white mb-4 border-b border-white/10 pb-4 inline-block">
          {title}
        </h3>
      )}
      {children}
    </div>
  </motion.div>
);

/* ======================= PROCESS STEP ======================= */
const colorMap = {
  "neon-cyan": {
    bg: "bg-neon-cyan",
    text: "text-neon-cyan",
    border: "border-neon-cyan/30",
    glow: "bg-neon-cyan",
  },
  "neon-magenta": {
    bg: "bg-neon-magenta",
    text: "text-neon-magenta",
    border: "border-neon-magenta/30",
    glow: "bg-neon-magenta",
  },
  accent: {
    bg: "bg-accent",
    text: "text-accent",
    border: "border-accent/30",
    glow: "bg-accent",
  },
};

const ProcessStep = ({ icon: Icon, title, desc, number, color }) => {
  const c = colorMap[color];

  return (
    <div className="relative z-10 flex flex-col items-center text-center group">
      <div className="relative mb-6">

        {/* glow */}
        <div
          className={`absolute inset-0 ${c.glow} blur-[30px] opacity-20 group-hover:opacity-40 transition-opacity`}
        />

        {/* icon box */}
        <div
          className={`relative w-16 h-16 rounded-2xl border ${c.border} bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className={`w-8 h-8 ${c.text}`} />
        </div>

        {/* ✅ NUMBER — NOW ALWAYS VISIBLE */}
        <div
          className={`absolute -top-3 -right-3 z-30 w-8 h-8 rounded-full ${c.bg} flex items-center justify-center font-bold text-black text-sm`}
        >
          {number}
        </div>
      </div>

      <h4 className="font-orbitron text-lg font-bold text-white mb-2">
        {title}
      </h4>

      <p className="font-rajdhani text-sm text-muted-foreground max-w-[250px]">
        {desc}
      </p>
    </div>
  );
};


/* ======================= ABOUT ======================= */
const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-neon-magenta/20 rounded-full blur-[128px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* HEADER */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="font-orbitron text-5xl font-bold mb-6 text-white">
            ABOUT THE <span className="text-neon-cyan">SPRINT</span>
          </h2>
          <p className="font-rajdhani text-lg text-muted-foreground">
            ATHERA INNOVATION SPRINT is a high-energy hackathon focused on
            real-world impact, rapid prototyping, and innovation.
          </p>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 border-y border-white/10 py-8 bg-white/5 backdrop-blur-sm">
          <StatItem
            icon={Calendar}
            value="Feb 02, 2026"
            label="Final Round"
            color="neon-cyan"
            delay={0.1}
          />
          <StatItem
            icon={Clock}
            value="06 Hours"
            label="Duration"
            color="neon-magenta"
            delay={0.2}
          />
          <StatItem
            icon={Users}
            value="2–4 Members"
            label="Team Size"
            color="neon-cyan"
            delay={0.3}
          />
          <StatItem
            icon={Zap}
            value="Free"
            label="Registration"
            color="accent"
            delay={0.4}
          />
        </div>

        {/* INFO CARDS */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <GlassCard title="WHO CAN JOIN?" delay={0.2}>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-neon-cyan/10 rounded-lg">
                <GraduationCap className="w-6 h-6 text-neon-cyan" />
              </div>
              <p className="font-rajdhani text-gray-300 text-lg">
                Open to all <span className="text-white font-semibold">UG & PG students</span>.
                Inter-college teams allowed.
              </p>
            </div>
          </GlassCard>

          <GlassCard title="THE BATTLEGROUND" delay={0.3}>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-neon-magenta/10 rounded-lg">
                <MapPin className="w-6 h-6 text-neon-magenta" />
              </div>
              <p className="font-rajdhani text-gray-300 text-lg">
                <span className="text-white font-semibold">
                  Chennai Institute of Technology
                </span>{" "}
                — Offline final round.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* PROCESS */}
        <GlassCard delay={0.4}>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 py-6">
            {/* 🔴 FIX: connector line pushed behind */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-neon-cyan via-purple-500 to-neon-magenta opacity-30 z-0" />

            <ProcessStep
              number="01"
              icon={Lightbulb}
              title="IDEATE"
              desc="Identify a problem and brainstorm a unique solution."
              color="neon-cyan"
            />
            <ProcessStep
              number="02"
              icon={Hammer}
              title="BUILD"
              desc="Develop a working prototype within the 8-hour timeframe."
              color="neon-magenta"
            />
            <ProcessStep
              number="03"
              icon={Rocket}
              title="INNOVATE"
              desc="Present your solution to the judges and win big."
              color="accent"
            />
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default About;
