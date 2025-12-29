import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Trophy, Medal, Crown, Sparkles } from "lucide-react";

const prizeData = [
  {
    place: "1st",
    title: "CHAMPION",
    icon: Trophy,
    color: "gold",
    prize: "₹15,000",
    desc: "Certificates",
    gradient: "from-yellow-300 via-amber-400 to-yellow-600",
    glow: "shadow-[0_0_50px_rgba(255,215,0,0.4)]",
    border: "border-yellow-400/50",
    text: "text-yellow-400",
  },
  {
    place: "2nd",
    title: "RUNNER UP",
    icon: Medal,
    color: "silver",
    prize: "₹10,000",
    desc: "Certificates",
    gradient: "from-slate-300 via-slate-100 to-slate-400",
    glow: "shadow-[0_0_50px_rgba(192,192,192,0.2)]",
    border: "border-slate-300/50",
    text: "text-slate-300",
  },
  {
    place: "3rd",
    title: "2nd RUNNER UP",
    icon: Medal,
    color: "bronze",
    prize: "₹5,000",
    desc: "Certificates",
    gradient: "from-orange-300 via-amber-600 to-orange-800",
    glow: "shadow-[0_0_50px_rgba(205,127,50,0.2)]",
    border: "border-orange-500/50",
    text: "text-orange-500",
  },
];

const WinnerSpotlight = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none z-0">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="w-full h-full bg-gradient-conic from-transparent via-yellow-500/10 to-transparent opacity-50"
    />
  </div>
);

const PrizeCard = ({ prize, index, inView }) => {
  const Icon = prize.icon;
  const isFirst = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative z-10 ${isFirst ? 'md:-mt-12' : ''}`} // Push 1st place UP on desktop
    >
      {/* 1st Place Special Effects */}
      {isFirst && <WinnerSpotlight />}

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index }}
        className={`
            relative p-1 rounded-2xl overflow-hidden group
            ${isFirst ? 'scale-110 md:scale-125' : 'scale-100'}
        `}
      >
        {/* Animated Gradient Border */}
        <div className={`absolute inset-0 bg-gradient-to-br ${prize.gradient} opacity-20 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Inner Card */}
        <div className={`
            relative h-full bg-black/80 backdrop-blur-xl rounded-xl p-6 md:p-8 flex flex-col items-center text-center border
            ${prize.border} ${prize.glow}
        `}>
          
          {/* Floating Icon */}
          <div className="relative mb-6">
            <div className={`absolute inset-0 bg-gradient-to-r ${prize.gradient} blur-xl opacity-40`} />
            <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${prize.gradient} p-0.5`}>
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                 <Icon className={`w-8 h-8 md:w-10 md:h-10 ${prize.text}`} />
              </div>
            </div>
            {isFirst && (
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-4 -right-4 text-yellow-400"
                >
                    <Crown className="w-8 h-8 fill-current" />
                </motion.div>
            )}
          </div>

          <h3 className={`font-orbitron font-bold text-lg mb-1 tracking-widest ${prize.text}`}>
            {prize.title}
          </h3>
          
          <div className={`text-4xl md:text-5xl font-black font-orbitron mb-4 text-transparent bg-clip-text bg-gradient-to-b ${prize.gradient}`}>
            {prize.prize}
          </div>

          <div className="h-px w-full bg-white/10 mb-4" />

          <p className="font-rajdhani text-sm text-muted-foreground uppercase tracking-wider">
            {prize.desc}
          </p>

          {/* Shine Effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Prizes = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="prizes" className="py-24 relative overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-cyber-grid bg-grid-40 opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
             <Sparkles className="text-yellow-400 w-6 h-6 animate-pulse" />
             <h2 className="font-orbitron text-3xl md:text-5xl font-bold gradient-text-gold">
                PRIZE POOL
             </h2>
             <Sparkles className="text-yellow-400 w-6 h-6 animate-pulse" />
          </div>
          <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto">
            Code your way to glory. The stakes have never been higher.
          </p>
        </motion.div>

        {/* Podium Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 max-w-6xl mx-auto pt-10">
          
          {/* 2nd Place (Left) */}
          <div className="order-2 md:order-1 w-full max-w-sm md:mt-16">
            <PrizeCard prize={prizeData[1]} index={1} inView={inView} />
          </div>

          {/* 1st Place (Center - Prominent) */}
          <div className="order-1 md:order-2 w-full max-w-sm z-20">
            <PrizeCard prize={prizeData[0]} index={0} inView={inView} />
          </div>

          {/* 3rd Place (Right) */}
          <div className="order-3 md:order-3 w-full max-w-sm md:mt-16">
            <PrizeCard prize={prizeData[2]} index={2} inView={inView} />
          </div>
          
        </div>

      </div>
    </section>
  );
};

export default Prizes;