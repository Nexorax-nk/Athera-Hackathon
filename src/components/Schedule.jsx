import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { FileText, Code, Trophy } from "lucide-react";

// --- DATA ---
const rounds = [
  {
    id: "01",
    round: "ROUND 1",
    title: "IDEATION PHASE",
    subtitle: "PPT Submission",
    date: "Jan 08, 2026 - Jan 17, 2026",
    description: "Submit a detailed presentation outlining your problem statement, solution architecture, and tech stack.",
    icon: FileText,
    color: "cyan", 
  },
  {
    id: "02",
    round: "ROUND 2",
    title: "PROTOTYPING",
    subtitle: "Code Submission",
    date: "Jan 18, 2026 - Jan 29, 2026",
    description: "Build an MVP. Shortlisted teams must demonstrate core functionalities of their proposed solution.",
    icon: Code,
    color: "magenta", 
  },
  {
    id: "03",
    round: "ROUND 3",
    title: "GRAND FINALE",
    subtitle: "Offline Hackathon",
    date: "Feb 2, 2026",
    description: "The final showdown at Chennai Institute of Technology. 6 hours to refine, deploy, and pitch to the jury.",
    icon: Trophy,
    color: "yellow", 
  },
];

// --- THEME ENGINE ---
const getTheme = (color) => {
  const themes = {
    cyan: { 
        main: "#00f0ff", 
        bg: "rgba(0, 240, 255, 0.1)", 
        border: "rgba(0, 240, 255, 0.5)", 
        glow: "shadow-[0_0_30px_rgba(0,240,255,0.3)]" 
    },
    magenta: { 
        main: "#ff00aa", 
        bg: "rgba(255, 0, 170, 0.1)", 
        border: "rgba(255, 0, 170, 0.5)", 
        glow: "shadow-[0_0_30px_rgba(255,0,170,0.3)]" 
    },
    yellow: { 
        main: "#fbbf24", 
        bg: "rgba(251, 191, 36, 0.1)", 
        border: "rgba(251, 191, 36, 0.5)", 
        glow: "shadow-[0_0_30px_rgba(251,191,36,0.3)]" 
    },
  };
  return themes[color];
};

// --- COMPONENT: TIMELINE CARD ---
const TimelineCard = ({ round, index, isLeft }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const theme = getTheme(round.color);
  const Icon = round.icon;

  return (
    <div ref={ref} className={`flex items-center justify-between w-full mb-16 md:mb-24 ${isLeft ? "flex-row-reverse" : ""}`}>
      
      {/* 1. EMPTY SPACE (for layout balance) */}
      <div className="hidden md:block w-5/12" />

      {/* 2. CENTER NODE (The Glowing Orb) */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
           {/* Outer Ring */}
           <div 
             className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 bg-black flex items-center justify-center z-10"
             style={{ borderColor: theme.main, boxShadow: `0 0 20px ${theme.main}` }}
           >
              {/* Inner Dot */}
              <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full animate-pulse" />
           </div>
           
           {/* Ripple Effect */}
           <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: theme.main }} />
        </motion.div>
      </div>

      {/* 3. CONTENT CARD */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full md:w-5/12 pl-16 md:pl-0"
      >
         <div 
            className="relative p-6 md:p-8 rounded-xl backdrop-blur-md bg-black/40 border border-white/10 group hover:-translate-y-1 transition-transform duration-300"
         >
            {/* Hover Glow Border */}
            <div className="absolute inset-0 rounded-xl border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                 style={{ borderColor: theme.main, boxShadow: `inset 0 0 20px ${theme.bg}` }} 
            />

            {/* Tech Corner Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 opacity-50" style={{ borderColor: theme.main }} />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 opacity-50" style={{ borderColor: theme.main }} />

            {/* Glowing Connector Line (Desktop Only) */}
            <div 
                className={`hidden md:block absolute top-10 ${isLeft ? "-right-12" : "-left-12"} w-12 h-0.5 opacity-50`}
                style={{ backgroundColor: theme.main, boxShadow: `0 0 10px ${theme.main}` }}
            />
            
            {/* Card Content */}
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                   {/* Icon Box */}
                   <div 
                     className="p-3 rounded-lg bg-white/5 border border-white/10"
                     style={{ color: theme.main }}
                   >
                      <Icon className="w-6 h-6" />
                   </div>
                   {/* Giant Background Number */}
                   <span className="font-orbitron text-5xl font-black text-white/5 select-none absolute right-0 top-0">
                      {round.id}
                   </span>
                </div>

                <div className="flex items-center gap-3 mb-2">
                    <span 
                        className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest border"
                        style={{ borderColor: theme.main, color: theme.main, backgroundColor: theme.bg }}
                    >
                        {round.round}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                        {round.date}
                    </span>
                </div>

                <h3 className="font-orbitron text-2xl font-bold text-white mb-1">
                   {round.title}
                </h3>
                <p className="font-rajdhani font-semibold text-lg mb-4" style={{ color: theme.main }}>
                   {round.subtitle}
                </p>

                <div className="h-px w-full bg-white/10 mb-4" />

                <p className="font-rajdhani text-gray-400 leading-relaxed text-sm md:text-base">
                   {round.description}
                </p>
            </div>
         </div>
      </motion.div>

    </div>
  );
};

const Schedule = () => {
  const containerRef = useRef(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="schedule" className="py-24 relative overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-magenta/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-cyan/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
             <span className="font-mono text-xs text-neon-cyan tracking-[0.2em] uppercase">
                System Roadmap
             </span>
          </div>
          <h2 className="font-orbitron text-4xl md:text-6xl font-black mb-6">
            <span className="text-white">EVENT</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-purple-500 to-neon-magenta">TIMELINE</span>
          </h2>
          <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto">
            Your strategic path from concept to deployment.
          </p>
        </motion.div>

        {/* Timeline Core */}
        <div ref={containerRef} className="relative max-w-6xl mx-auto">
            
            {/* CENTRAL BEAM (Desktop: Center / Mobile: Left) */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2">
                {/* The Filling Beam */}
                <motion.div 
                    style={{ height: lineHeight }}
                    className="w-full bg-gradient-to-b from-neon-cyan via-neon-magenta to-yellow-400 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                />
            </div>

            {/* Rounds */}
            <div className="relative z-10">
                {rounds.map((round, index) => (
                    <TimelineCard
                        key={round.id}
                        round={round}
                        index={index}
                        isLeft={index % 2 === 0} // Alternates Left/Right on Desktop
                    />
                ))}
            </div>

            {/* End Cap */}
            <div className="absolute left-4 md:left-1/2 bottom-0 w-4 h-4 bg-white rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_20px_white]" />
        </div>

      </div>
    </section>
  );
};

export default Schedule;