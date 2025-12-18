import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Globe, Coins, BookOpen, Heart, Leaf, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import GlitchText from "./GlitchText";

interface Track {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "cyan" | "magenta" | "yellow";
}

const tracks: Track[] = [
  {
    icon: Globe,
    title: "WEB3 & BLOCKCHAIN",
    description: "Build decentralized applications, smart contracts, and blockchain-based solutions that redefine trust and transparency.",
    color: "cyan",
  },
  {
    icon: Coins,
    title: "FINTECH",
    description: "Create innovative financial technology solutions — digital payments, banking, investment platforms, and more.",
    color: "magenta",
  },
  {
    icon: BookOpen,
    title: "EDUTECH",
    description: "Transform education with technology — e-learning platforms, adaptive learning, gamification, and accessibility tools.",
    color: "yellow",
  },
  {
    icon: Heart,
    title: "HEALTHTECH",
    description: "Revolutionize healthcare with digital health solutions, telemedicine, health monitoring, and patient management systems.",
    color: "cyan",
  },
  {
    icon: Leaf,
    title: "GREENTECH & SUSTAINABILITY",
    description: "Address environmental challenges with sustainable tech solutions — clean energy, waste management, and eco-friendly innovations.",
    color: "magenta",
  },
  {
    icon: Lightbulb,
    title: "OPEN INNOVATION",
    description: "Got a unique idea that doesn't fit the other categories? This track is for creative, out-of-the-box solutions.",
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
            // CHOOSE YOUR DOMAIN
          </span>
          <GlitchText
            glitchOnMount={true}
            className="font-orbitron text-3xl md:text-5xl font-extrabold mb-4 tracking-widest uppercase text-neon-cyan drop-shadow-[0_0_25px_hsl(var(--neon-cyan))]"
          >
            INNOVATION DOMAINS
          </GlitchText>

          <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto">
            Six domains. Endless possibilities. Pick your area of expertise and build solutions that matter.
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
                
                <p className="font-rajdhani text-muted-foreground text-sm">
                  {track.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tracks;