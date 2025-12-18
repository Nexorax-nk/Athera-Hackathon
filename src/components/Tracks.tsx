import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Blocks,
  CreditCard,
  GraduationCap,
  HeartPulse,
  Leaf,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import GlitchText from "./GlitchText";

interface Track {
  icon: LucideIcon;
  title: string;
  description: string;
  prize: string;
  color: "cyan" | "magenta" | "yellow";
}

const tracks: Track[] = [
  {
    icon: Blocks,
    title: "WEB3 & BLOCKCHAIN",
    description:
      "Decentralized applications, smart contracts, DAOs, NFTs, and trustless systems shaping the future of the internet.",
    prize: "TRACK PRIZES",
    color: "cyan",
  },
  {
    icon: CreditCard,
    title: "FINTECH",
    description:
      "Payments, digital banking, lending, fraud detection, and financial inclusion for the next billion users.",
    prize: "TRACK PRIZES",
    color: "magenta",
  },
  {
    icon: GraduationCap,
    title: "EDUTECH",
    description:
      "Innovative learning platforms, AI tutors, assessment tools, and systems that transform education.",
    prize: "TRACK PRIZES",
    color: "yellow",
  },
  {
    icon: HeartPulse,
    title: "HEALTHTECH",
    description:
      "Healthcare innovation including diagnostics, fitness, mental health, patient care, and medical data systems.",
    prize: "TRACK PRIZES",
    color: "cyan",
  },
  {
    icon: Leaf,
    title: "GREENTECH & SUSTAINABILITY",
    description:
      "Solutions for climate action, renewable energy, waste management, sustainability, and green innovation.",
    prize: "TRACK PRIZES",
    color: "magenta",
  },
  {
    icon: Rocket,
    title: "OPEN INNOVATION",
    description:
      "Any bold, impactful idea that doesn’t fit a single category but solves real-world problems creatively.",
    prize: "TRACK PRIZES",
    color: "yellow",
  },
];

const colorClasses = {
  cyan: {
    border: "border-neon-cyan/30 hover:border-neon-cyan",
    icon: "text-neon-cyan",
    glow: "hover:box-glow-cyan",
    badge: "bg-neon-cyan/20 text-neon-cyan",
  },
  magenta: {
    border: "border-neon-magenta/30 hover:border-neon-magenta",
    icon: "text-neon-magenta",
    glow: "hover:box-glow-magenta",
    badge: "bg-neon-magenta/20 text-neon-magenta",
  },
  yellow: {
    border: "border-accent/30 hover:border-accent",
    icon: "text-accent",
    glow: "hover:shadow-[0_0_30px_hsl(var(--accent)/0.3)]",
    badge: "bg-accent/20 text-accent",
  },
};

const Tracks = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="tracks" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid bg-grid-40 opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-neon-magenta mb-4 block tracking-widest">
            // COMPETITION TRACKS
          </span>

          <GlitchText
            glitchOnMount={true}
            className="font-orbitron text-3xl md:text-5xl font-extrabold mb-4 tracking-widest uppercase text-neon-cyan drop-shadow-[0_0_25px_hsl(var(--neon-cyan))]"
          >
            CHOOSE YOUR PATH
          </GlitchText>

          <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our themed tracks and build solutions that create real-world
            impact. Pick your domain and start hacking.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, index) => {
            const classes = colorClasses[track.color];
            return (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative p-6 border rounded-lg bg-card/30 backdrop-blur-sm ${classes.border} ${classes.glow} transition-all duration-300`}
              >
                <track.icon
                  className={`w-10 h-10 ${classes.icon} mb-4 group-hover:scale-110 transition-transform`}
                />

                <h3 className="font-orbitron text-lg font-bold text-foreground mb-2">
                  {track.title}
                </h3>

                <p className="font-rajdhani text-muted-foreground mb-4 text-sm">
                  {track.description}
                </p>

                <div
                  className={`inline-block px-3 py-1 rounded-full font-mono text-xs uppercase tracking-wider ${classes.badge}`}
                >
                  {track.prize}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tracks;
