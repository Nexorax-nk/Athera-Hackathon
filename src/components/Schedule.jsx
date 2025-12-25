import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FileText, Code, Trophy } from "lucide-react";

const rounds = [
  {
    round: "ROUND 1",
    title: "PPT Submission",
    date: "Dates to be announced",
    description: "Teams must submit a detailed presentation outlining the problem statement, proposed solution, features, technology stack, expected impact, and feasibility. Shortlisted teams will be promoted to Round 2.",
    icon: FileText,
    highlight: false,
  },
  {
    round: "ROUND 2",
    title: "Prototype Submission",
    date: "Dates to be announced",
    description: "Shortlisted teams will develop and submit an early-stage working prototype demonstrating the core functionalities. Evaluation based on innovation, clarity, and technical implementation.",
    icon: Code,
    highlight: false,
  },
  {
    round: "ROUND 3",
    title: "Offline Final Round",
    date: "February 2, 2026",
    description: "Conducted offline at Chennai Institute of Technology. 8-hour hackathon to refine prototype, followed by presentation and live demo to the judging panel.",
    icon: Trophy,
    highlight: true,
  },
];

const RoundCard = ({ round, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const Icon = round.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      {/* Timeline connector */}
      {index < rounds.length - 1 && (
        <div className="hidden md:block absolute left-1/2 top-full w-0.5 h-16 bg-gradient-to-b from-neon-cyan to-neon-magenta transform -translate-x-1/2 z-0" />
      )}
      
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className={`relative p-6 md:p-8 rounded-lg border backdrop-blur-sm transition-all duration-300 ${
          round.highlight 
            ? 'border-neon-cyan bg-neon-cyan/10 box-glow-cyan'
            : 'border-neon-cyan/30 bg-card/50 hover:border-neon-cyan/60'
        }`}
      >
        {/* Round badge */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${
            round.highlight 
              ? 'bg-neon-cyan/20 border-2 border-neon-cyan' 
              : 'bg-card border border-border/50'
          }`}>
            <Icon className={`w-7 h-7 ${round.highlight ? 'text-neon-cyan' : 'text-primary'}`} />
          </div>
          <div>
            <span className="font-mono text-xs text-neon-magenta font-semibold block">
              {round.round}
            </span>
            {/* Reverted to original: no gradient */}
            <h3 className="font-orbitron font-bold text-xl text-foreground">
              {round.title}
            </h3>
          </div>
        </div>

        {/* Date */}
        <div className={`inline-block px-3 py-1 rounded-full font-mono text-xs mb-4 ${
          round.highlight 
            ? 'bg-neon-cyan/20 text-neon-cyan' 
            : 'bg-neon-magenta/20 text-neon-magenta'
        }`}>
          {round.date}
        </div>

        {/* Description */}
        <p className="font-rajdhani text-muted-foreground leading-relaxed">
          {round.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Schedule = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="schedule" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-neon-magenta/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          
          {/* Only this one keeps the special pink-violet-purple gradient */}
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-4 gradient-text-pinkviolet">
            THREE ROUNDS
          </h2>
          <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto">
            From idea to prototype to final demo. Prove yourself through each stage of the competition.
          </p>
        </motion.div>

        {/* Rounds Timeline */}
        <div className="max-w-3xl mx-auto space-y-8">
          {rounds.map((round, index) => (
            <RoundCard
              key={round.round}
              round={round}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;