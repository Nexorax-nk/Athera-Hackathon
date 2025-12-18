import { useState, useCallback } from "react";
import { motion } from "framer-motion";

const GlitchText = ({ 
  children, 
  className = "", 
  triggerOnHover = true,
  glitchOnMount = false,
  onClick,
}) => {
  const [isGlitching, setIsGlitching] = useState(glitchOnMount);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (triggerOnHover && !isGlitching) {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 400);
    }
  }, [triggerOnHover, isGlitching]);

  const handleClick = useCallback(() => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    onClick?.();
  }, [onClick]);

  return (
    <motion.span
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`relative inline-block cursor-pointer isolate ${className}`}
      style={{ contain: 'layout' }}
      animate={isGlitching ? {
        scale: [1, 1.02, 1],
      } : {}}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {/* Main text with glow */}
      <motion.span 
        className="relative inline-block"
        animate={{
          textShadow: isGlitching
            ? [
                '0 0 10px hsl(var(--neon-cyan) / 0.8), 2px 0 hsl(var(--neon-cyan)), -2px 0 hsl(var(--neon-magenta))',
                '0 0 15px hsl(var(--neon-cyan)), -2px 0 hsl(var(--neon-cyan)), 2px 0 hsl(var(--neon-magenta))',
                '0 0 10px hsl(var(--neon-cyan) / 0.8), 1px 0 hsl(var(--neon-cyan)), -1px 0 hsl(var(--neon-magenta))',
              ]
            : '0 0 0px transparent',
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: 'text-shadow' }}
      >
        {children}
      </motion.span>

      {/* Holographic shimmer overlay - only shows on hover */}
      {isGlitching && (
        <motion.span
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, hsl(var(--neon-cyan) / 0.15) 50%, transparent 100%)',
              transform: 'translateX(-100%)',
            }}
            animate={{ transform: ['translateX(-100%)', 'translateX(100%)'] }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </motion.span>
      )}

      {/* Outline pulse on hover */}
      {isGlitching && (
        <motion.span
          className="absolute -inset-1 rounded pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [0.98, 1.02, 1],
          }}
          transition={{ duration: 0.3 }}
          style={{
            border: '1px solid hsl(var(--neon-cyan) / 0.4)',
            boxShadow: '0 0 10px hsl(var(--neon-cyan) / 0.2)',
          }}
        />
      )}
    </motion.span>
  );
};

export default GlitchText;