import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Globe, Coins, Heart, Leaf, Cpu, Database, Lock, ShieldCheck, Activity, Zap, Code2, Terminal } from "lucide-react";

// --- CONFIGURATION ---
const tracks = [
  {
    id: "edutech",
    icon: Globe,
    title: "EDUTECH",
    subtitle: "NEURAL NETWORKS",
    desc: "Immersive learning algorithms & cognitive mapping.",
    color: "#00f0ff", // Cyan
    accent: "rgba(0, 240, 255, 0.2)",
    position: "top-left",
  },
  {
    id: "fintech",
    icon: Coins,
    title: "FINTECH",
    subtitle: "QUANTUM LEDGERS",
    desc: "Decentralized consensus & zero-knowledge proofs.",
    color: "#ffd700", // Gold
    accent: "rgba(255, 215, 0, 0.2)",
    position: "top-right",
  },
  {
    id: "health",
    icon: Heart,
    title: "HEALTHTECH",
    subtitle: "BIO-SYNTHETICS",
    desc: "AI diagnostics & nano-bot cellular repair.",
    color: "#ff0055", // Red
    accent: "rgba(255, 0, 85, 0.2)",
    position: "bottom-left",
  },
  {
    id: "green",
    icon: Leaf,
    title: "SUSTAINABILITY",
    subtitle: "ECO-GRIDS",
    desc: "Smart energy harvesting & terraforming logic.",
    color: "#00ff9d", // Green
    accent: "rgba(0, 255, 157, 0.2)",
    position: "bottom-right",
  },
];

// --- UTILITY: 3D TILT CARD WRAPPER ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- COMPONENT: ADVANCED CIRCUIT LINE ---
const CircuitLine = ({ position, color }) => {
  const isLeft = position.includes("left");
  const isTop = position.includes("top");

  // Path Logic: Out from center, bend 90deg, to card
  const startX = isLeft ? "50%" : "50%";
  const startY = isTop ? "50%" : "50%";
  const endX = isLeft ? "5%" : "95%";
  const endY = isTop ? "10%" : "90%";
  const midX = isLeft ? "25%" : "75%";

  const pathData = `M ${startX} ${startY} H ${midX} V ${endY} H ${endX}`;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-40 lg:opacity-100">
      <svg width="100%" height="100%" className="overflow-visible">
        <defs>
          <linearGradient id={`grad-${position}`} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <filter id={`glow-${position}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Static Wire */}
        <path d={pathData} stroke={color} strokeWidth="1" strokeOpacity="0.1" fill="none" />

        {/* Pulsing Data Packet */}
        <motion.path
          d={pathData}
          stroke={`url(#grad-${position})`}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          filter={`url(#glow-${position})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 0.3, 0], 
            pathOffset: [0, 0.8, 1],
            opacity: [0, 1, 0] 
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: isTop ? 0 : 1.5,
          }}
        />
        
        {/* Terminal Blip */}
        <circle cx={isLeft ? "5%" : "95%"} cy={isTop ? "10%" : "90%"} r="2" fill={color}>
             <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin={isTop ? "1.5s" : "3s"} />
        </circle>
      </svg>
    </div>
  );
};

