import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Globe, Coins, BookOpen, Heart, Leaf } from "lucide-react";

// 1. DATA: High-Contrast Neon Colors
const tracks = [
  {
    id: "web3",
    icon: Globe,
    title: "AI&ML",
    description: "Build decentralized applications and smart contracts.",
    color: "cyan", 
    position: "top-left",
  },
  {
    id: "fintech",
    icon: Coins,
    title: "FINTECH",
    description: "Create innovative financial technology solutions.",
    color: "gold", 
    position: "top-right",
  },
  {
    id: "edutech",
    icon: BookOpen,
    title: "EDUTECH",
    description: "Transform education with technology.",
    color: "violet", 
    position: "center",
  },
  {
    id: "health",
    icon: Heart,
    title: "HEALTHTECH",
    description: "Revolutionize healthcare with digital solutions.",
    color: "red", 
    position: "bottom-left",
  },
  {
    id: "green",
    icon: Leaf,
    title: "SUSTAINABLE DEVELOPMENT GOALS",
    description: "Address environmental challenges with tech.",
    color: "green", 
    position: "bottom-right",
  },
];

// 2. THEME ENGINE: Brighter, punchier colors
const getTheme = (color) => {
  const themes = {
    cyan:   { main: "#00f0ff", glow: "0, 240, 255" },
    gold:   { main: "#fbbf24", glow: "251, 191, 36" },
    violet: { main: "#8b5cf6", glow: "139, 92, 246" },
    red:    { main: "#f43f5e", glow: "244, 63, 94" },
    green:  { main: "#10b981", glow: "16, 185, 129" },
  };
  return themes[color] || themes.cyan;
};

const positionClasses = {
  "top-left": "lg:col-start-1 lg:row-start-1",
  "top-right": "lg:col-start-3 lg:row-start-1",
  center: "lg:col-start-2 lg:row-start-2 z-20",
  "bottom-left": "lg:col-start-1 lg:row-start-3",
  "bottom-right": "lg:col-start-3 lg:row-start-3",
};

// --- COMPONENT: CORNER ACCENTS (HUD LOOK) ---
const CornerAccents = ({ color }) => (
  <>
    {/* Top Left */}
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-all duration-300" 
         style={{ borderColor: color, filter: `drop-shadow(0 0 5px ${color})` }} />
    {/* Top Right */}
    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 transition-all duration-300" 
         style={{ borderColor: color, filter: `drop-shadow(0 0 5px ${color})` }} />
    {/* Bottom Left */}
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 transition-all duration-300" 
         style={{ borderColor: color, filter: `drop-shadow(0 0 5px ${color})` }} />
    {/* Bottom Right */}
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-all duration-300" 
         style={{ borderColor: color, filter: `drop-shadow(0 0 5px ${color})` }} />
  </>
);

// --- COMPONENT: HOLOGRAPHIC CARD ---
const HolographicCard = ({ track, index, inView }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const theme = getTheme(track.color);
  const Icon = track.icon;
  const isCenter = track.position === "center";

  return (
    <motion.div
      ref={divRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className={`
        relative h-full w-full rounded-xl overflow-hidden group
        ${positionClasses[track.position]}
        ${isCenter ? "scale-105" : ""}
      `}
      style={{
        background: "rgba(0,0,0,0.6)", // Darker base for contrast
        backdropFilter: "blur(12px)",
        // DEFAULT VISIBLE BORDER (Greyish) which turns colored on hover
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* 1. VISIBLE CORNER BRACKETS */}
      <div className="absolute inset-0 p-[2px]">
         <CornerAccents color={theme.main} />
      </div>

      {/* 2. HOVER GLOW (Behind content) */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(${theme.glow}, 0.15), transparent 40%)`,
        }}
      />
      
      {/* 3. SHARP BORDER REVEAL */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${theme.main}, transparent 40%)`,
          maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "2px", // THICKER BORDER REVEAL
        }}
      />

      {/* 4. CONTENT */}
      <div className="relative z-10 p-6 md:p-8 h-full flex flex-col items-start justify-center">
        <div 
          className="mb-5 p-3 rounded-lg bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300"
          style={{ 
             boxShadow: `0 0 15px -5px rgba(${theme.glow}, 0.5)` // Icon Glow
          }}
        >
           <Icon className="w-8 h-8" style={{ color: theme.main }} />
        </div>

        <h3 className="font-orbitron text-xl font-bold text-white mb-2 tracking-wide">
          {track.title}
        </h3>

        <p className="font-rajdhani text-gray-400 text-sm leading-relaxed group-hover:text-white transition-colors">
          {track.description}
        </p>

        {/* Bottom Status Bar */}
        <div className="w-full h-1 mt-6 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-0 group-hover:w-full transition-all duration-700 ease-out" style={{ background: theme.main }} />
        </div>
      </div>
    </motion.div>
  );
};

// --- COMPONENT: NEON PIPES ---
const CircuitBoard = () => {
  const paths = [
    { d: "M 50 50 L 20 20", color: "#00f0ff" }, // Cyan
    { d: "M 50 50 L 80 20", color: "#fbbf24" }, // Gold
    { d: "M 50 50 L 20 80", color: "#f43f5e" }, // Red
    { d: "M 50 50 L 80 80", color: "#10b981" }, // Green
  ];

  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block z-0">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {paths.map((path, i) => (
          <g key={i}>
            {/* Dark Track */}
            <path d={path.d} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" fill="none" />
            {/* Glowing Pulse */}
            <motion.path
              d={path.d}
              stroke={path.color}
              strokeWidth="0.5"
              strokeLinecap="round"
              fill="none"
              filter="url(#neon-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0], 
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          </g>
        ))}

        {/* Reactor Core */}
        <circle cx="50" cy="50" r="2" fill="#8b5cf6" />
        <motion.circle 
          cx="50" cy="50" r="10" 
          stroke="#8b5cf6" 
          strokeWidth="0.5" 
          fill="none"
          animate={{ r: [8, 16], opacity: [0.8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    </div>
  );
};

const Tracks = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="tracks" className="py-24 relative overflow-hidden bg-background">
      {/* Darker Grid Background for Contrast */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-md">
            <span className="text-violet-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
              System Neural Network
            </span>
          </div>

          <h2 className="font-orbitron text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">
            CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">PROTOCOL</span>
          </h2>
        </motion.div>

        {/* The Grid */}
        <div className="relative w-full max-w-6xl mx-auto min-h-[600px] flex items-center justify-center">
          <CircuitBoard />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 gap-6 w-full relative z-10">
             {tracks.map((track, index) => (
                <HolographicCard 
                  key={track.id} 
                  track={track} 
                  index={index} 
                  inView={inView} 
                />
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tracks;