import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Zap } from "lucide-react";

const Register = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="register" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-neon-cyan/10 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-magenta/10 rounded-full blur-[200px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-neon-cyan/30 rounded-full bg-background/50 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4 text-accent animate-pulse" />
            <span className="font-mono text-sm text-foreground/80">
              LIMITED SPOTS AVAILABLE
            </span>
          </motion.div>

          <h2 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="text-foreground">READY TO </span>
            <span className="gradient-text-cyber">JACK IN</span>
            <span className="text-foreground">?</span>
          </h2>

          <p className="font-rajdhani text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            48 hours. 1,000,000 eddies. Infinite possibilities. 
            <br className="hidden md:block" />
            Don't miss Night City's most legendary hackathon.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="https://forms.example.com/hackswithmagnus"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 font-orbitron font-bold text-xl bg-gradient-to-r from-neon-cyan to-neon-magenta text-background rounded animate-glow-pulse hover:shadow-[0_0_60px_hsl(var(--neon-cyan)/0.5)] transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-3">
                REGISTER NOW
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>

            <motion.a
              href="https://discord.gg/hackswithmagnus"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 font-orbitron font-bold text-xl border-2 border-neon-magenta text-neon-magenta rounded hover:bg-neon-magenta/10 hover:shadow-[0_0_40px_hsl(var(--neon-magenta)/0.3)] transition-all duration-300"
            >
              JOIN DISCORD
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-8 font-mono text-sm text-muted-foreground"
          >
            Free to participate • All skill levels welcome • March 15-17, 2077
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Register;
