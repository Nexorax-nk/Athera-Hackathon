import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Brain, Cpu, Wrench, Sparkles, Shield, Rocket } from "lucide-react";
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
    icon: Rocket,
    title: "BEST OVERALL",
    description: "The most impressive, innovative, and polished project wins the grand prize. Show us your best work, choom.",
    prize: "500,000 eddies",
    color: "cyan",
  },
  {
    icon: Brain,
    title: "BEST AI / CYBERWARE",
    description: "Push the boundaries of artificial intelligence and human augmentation tech. Neural networks, brain-dances, whatever.",
    prize: "200,000 eddies",
    color: "magenta",
  },
  {
    icon: Wrench,
    title: "BEST HARDWARE",
    description: "Physical builds, IoT devices, robotics, and anything you can touch. Make something that moves in meatspace.",
    prize: "150,000 eddies",
    color: "yellow",
  },
  {
    icon: Shield,
    title: "BEST SECURITY",
    description: "ICE breakers, encryption tools, privacy systems. Protect the net or crack it — your choice.",
    prize: "100,000 eddies",
    color: "cyan",
  },
  {
    icon: Sparkles,
    title: "BEGINNER TRACK",
    description: "First time hacking? No problem. We've got a dedicated track for newcomers making their mark.",
    prize: "50,000 eddies",
    color: "magenta",
  },
  {
    icon: Cpu,
    title: "WILDCARD",
    description: "Doesn't fit the other categories? Perfect. The most creative, weird, and unexpected project wins.",
    prize: "50,000 eddies",
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
            Six tracks. Six ways to prove yourself. Pick your category and show Night City what you've got.
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
                <track.icon className={`w-10 h-10 ${classes.icon} mb-4 group-hover:scale-110 transition-transform`} />
                
                <h3 className="font-orbitron text-lg font-bold text-foreground mb-2">
                  {track.title}
                </h3>
                
                <p className="font-rajdhani text-muted-foreground mb-4 text-sm">
                  {track.description}
                </p>
                
                <div className={`inline-block px-3 py-1 rounded-full font-mono text-xs uppercase tracking-wider ${classes.badge}`}>
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
