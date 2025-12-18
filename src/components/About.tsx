import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, Clock, Cpu, Zap } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Hackers" },
  { icon: Clock, value: "48", label: "Hours" },
  { icon: Cpu, value: "100+", label: "Projects" },
  { icon: Zap, value: "10K", label: "INR" },
];

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-neon-cyan/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <span className="font-mono text-sm text-neon-cyan mb-4 block tracking-widest">
            // ABOUT THE EVENT
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-6 gradient-text-cyber">
            JACK INTO THE NET
          </h2>
          <p className="font-rajdhani text-lg md:text-xl text-muted-foreground leading-relaxed">
            Welcome to <span className="text-primary">HacksWithMagnus</span> — the most legendary 
            hackathon in Night City. For 48 hours straight, the best netrunners, 
            techies, and chooms gather to build groundbreaking tech that'll change 
            the dark future. Whether you're crafting AI systems, designing cyberware, 
            or hacking together the next big thing, this is where legends are made.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-6 border border-neon-cyan/20 rounded-lg bg-card/50 backdrop-blur-sm hover:border-neon-cyan/50 hover:box-glow-cyan transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <stat.icon className="w-8 h-8 text-neon-magenta mb-3 group-hover:scale-110 transition-transform" />
                <span className="font-orbitron text-3xl md:text-4xl font-bold text-primary text-glow-cyan">
                  {stat.value}
                </span>
                <span className="font-mono text-xs text-muted-foreground mt-1 tracking-widest uppercase">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature boxes */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "NETWORK",
              desc: "Connect with elite netrunners, corporate fixers, and indie devs from across Night City.",
            },
            {
              title: "CREATE",
              desc: "48 hours to build anything — AI assistants, cyberware apps, security tools, or wild experiments.",
            },
            {
              title: "COMPETE",
              desc: "Compete for over ₹10K in prizes across multiple tracks and categories.",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="p-6 border border-neon-magenta/20 rounded-lg bg-card/30 backdrop-blur-sm hover:border-neon-magenta/50 hover:box-glow-magenta transition-all duration-300"
            >
              <h3 className="font-orbitron text-xl font-bold text-neon-magenta mb-3">
                {feature.title}
              </h3>
              <p className="font-rajdhani text-muted-foreground">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
