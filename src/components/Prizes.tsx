import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Trophy, Medal, Award, Gift } from "lucide-react";

const prizes = [
  {
    place: "1ST",
    title: "WINNER",
    amount: "10000",
    icon: Trophy,
    color: "from-yellow-400 to-amber-600",
    glow: "shadow-[0_0_60px_hsl(45,100%,50%,0.3)]",
    perks: ["Cash prize", "Arasaka sponsorship", "Feature in Night City Weekly"],
  },
  {
    place: "2ND",
    title: "RUNNER UP",
    amount: "5000",
    icon: Medal,
    color: "from-slate-300 to-slate-500",
    glow: "shadow-[0_0_40px_hsl(0,0%,70%,0.3)]",
    perks: ["Cash prize", "Premium hardware", "Militech internship offer"],
  },
  {
    place: "3RD",
    title: "THIRD PLACE",
    amount: "2000",
    icon: Award,
    color: "from-amber-600 to-amber-800",
    glow: "shadow-[0_0_40px_hsl(30,100%,40%,0.3)]",
    perks: ["Cash prize", "Tech swag pack", "Conference passes"],
  },
];

const Prizes = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="prizes" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid bg-grid-40 opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-accent mb-4 block tracking-widest">
            // WHAT YOU'RE FIGHTING FOR
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">OVER </span>
            <span className="text-accent text-glow-yellow animate-pulse-glow">10000</span>
            <span className="text-foreground"> INR</span>

          </h2>
          <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto">
            Plus hardware, sponsor deals, and bragging rights across Night City.
          </p>
        </motion.div>

        {/* Main prizes */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {prizes.map((prize, index) => (
            <motion.div
              key={prize.place}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative p-8 border border-accent/30 rounded-lg bg-card/50 backdrop-blur-sm hover:border-accent/60 ${prize.glow} transition-all duration-300`}
            >
              <div className={`inline-flex p-3 rounded-full bg-gradient-to-br ${prize.color} mb-4`}>
                <prize.icon className="w-8 h-8 text-background" />
              </div>
              
              <div className="font-mono text-xs text-muted-foreground mb-1">
                {prize.place} PLACE
              </div>
              
              <h3 className="font-orbitron text-xl font-bold text-foreground mb-2">
                {prize.title}
              </h3>
              
             <div className="font-orbitron text-4xl font-black gradient-text-sunset mb-4">
  ₹{prize.amount}
</div>

              
              <ul className="space-y-2">
                {prize.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 font-rajdhani text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {perk}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default Prizes;
