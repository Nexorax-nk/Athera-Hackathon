import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Globe, Coins, Heart, Leaf, Cpu, Database, ShieldCheck, Activity, Zap, Link2, Aperture, Command } from "lucide-react";

// --- CONFIGURATION ---
const tracks = [
  {
    id: "edutech",
    icon: Globe,
    title: "EDUTECH",
    subtitle: "NEURAL NETWORKS",
    desc: "Immersive learning algorithms & cognitive mapping.",
    color: "#00f0ff", // Cyan
    position: "top-left",
  },
  {
    id: "fintech",
    icon: Coins,
    title: "FINTECH",
    subtitle: "QUANTUM LEDGERS",
    desc: "Decentralized consensus & zero-knowledge proofs.",
    color: "#ffd700", // Gold
    position: "top-right",
  },
  {
    id: "health",
    icon: Heart,
    title: "HEALTHTECH",
    subtitle: "BIO-SYNTHETICS",
    desc: "AI diagnostics & nano-bot cellular repair.",
    color: "#ff0055", // Red
    position: "bottom-left",
  },
  {
    id: "green",
    icon: Leaf,
    title: "SUSTAINABILITY",
    subtitle: "ECO-GRIDS",
    desc: "Smart energy harvesting & terraforming logic.",
    color: "#00ff9d", // Green
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

// --- COMPONENT: CONNECTED CIRCUIT LINES (BACKGROUND) ---
const ConnectedCircuitLines = ({ tracks, containerRef, activeTrack }) => {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [containerRef]);

  const getCardPosition = useCallback((trackIndex) => {
    const { width, height } = dimensions;
    const track = tracks[trackIndex];
    const isLeft = track.position.includes("left");
    const isTop = track.position.includes("top");

    // Dynamic grid positioning logic
    const cardX = isLeft ? width * 0.15 : width * 0.85;
    const cardY = isTop ? height * 0.2 : height * 0.8;

    return { x: cardX, y: cardY };
  }, [tracks, dimensions]);

  // Logic: Variables must be declared BEFORE return
  const connections = [
    [0, 1], [2, 3], [0, 2], [1, 3]
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="w-full h-full overflow-visible"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
          </pattern>
          {tracks.map((track) => (
            <radialGradient key={`grad-${track.id}`} id={`grad-${track.id}`}>
              <stop offset="0%" stopColor={track.color} stopOpacity="1"/>
              <stop offset="100%" stopColor={track.color} stopOpacity="0"/>
            </radialGradient>
          ))}
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.3"/>

        {/* TRACK TO CENTER CONNECTIONS */}
        {tracks.map((track, index) => {
          const cardPos = getCardPosition(index);
          const centerX = dimensions.width / 2;
          const centerY = dimensions.height / 2;
          
          const controlX = (centerX + cardPos.x) / 2;
          const controlY = (centerY + cardPos.y) / 2;
          
          const pathData = `M ${cardPos.x} ${cardPos.y} Q ${controlX} ${centerY} ${centerX} ${centerY}`;
          const isActive = activeTrack === track.id;

          return (
            <g key={track.id}>
              {/* Dim base line */}
              <path
                d={pathData}
                stroke={track.color}
                strokeWidth={isActive ? "3" : "1"}
                strokeOpacity={isActive ? "0.5" : "0.1"}
                fill="none"
                strokeLinecap="round"
              />

              {/* Active Energy Pulse */}
              <motion.path
                d={pathData}
                stroke={`url(#grad-${track.id})`}
                strokeWidth={isActive ? "4" : "2"}
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0],
                  opacity: [0, 1, 0],
                  pathOffset: [0, 1]
                }}
                transition={{
                  duration: isActive ? 1.5 : 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// --- COMPONENT: TECH CARD (UNCHANGED BUT ROBUST) ---
const TechCard = ({ track, index, onHover }) => {
  const Icon = track.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative w-full max-w-sm perspective-1000 group z-10" onMouseEnter={() => onHover(track.id)}>
      <motion.div 
        className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white/30 z-20"
        style={{ backgroundColor: track.color }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <TiltCard className="relative w-full">
        <motion.div
          className="relative overflow-hidden rounded-xl bg-[#030303]/90 border border-white/10 p-6 h-[240px] flex flex-col justify-between backdrop-blur-md"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={{
            borderColor: hovered ? track.color : "rgba(255,255,255,0.1)",
            boxShadow: hovered ? `0 0 30px ${track.color}40` : "none"
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-start z-10">
            <motion.div 
              className="p-3 rounded-lg bg-white/5 border border-white/10"
              whileHover={{ scale: 1.1, backgroundColor: `${track.color}20` }}
            >
              <Icon size={28} style={{ color: track.color }} />
            </motion.div>
            <div className="text-[10px] font-mono text-gray-500 text-right">
              <div>NODE_0{index + 1}</div>
              <div style={{ color: track.color }}>ONLINE</div>
            </div>
          </div>

          {/* Text */}
          <div className="z-10 mt-4">
            <h3 className="text-2xl font-bold text-white font-mono tracking-tighter">{track.title}</h3>
            <p className="text-xs font-mono mt-1 mb-2" style={{ color: track.color }}>// {track.subtitle}</p>
            <p className="text-sm text-gray-400 font-light leading-snug">{track.desc}</p>
          </div>

          {/* Action */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5 z-10">
             <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-gray-600" />
                <div className="w-1 h-1 rounded-full bg-gray-600" />
                <div className="w-1 h-1 rounded-full bg-gray-600" />
             </div>
             <div className="text-[10px] font-mono opacity-50">INITIALIZED</div>
          </div>

          {/* Hover Glow Background */}
          <motion.div 
             className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full blur-[60px]"
             style={{ backgroundColor: track.color }}
             animate={{ opacity: hovered ? 0.3 : 0 }}
          />
        </motion.div>
      </TiltCard>
    </div>
  );
};

// --- NEW COMPONENT: QUANTUM GYROSCOPE CORE ---
const QuantumCore = ({ activeTrack }) => {
  // Determine color based on active track or default to Electric Blue
  const activeColor = activeTrack ? tracks.find(t => t.id === activeTrack).color : "#00f0ff";

  return (
    <div className="relative w-80 h-80 flex items-center justify-center pointer-events-none select-none">
      
      {/* 1. Outer Static HUD Ring */}
      <div className="absolute inset-0 border border-white/10 rounded-full flex items-center justify-center">
         <div className="absolute top-0 w-1 h-2 bg-white/20" />
         <div className="absolute bottom-0 w-1 h-2 bg-white/20" />
         <div className="absolute left-0 w-2 h-1 bg-white/20" />
         <div className="absolute right-0 w-2 h-1 bg-white/20" />
      </div>

      {/* 2. Slow Spinning Dashed Ring */}
      <motion.div 
        className="absolute w-[90%] h-[90%] rounded-full border border-dashed border-white/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* 3. Middle Counter-Rotating Ring (Colored) */}
      <motion.div 
        className="absolute w-[70%] h-[70%] rounded-full border-2 border-transparent border-t-current border-b-current opacity-60"
        style={{ color: activeColor }}
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* 4. Fast Inner Ring (Mechanical) */}
      <motion.div 
        className="absolute w-[50%] h-[50%] rounded-full border border-white/30 border-l-transparent border-r-transparent"
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ 
            rotate: { duration: 5, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
        }}
      />

      {/* 5. The Singularity (Center Glow) */}
      <motion.div 
        className="absolute w-[30%] h-[30%] rounded-full blur-xl z-10"
        style={{ backgroundColor: activeColor }}
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* 6. Solid Core Sphere */}
      <motion.div 
        className="relative w-16 h-16 rounded-full bg-black border border-white/20 flex items-center justify-center z-20 shadow-2xl"
        style={{ boxShadow: `0 0 30px ${activeColor}50` }}
      >
        <Aperture size={32} color={activeColor} className="animate-spin-slow" />
      </motion.div>

      {/* 7. Floating Orbiting Particles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-full h-full rounded-full"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear", delay: i }}
        >
           <div 
             className="w-2 h-2 rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1"
             style={{ backgroundColor: activeColor, boxShadow: `0 0 10px ${activeColor}` }} 
           />
        </motion.div>
      ))}
      
      {/* Label */}
      <div className="absolute -bottom-12 text-xs font-mono text-gray-500 tracking-[0.3em] text-center">
        SYSTEM CORE<br/>
        <span style={{ color: activeColor }} className="font-bold">{activeTrack ? "PROCESSING DATA" : "STANDBY"}</span>
      </div>
    </div>
  );
};

// --- MAIN LAYOUT COMPONENT ---
const CircuitTracks = () => {
  const containerRef = useRef(null);
  const [activeTrack, setActiveTrack] = useState(null);

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden flex flex-col items-center justify-center font-sans selection:bg-cyan-500/30">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/40 via-[#050505] to-[#050505]" />
         <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
         <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Header HUD */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-3">
          <Command size={20} className="text-white/50" />
          <div className="text-sm font-mono tracking-widest text-white/50">NEXUS_PROTOCOL_V2</div>
        </div>
        <div className="flex gap-2">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           <div className="text-xs font-mono text-green-500">SYSTEM STABLE</div>
        </div>
      </nav>

      {/* Main Content Grid */}
      <div ref={containerRef} className="relative z-10 w-full max-w-7xl p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-y-12 items-center min-h-[85vh]">
        
        {/* Background Circuitry */}
        <ConnectedCircuitLines tracks={tracks} containerRef={containerRef} activeTrack={activeTrack} />

        {/* Left Wing */}
        <div className="flex flex-col gap-12 lg:gap-32 items-center lg:items-end order-2 lg:order-1">
          <TechCard track={tracks[0]} index={0} onHover={setActiveTrack} />
          <TechCard track={tracks[2]} index={2} onHover={setActiveTrack} />
        </div>

        {/* CENTER REACTOR CORE */}
        <div className="flex items-center justify-center order-1 lg:order-2 py-12 lg:py-0">
          <QuantumCore activeTrack={activeTrack} />
        </div>

        {/* Right Wing */}
        <div className="flex flex-col gap-12 lg:gap-32 items-center lg:items-start order-3 lg:order-3">
          <TechCard track={tracks[1]} index={1} onHover={setActiveTrack} />
          <TechCard track={tracks[3]} index={3} onHover={setActiveTrack} />
        </div>

      </div>
    </div>
  );
};

export default CircuitTracks;