// --- COMPONENT: TECH CARD (HOLOGRAM STYLE) ---
const TechCard = ({ track, index }) => {
  const Icon = track.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative w-full max-w-sm perspective-1000 group">
      {/* Label Connecting Line (Decor) */}
      <div className={`absolute top-1/2 w-8 h-[1px] bg-gradient-to-r from-transparent to-${track.color}
        ${track.position.includes("left") ? "-right-8" : "-left-8 rotate-180"}
        hidden lg:block transition-all duration-300 opacity-30 group-hover:opacity-100`}
        style={{ backgroundColor: track.color }}
      />

      <TiltCard className="relative w-full">
        <motion.div
          className="relative overflow-hidden rounded-md bg-[#050505] border border-white/10 p-6 h-[220px] flex flex-col justify-between"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          style={{ boxShadow: hovered ? `0 0 30px -10px ${track.color}` : "none", transition: "box-shadow 0.3s" }}
        >
          {/* Animated Background Scanline */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20"
            style={{ 
              background: `linear-gradient(to bottom, transparent, ${track.color}, transparent)`,
              height: "50%" 
            }}
            animate={{ top: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Grid Background Texture */}
          <div className="absolute inset-0 opacity-10" 
            style={{ backgroundImage: `radial-gradient(${track.color} 1px, transparent 1px)`, backgroundSize: "20px 20px" }} 
          />

          {/* Header */}
          <div className="flex justify-between items-start z-10">
            <div className="relative">
              <div className="absolute inset-0 blur-md opacity-50" style={{ backgroundColor: track.color }} />
              <div className="relative bg-black/50 border border-white/10 p-2 rounded">
                <Icon size={24} style={{ color: track.color }} />
              </div>
            </div>
            <div className="text-[9px] font-mono text-gray-500 text-right leading-tight">
              <div>SYS_ID: 0{index + 1}</div>
              <div style={{ color: track.color }}>STATUS: ACTIVE</div>
            </div>
          </div>

          {/* Content */}
          <div className="z-10 mt-4 space-y-2">
            <div>
              <h3 className="text-2xl font-black text-white font-mono tracking-tighter uppercase group-hover:translate-x-1 transition-transform">
                {track.title}
              </h3>
              <p className="text-[10px] tracking-[0.2em] font-bold text-gray-500 uppercase">
                {track.subtitle}
              </p>
            </div>
            <p className="text-xs text-gray-400 font-sans border-l-2 border-white/10 pl-3 group-hover:border-[color:var(--c)] group-hover:text-gray-200 transition-all duration-300" style={{ '--c': track.color }}>
              {track.desc}
            </p>
          </div>

          {/* Footer Interactive Element */}
          <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
            <div className="flex gap-1">
              {[1,2,3].map(i => (
                <motion.div 
                  key={i} 
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: track.color }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
            <button className="text-[10px] font-mono text-white/50 hover:text-white group-hover:text-[color:var(--c)] transition-colors flex items-center gap-1" style={{ '--c': track.color }}>
              INITIALIZE <Zap size={10} />
            </button>
          </div>

          {/* Decorative Corner Brackets */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
            <path d="M 10 0 L 0 0 L 0 10" fill="none" stroke={track.color} strokeWidth="1.5" />
            <path d="M 0 210 L 0 220 L 10 220" fill="none" stroke={track.color} strokeWidth="1.5" />
            <path d="M 370 220 L 380 220 L 380 210" fill="none" stroke={track.color} strokeWidth="1.5" />
            <path d="M 380 10 L 380 0 L 370 0" fill="none" stroke={track.color} strokeWidth="1.5" />
          </svg>
        </motion.div>
      </TiltCard>
    </div>
  );
};

// --- COMPONENT: REACTOR CORE ---
const Core = () => {
  return (
    <div className="relative w-72 h-72 flex items-center justify-center z-20 scale-75 md:scale-100">
      {/* Outer Rotating Data Rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-full h-full rounded-full border border-dashed border-gray-700 opacity-30"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80%] h-[80%] rounded-full border-t border-b border-violet-500/50"
      />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute w-[60%] h-[60%] rounded-full border-l-2 border-r-2 border-cyan-400/50"
      />

      {/* Main Reactor Orb */}
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-32 h-32 rounded-full bg-black/90 backdrop-blur-xl border border-white/20 flex items-center justify-center cursor-pointer group shadow-[0_0_50px_-10px_rgba(124,58,237,0.5)] z-20"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-900/20 to-cyan-900/20 animate-pulse" />
        
        {/* Core Icon */}
        <div className="flex flex-col items-center justify-center gap-1 z-10 text-center">
          <Cpu className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" size={32} />
          <div className="text-[10px] font-mono text-violet-300 tracking-widest mt-1">NEXUS</div>
          <div className="text-[8px] font-mono text-gray-500">ONLINE</div>
        </div>
        
        {/* Hover Effects */}
        <div className="absolute inset-[-5px] rounded-full border border-violet-500/30 scale-100 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" />
      </motion.div>

      {/* Background Glow */}
      <div className="absolute inset-0 bg-violet-600/10 blur-3xl rounded-full z-0" />
    </div>
  );
};

// --- MAIN LAYOUT ---
const CircuitTracks = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#020202] text-white overflow-hidden flex flex-col items-center justify-center selection:bg-cyan-500/30">
      
      {/* 1. Cyberpunk Background Grid */}
      <div className="absolute inset-0 z-0 perspective-500">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)] opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-violet-900/10 to-transparent blur-3xl" />
      </div>

      {/* 2. Top HUD Bar */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-center z-30 pointer-events-none opacity-70">
         <div className="flex items-center gap-4 text-[10px] font-mono text-gray-400">
            <Activity size={14} className="text-cyan-400" />
            <span>SYSTEM_LOAD: 34%</span>
            <span className="hidden md:inline"> | MEMORY: OPTIMAL</span>
         </div>
         <div className="flex gap-1">
            <div className="w-16 h-1 bg-gray-800 rounded overflow-hidden">
               <motion.div className="h-full bg-cyan-400" animate={{ width: ["10%", "60%", "30%"] }} transition={{ duration: 2, repeat: Infinity }} />
            </div>
            <div className="w-2 h-1 bg-red-500" />
         </div>
      </div>

      {/* 3. Main Interface Grid */}
      <div className="relative z-10 w-full max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center justify-items-center py-20 lg:py-0">
        
        {/* Left Wing */}
        <div className="flex flex-col gap-12 lg:gap-32 w-full items-center lg:items-end order-2 lg:order-1">
          <TechCard track={tracks[0]} index={0} />
          <TechCard track={tracks[2]} index={2} />
        </div>

        {/* Center Reactor */}
        <div className="relative w-full h-[400px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2">
           {/* SVG Lines Container - Positioned to bridge columns */}
           <div className="absolute inset-0 hidden lg:block pointer-events-none -z-10">
              <div className="absolute top-1/2 left-0 w-1/2 h-1/2 -translate-y-[80%] -translate-x-[20%]">
                 <CircuitLine position="top-left" color={tracks[0].color} />
              </div>
              <div className="absolute top-1/2 right-0 w-1/2 h-1/2 -translate-y-[80%] translate-x-[20%]">
                 <CircuitLine position="top-right" color={tracks[1].color} />
              </div>
              <div className="absolute bottom-1/2 left-0 w-1/2 h-1/2 translate-y-[80%] -translate-x-[20%]">
                 <CircuitLine position="bottom-left" color={tracks[2].color} />
              </div>
              <div className="absolute bottom-1/2 right-0 w-1/2 h-1/2 translate-y-[80%] translate-x-[20%]">
                 <CircuitLine position="bottom-right" color={tracks[3].color} />
              </div>
           </div>
           
           <Core />
        </div>

        {/* Right Wing */}
        <div className="flex flex-col gap-12 lg:gap-32 w-full items-center lg:items-start order-3 lg:order-3">
          <TechCard track={tracks[1]} index={1} />
          <TechCard track={tracks[3]} index={3} />
        </div>

      </div>

      {/* 4. Bottom HUD Footer */}
      <div className="absolute bottom-6 w-full flex flex-col items-center gap-2 z-30 pointer-events-none opacity-60">
        <div className="text-[10px] text-gray-500 font-mono tracking-[0.5em] uppercase">
          Secure Connection Established
        </div>
        <div className="flex gap-8 text-[10px] text-gray-600 font-mono">
          <div className="flex items-center gap-2">
            <Lock size={12} /> ENCRYPTED
          </div>
          <div className="flex items-center gap-2">
            <Database size={12} /> LATENCY: 12ms
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={12} /> PROTOCOL: V.9.0
          </div>
        </div>
      </div>

    </div>
  );
};

export default CircuitTracks;