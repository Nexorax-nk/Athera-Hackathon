import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

// Individual glitching letter component with digital noise assembly
const GlitchLetter = ({ 
  char, 
  index, 
  phase 
}: { 
  char: string; 
  index: number; 
  phase: 'loading' | 'transitioning' | 'complete';

}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, r: 0, g: 0 });

  useEffect(() => {
    if (phase !== 'loading') return;
    
    const triggerGlitch = () => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        setGlitchOffset({
          x: (Math.random() - 0.5) * 3,
          r: (Math.random() - 0.5) * 2,
          g: (Math.random() - 0.5) * 2,
        });
        setTimeout(() => setIsGlitching(false), 100 + Math.random() * 100);
      }
    };

    const interval = setInterval(triggerGlitch, 800 + Math.random() * 1200);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 15, scale: 0.9 }}
      animate={{ 
        opacity: phase === 'transitioning' ? 0 : 1, 
        y: 0, 
        scale: 1,
        x: isGlitching ? glitchOffset.x : 0,
      }}
      exit={{ 
        opacity: 0,
        filter: 'blur(8px)',
        y: 10,
      }}
      transition={{ 
        delay: index * 0.04,
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
        x: { duration: 0.08 }
      }}
      className="relative inline-block"
      style={{ 
        textShadow: isGlitching 
          ? `${glitchOffset.r}px 0 hsl(var(--neon-cyan)), ${glitchOffset.g}px 0 hsl(var(--neon-magenta)), 0 0 15px hsl(var(--neon-cyan) / 0.7)`
          : '0 0 15px hsl(var(--neon-cyan) / 0.5), 0 0 30px hsl(var(--neon-cyan) / 0.25)',
        willChange: 'transform',
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};



// Loading dots component
const LoadingDots = ({ progress }: { progress: number }) => {
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

const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'transitioning' | 'complete'>('loading');

  const [statusText, setStatusText] = useState("INITIALIZING");

  const title = "HACKSWITHMAGNUS 2077";
  

  // Smooth progress animation
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
        // Start transition sequence
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
      {/* Animated background grid */}
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

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 35%, rgba(0,0,0,0.85) 100%)',
        }}
      />
      
      {/* Scanlines */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={phase === 'transitioning' ? { opacity: 0.08 } : { opacity: 0.03 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* CRT glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 120px rgba(0, 255, 255, 0.04)' }}
      />

      {/* Chromatic aberration overlay during transition */}
      <AnimatePresence>
        {phase === 'transitioning' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            style={{
              background: `
                linear-gradient(90deg, rgba(255,0,100,0.03) 0%, transparent 20%, transparent 80%, rgba(0,255,255,0.03) 100%)
              `,
            }}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-4">
        <AnimatePresence mode="wait">
          {/* Loading phase content */}
          {(phase === 'loading' || phase === 'transitioning') && (
            <motion.div
              key="loading-content"
              initial={{ opacity: 1 }}
              exit={{ 
                opacity: 0,
                filter: 'blur(12px)',
                scale: 0.95,
              }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="mb-8"
              >
                <h1 className="font-orbitron text-3xl sm:text-4xl md:text-6xl font-black tracking-wider text-neon-cyan">
                  {title.split("").map((char, i) => (
                    <GlitchLetter key={i} char={char} index={i} phase={phase} />
                  ))}
                </h1>
              </motion.div>

              <motion.p
                className="font-mono text-sm md:text-base text-neon-cyan/80 tracking-[0.25em] mb-4"
                exit={{ opacity: 0, y: 10 }}
              >
                {statusText}
                <LoadingDots progress={progress} />
              </motion.p>

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

      {/* Progress bar - fades out during transition */}
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
