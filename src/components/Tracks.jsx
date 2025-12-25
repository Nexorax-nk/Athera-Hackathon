import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Globe, Coins, BookOpen, Heart, Leaf } from "lucide-react";

const tracks = [
  {
    icon: Globe,
    title: "WEB3 & BLOCKCHAIN",
    description:
      "Build decentralized applications, smart contracts, and blockchain-based solutions that redefine trust and transparency.",
    color: "cyan",
    position: "top-left",
  },
  {
    icon: Coins,
    title: "FINTECH",
    description:
      "Create innovative financial technology solutions — digital payments, banking, investment platforms, and more.",
    color: "magenta",
    position: "top-right",
  },
  {
    icon: BookOpen,
    title: "EDUTECH",
    description:
      "Transform education with technology — e-learning platforms, adaptive learning, gamification, and accessibility tools.",
    color: "yellow",
    position: "center",
  },
  {
    icon: Heart,
    title: "HEALTHTECH",
    description:
      "Revolutionize healthcare with digital health solutions, telemedicine, health monitoring, and patient management systems.",
    color: "cyan",
    position: "bottom-left",
  },
  {
    icon: Leaf,
    title: "GREENTECH & SUSTAINABILITY",
    description:
      "Address environmental challenges with sustainable tech solutions — clean energy, waste management, and eco-friendly innovations.",
    color: "magenta",
    position: "bottom-right",
  },
];

const colorClasses = {
  cyan: {
    border: "border-neon-cyan/30 hover:border-neon-cyan",
    icon: "text-neon-cyan",
    glow: "hover:box-glow-cyan",
  },
  magenta: {
    border: "border-neon-magenta/30 hover:border-neon-magenta",
    icon: "text-neon-magenta",
    glow: "hover:box-glow-magenta",
  },
  yellow: {
    border: "border-accent/30 hover:border-accent",
    icon: "text-accent",
    glow: "hover:shadow-[0_0_30px_hsl(var(--accent)/0.3)]",
  },
};

const positionClasses = {
  "top-left": "lg:col-start-1 lg:row-start-1",
  "top-right": "lg:col-start-3 lg:row-start-1",
  center: "lg:col-start-2 lg:row-start-2",
  "bottom-left": "lg:col-start-1 lg:row-start-3",
  "bottom-right": "lg:col-start-3 lg:row-start-3",
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
         

          {/* Section title "INNOVATION DOMAINS" now has the pink-violet-purple gradient */}
          <h2 className="font-orbitron text-3xl md:text-5xl font-extrabold mb-4 tracking-widest uppercase gradient-text-pinkviolet">
            INNOVATION DOMAINS
          </h2>

          <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto">
            Pick your area of expertise and build solutions that matter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 gap-6 place-items-center">
          {tracks.map((track, index) => {
            const colors = colorClasses[track.color];
            const layout = positionClasses[track.position];

            return (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`w-full max-w-sm group p-6 border rounded-lg bg-card/30 backdrop-blur-sm ${colors.border} ${colors.glow} transition-all duration-300 ${layout}`}
              >
                <track.icon
                  className={`w-10 h-10 ${colors.icon} mb-4 group-hover:scale-110 transition-transform`}
                />

                {/* Domain titles remain original color (no gradient) */}
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