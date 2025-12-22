import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Your logo file (ideally a transparent PNG)
import logo from '../assets/bg.jpg';  // ← Replace with .png if you use the transparent version

const LoadingDots = ({ progress }) => {
  const dots = 3;
  const activeDots = Math.floor((progress / 100) * dots) + 1;

  return (
    <span className="inline-flex gap-0.5">
      {[...Array(dots)].map((_, i) => (
        <motion.span
          key={i}
          animate={{
            opacity: i < activeDots ? [0.4, 1, 0.4] : 0.2,
            scale: i < activeDots ? [1, 1.15, 1] : 1,
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
          className="text-neon-cyan"
        >
          .
        </motion.span>
      ))}
    </span>
  );
};

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading');
  const [statusText, setStatusText] = useState("INITIALIZING");

  useEffect(() => {
    const startTime = Date.now();
    const duration = 3500;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      const eased = 1 - Math.pow(1 - newProgress / 100, 3);
      setProgress(eased * 100);

      if (eased * 100 < 20) setStatusText("INITIALIZING NEURAL LINK");
      else if (eased * 100 < 40) setStatusText("BREACHING FIREWALL");
      else if (eased * 100 < 60) setStatusText("ACCESSING NIGHT CITY");
      else if (eased * 100 < 80) setStatusText("LOADING CYBERWARE");
      else if (eased * 100 < 95) setStatusText("ESTABLISHING CONNECTION");
      else setStatusText("BREACH SUCCESSFUL");

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => setPhase('transitioning'), 300);
        setTimeout(() => {
          setPhase('complete');
          onComplete();
        }, 1400);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background effects - unchanged */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        animate={phase === 'transitioning' ? { opacity: 0.15 } : { opacity: 0.08 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--neon-cyan) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--neon-cyan) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 35%, rgba(0,0,0,0.85) 100%)',
        }}
      />
      
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={phase === 'transitioning' ? { opacity: 0.08 } : { opacity: 0.03 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)',
          backgroundSize: '100% 4px',
        }}
      />

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 120px rgba(0, 255, 255, 0.04)' }}
      />

      <AnimatePresence>
        {phase === 'transitioning' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            style={{
              background: `linear-gradient(90deg, rgba(255,0,100,0.03) 0%, transparent 20%, transparent 80%, rgba(0,255,255,0.03) 100%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-4">
        <AnimatePresence mode="wait">
          {(phase === 'loading' || phase === 'transitioning') && (
            <motion.div
              key="loading-content"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(12px)', scale: 0.95 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-center"
            >
              {/* Clean, centered logo with no background visible */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="mb-16 max-w-[85%] md:max-w-[65%]"
              >
                <img
                  src={logo}
                  alt="HackWithMagnus 2026 Ultimate Edition"
                  className="w-full h-auto block mx-auto object-contain"
                  style={{ filter: 'none' }}  // No glow or effects
                />
              </motion.div>

              {/* Status text */}
              <motion.p
                className="font-mono text-sm md:text-base text-neon-cyan/80 tracking-[0.25em] mb-4"
                exit={{ opacity: 0, y: 10 }}
              >
                {statusText}
                <LoadingDots progress={progress} />
              </motion.p>

              {/* Progress percentage */}
              <motion.div
                className="font-mono text-lg md:text-xl text-neon-cyan/60"
                exit={{ opacity: 0 }}
              >
                {Math.floor(progress).toString().padStart(2, '0')}%
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar - unchanged */}
      <AnimatePresence>
        {(phase === 'loading' || phase === 'transitioning') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase === 'transitioning' ? 0 : 1, y: 0 }}
            exit={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 right-0 h-[5vh] max-h-12 min-h-8 flex flex-col justify-center px-4 md:px-8"
          >
            <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex justify-between px-0.5">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-px h-full bg-neon-cyan/20" />
                ))}
              </div>
              
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, hsl(var(--neon-cyan)) 0%, hsl(var(--neon-cyan)) 85%, hsl(var(--neon-magenta)) 100%)',
                  boxShadow: '0 0 8px hsl(var(--neon-cyan)), 0 0 16px hsl(var(--neon-cyan) / 0.4)',
                }}
              />

              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white"
                style={{
                  left: `calc(${progress}% - 3px)`,
                  boxShadow: '0 0 8px hsl(var(--neon-cyan)), 0 0 16px hsl(var(--neon-cyan))',
                }}
              />
            </div>

            <div className="flex justify-between mt-1 font-mono text-[10px] text-neon-cyan/40">
              <span>00</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-neon-cyan/25" />
      <div className="absolute top-4 right-4 w-6 h-6 border-r border-t border-neon-cyan/25" />
      <div className="absolute bottom-16 left-4 w-6 h-6 border-l border-b border-neon-cyan/25" />
      <div className="absolute bottom-16 right-4 w-6 h-6 border-r border-b border-neon-cyan/25" />
    </motion.div>
  );
};

export default Loader;