import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const sponsors = {
  platinum: [
    { name: "ARASAKA", tagline: "Your Dreams, Our Reality" },
    { name: "MILITECH", tagline: "Freedom Has A Price" },
  ],
  gold: [
    { name: "KANG TAO", tagline: "Smart Weapons" },
    { name: "BIOTECHNICA", tagline: "Life Sciences" },
    { name: "PETROCHEM", tagline: "Energy Solutions" },
  ],
  silver: [
    { name: "ZETATECH", tagline: "" },
    { name: "SOFTSYS", tagline: "" },
    { name: "NETWATCH", tagline: "" },
    { name: "TRAUMA TEAM", tagline: "" },
  ],
};

const Sponsors = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="sponsors" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-neon-magenta/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-neon-magenta mb-4 block tracking-widest">
            // OUR BACKERS
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-4 gradient-text-sunset">
            SPONSORS
          </h2>
          <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto">
            The corps and fixers making this possible. Without them, no eddies.
          </p>
        </motion.div>

        {/* Platinum */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-accent" />
            <span className="font-mono text-xs text-accent tracking-widest">PLATINUM</span>
            <div className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent to-accent" />
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {sponsors.platinum.map((sponsor) => (
              <div
                key={sponsor.name}
                className="group w-64 p-8 border border-accent/30 rounded-lg bg-card/30 backdrop-blur-sm hover:border-accent hover:shadow-[0_0_40px_hsl(var(--accent)/0.3)] transition-all duration-300"
              >
                <div className="font-orbitron text-2xl font-bold text-accent text-center group-hover:text-glow-yellow transition-all">
                  {sponsor.name}
                </div>
                <div className="font-mono text-xs text-muted-foreground text-center mt-2">
                  {sponsor.tagline}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gold */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-neon-magenta" />
            <span className="font-mono text-xs text-neon-magenta tracking-widest">GOLD</span>
            <div className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent to-neon-magenta" />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {sponsors.gold.map((sponsor) => (
              <div
                key={sponsor.name}
                className="group w-48 p-6 border border-neon-magenta/30 rounded-lg bg-card/30 backdrop-blur-sm hover:border-neon-magenta hover:box-glow-magenta transition-all duration-300"
              >
                <div className="font-orbitron text-lg font-bold text-neon-magenta text-center">
                  {sponsor.name}
                </div>
                {sponsor.tagline && (
                  <div className="font-mono text-xs text-muted-foreground text-center mt-1">
                    {sponsor.tagline}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Silver */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-neon-cyan" />
            <span className="font-mono text-xs text-neon-cyan tracking-widest">SILVER</span>
            <div className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent to-neon-cyan" />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {sponsors.silver.map((sponsor) => (
              <div
                key={sponsor.name}
                className="group w-36 p-4 border border-neon-cyan/30 rounded-lg bg-card/30 backdrop-blur-sm hover:border-neon-cyan transition-all duration-300"
              >
                <div className="font-orbitron text-sm font-bold text-neon-cyan text-center">
                  {sponsor.name}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Become a sponsor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="font-rajdhani text-muted-foreground mb-4">
            Want to back Night City's biggest hackathon?
          </p>
          <a
            href="mailto:sponsors@hackswithmagnus.nc"
            className="inline-block px-6 py-3 font-orbitron font-semibold text-sm border border-neon-cyan text-neon-cyan rounded hover:bg-neon-cyan/10 transition-all"
          >
            BECOME A SPONSOR
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
