import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Globe, Coins, Heart, Leaf, Cpu } from "lucide-react";

// 1. DATA: Using the specific content from your second version
const tracks = [
  {
    id: "edutech",
    icon: Globe,
    title: "EDUTECH",
    description: "Transform education with immersive technology and digital learning.",
    color: "cyan", 
    position: "top-left",
  },
  {
    id: "fintech",
    icon: Coins,
    title: "FINTECH",
    description: "Create innovative financial technology and secure payments.",
    color: "gold", 
    position: "top-right",
  },
  {
    id: "health",
    icon: Heart,
    title: "HEALTHTECH",
    description: "Revolutionize healthcare with smart digital health solutions.",
    color: "red", 
    position: "bottom-left",
  },
  {
    id: "green",
    icon: Leaf,
    title: "SUSTAINABILITY",
    description: "Address environmental challenges with green tech solutions.",
    color: "green", 
    position: "bottom-right",
  },
];

const getTheme = (color) => {
  const themes = {
    cyan:   { main: "#00f0ff", glow: "0, 240, 255" },
    gold:   { main: "#fbbf24", glow: "251, 191, 36" },
    red:    { main: "#f43f5e", glow: "244, 63, 94" },
    green:  { main: "#10b981", glow: "16, 185, 129" },
    violet: { main: "#8b5cf6", glow: "139, 92, 246" },
  };
  return themes[color] || themes.cyan;
};

const positionClasses = {
  "top-left": "lg:col-start-1 lg:row-start-1",
  "top-right": "lg:col-start-3 lg:row-start-1",
  "bottom-left": "lg:col-start-1 lg:row-start-3",
  "bottom-right": "lg:col-start-3 lg:row-start-3",
};

// --- COMPONENT: HUD CORNER ACCENTS ---
const CornerAccents = ({ color, active }) => (
  <>
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-all duration-300" 
         style={{ borderColor: color, filter: `drop-shadow(0 0 ${active ? '8px' : '2px'} ${color})` }} />
    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 transition-all duration-300" 
         style={{ borderColor: color, filter: `drop-shadow(0 0 ${active ? '8px' : '2px'} ${color})` }} />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 transition-all duration-300" 
         style={{ borderColor: color, filter: `drop-shadow(0 0 ${active ? '8px' : '2px'} ${color})` }} />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-all duration-300" 
         style={{ borderColor: color, filter: `drop-shadow(0 0 ${active ? '8px' : '2px'} ${color})` }} />
  </>
);

// --- COMPONENT: CENTRAL HUB ---
const DomainCore = () => {
  return (
    <div className="lg:col-start-2 lg:row-start-2 flex items-center justify-center z-30">
      <div className="relative w-64 h-64 flex items-center justify-center">
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-dashed border-violet-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="relative w-44 h-44 rounded-full bg-black border border-violet-500/50 flex flex-col items-center justify-center shadow-[0_0_60px_-15px_rgba(139,92,246,0.6)]"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
          <Cpu className="w-10 h-10 mb-2 text-violet-400 z-10" />
          <h3 className="font-orbitron text-2xl font-black text-white tracking-[0.15em] z-10">DOMAIN</h3>
          <span className="text-[10px] text-violet-300/60 font-mono z-10 uppercase tracking-widest">Master Hub</span>
        </motion.div>
      </div>
    </div>
  );
};

// --- COMPONENT: HOLOGRAPHIC MOUSE-TRACKING CARD ---
const HolographicCard = ({ track, index, inView }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const theme = getTheme(track.color);
  const Icon = track.icon;

  return (
    <motion.div
      ref={divRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative h-full w-full rounded-xl overflow-hidden group bg-black/60 backdrop-blur-xl border border-white/10 transition-colors duration-500 ${positionClasses[track.position]}`}
    >
      {/* 1. HUD Accents */}
      <div className="absolute inset-0 p-[2px]">
        <CornerAccents color={theme.main} active={isHovered} />
      </div>

      {/* 2. Interactive Radial Glow (Follows Mouse) */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(${theme.glow}, 0.12), transparent 40%)`,
        }}
      />

      {/* 3. Border Reveal Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${theme.main}, transparent 40%)`,
          WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMaskComposite: "xor",
          padding: "1.5px",
        }}
      />

      {/* 4. Content */}
      <div className="relative z-10 p-8 h-full flex flex-col items-start justify-center">
        <div 
          className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-all duration-500"
          style={{ 
             boxShadow: isHovered ? `0 0 25px -5px rgba(${theme.glow}, 0.5)` : "none",
             borderColor: isHovered ? theme.main : "rgba(255,255,255,0.1)"
          }}
        >
           <Icon className="w-8 h-8 transition-colors duration-500" style={{ color: isHovered ? "#fff" : theme.main }} />
        </div>

        <h3 className="font-orbitron text-2xl font-bold text-white mb-3 tracking-tight">
          {track.title}
        </h3>

        <p className="font-rajdhani text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
          {track.description}
        </p>

        {/* Animated Progress Bar */}
        <div className="w-full h-[2px] mt-8 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full" 
              style={{ background: theme.main }}
              initial={{ width: "0%" }}
              animate={isHovered ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 0.6 }}
            />
        </div>
      </div>
    </motion.div>
  );
};

// --- COMPONENT: CIRCUIT PATHS ---
const CircuitBoard = () => {
  const paths = [
    { d: "M 50 50 L 15 15", color: "#00f0ff" }, 
    { d: "M 50 50 L 85 15", color: "#fbbf24" }, 
    { d: "M 50 50 L 15 85", color: "#f43f5e" }, 
    { d: "M 50 50 L 85 85", color: "#10b981" }, 
  ];

  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block z-0">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {paths.map((path, i) => (
          <g key={i}>
            <path d={path.d} stroke="rgba(255,255,255,0.03)" strokeWidth="0.2" fill="none" />
            <motion.circle r="0.6" fill={path.color} filter={`drop-shadow(0 0 3px ${path.color})`}>
              <animateMotion dur={`${2 + i * 0.5}s`} repeatCount="indefinite" path={path.d} />
            </motion.circle>
            <motion.path
              d={path.d}
              stroke={path.color}
              strokeWidth="0.4"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

const Tracks = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="tracks" className="py-32 relative overflow-hidden bg-[#020202]">
      {/* Background Polish */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-24"
        >
          <div className="inline-block mb-6 px-6 py-2 rounded-full border border-violet-500/20 bg-violet-500/5 backdrop-blur-sm">
            <span className="text-violet-400 font-mono text-xs tracking-[0.3em] uppercase font-bold">Innovation Network</span>
          </div>
          <h2 className="font-orbitron text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
            CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-400">DOMAIN</span>
          </h2>
          <p className="font-rajdhani text-gray-500 max-w-2xl mx-auto text-lg">Select a protocol to begin your integration into the neural network.</p>
        </motion.div>

        <div className="relative w-full max-w-7xl mx-auto min-h-[800px] flex items-center justify-center">
          <CircuitBoard />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 gap-10 w-full relative z-10">
             {tracks.map((track, index) => (
                <HolographicCard key={track.id} track={track} index={index} inView={inView} />
             ))}
             <DomainCore />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tracks;