import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Trophy, Medal, Award } from "lucide-react";

const prizeData = [
  {
    place: "1st",
    title: "WINNER",
    icon: Trophy,
    gradient: "from-yellow-400 to-amber-500",
    borderColor: "border-yellow-400/50",
    glowColor: "shadow-[0_0_60px_hsl(45,100%,50%,0.3)]",
    textColor: "text-yellow-400",
    prize: "To be announced",
    scale: "md:scale-110",
  },
  {
    place: "2nd",
    title: "RUNNER UP",
    icon: Medal,
    gradient: "from-slate-300 to-slate-400",
    borderColor: "border-slate-300/50",
    glowColor: "shadow-[0_0_40px_hsl(210,10%,70%,0.3)]",
    textColor: "text-slate-300",
    prize: "To be announced",
    scale: "",
  },
  {
    place: "3rd",
    title: "SECOND RUNNER UP",
    icon: Award,
    gradient: "from-amber-600 to-amber-700",
    borderColor: "border-amber-600/50",
    glowColor: "shadow-[0_0_40px_hsl(30,80%,40%,0.3)]",
    textColor: "text-amber-500",
    prize: "To be announced",
    scale: "",
  },
];

const PrizeCard = ({ prize, index, inView }: { prize: typeof prizeData[0]; index: number; inView: boolean }) => {
  const Icon = prize.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
      className={`relative ${prize.scale}`}
    >
      <div className={`relative p-6 md:p-8 border ${prize.borderColor} rounded-lg bg-card/50 backdrop-blur-sm ${prize.glowColor} hover:scale-105 transition-all duration-300`}>
        {/* Decorative corners */}
        <div className={`absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 ${prize.borderColor} rounded-tl-lg`} />
        <div className={`absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 ${prize.borderColor} rounded-tr-lg`} />
        <div className={`absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 ${prize.borderColor} rounded-bl-lg`} />
        <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 ${prize.borderColor} rounded-br-lg`} />

        <div className="flex flex-col items-center text-center">
          {/* Place badge */}
          <span className={`font-orbitron text-4xl md:text-5xl font-black ${prize.textColor} mb-2`}>
            {prize.place}
          </span>
          
          {/* Icon */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: index === 0 ? [0, 5, -5, 0] : 0,
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className={`inline-flex p-3 md:p-4 rounded-full bg-gradient-to-br ${prize.gradient} mb-4`}
          >
            <Icon className="w-8 h-8 md:w-10 md:h-10 text-background" />
          </motion.div>
          
          {/* Title */}
          <h3 className={`font-orbitron text-lg md:text-xl font-bold ${prize.textColor} mb-3`}>
            {prize.title}
          </h3>
          
          {/* Prize */}
          <p className="font-rajdhani text-sm md:text-base text-muted-foreground">
            {prize.prize}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

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
            // REWARDS
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-4 gradient-text-cyber">
            PRIZES
          </h2>
          <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto">
            Compete for recognition and amazing rewards!
          </p>
        </motion.div>

        {/* Prize Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto items-center">
          {/* 2nd place - left on desktop */}
          <div className="order-2 md:order-1">
            <PrizeCard prize={prizeData[1]} index={1} inView={inView} />
          </div>
          
          {/* 1st place - center */}
          <div className="order-1 md:order-2">
            <PrizeCard prize={prizeData[0]} index={0} inView={inView} />
          </div>
          
          {/* 3rd place - right on desktop */}
          <div className="order-3">
            <PrizeCard prize={prizeData[2]} index={2} inView={inView} />
          </div>
        </div>

        {/* Additional note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 font-rajdhani text-muted-foreground"
        >
          Certificates and special recognition for all participants!
        </motion.p>
      </div>
    </section>
  );
};

export default Prizes;
