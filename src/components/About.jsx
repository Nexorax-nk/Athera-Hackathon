import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Users,
  Clock,
  Calendar,
  MapPin,
  GraduationCap,
  Zap,
  Lightbulb,
  Hammer,
  Rocket
} from "lucide-react";

const StatItem = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center justify-center p-3 md:p-4 text-center"
  >
    <div className={`p-2 md:p-3 rounded-full bg-${color}/10 mb-2 md:mb-3`}>
      <Icon className={`w-5 h-5 md:w-6 md:h-6 text-${color}`} />
    </div>
    <span className="font-orbitron text-xl md:text-2xl font-bold text-white mb-1">{value}</span>
    <span className="font-rajdhani text-xs md:text-sm text-muted-foreground uppercase tracking-widest">{label}</span>
  </motion.div>
);

const GlassCard = ({ title, children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={`relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 ${className}`}
  >
    {/* Hover Gradient Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 via-transparent to-neon-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10">
      {title && (
        <h3 className="font-orbitron text-lg md:text-xl font-bold text-white mb-4 border-b border-white/10 pb-4 inline-block">
          {title}
        </h3>
      )}
      {children}
    </div>
  </motion.div>
);

const ProcessStep = ({ icon: Icon, title, desc, number, color }) => (
  <div className="relative z-10 flex flex-col items-center text-center group">
    <div className="relative mb-4 md:mb-6">
      <div className={`absolute inset-0 bg-${color} blur-[30px] opacity-20 group-hover:opacity-40 transition-opacity`} />
      <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-${color}/30 bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-6 h-6 md:w-8 md:h-8 text-${color}`} />
      </div>
      <div className={`absolute -top-3 -right-3 w-6 h-6 md:w-8 md:h-8 rounded-full bg-${color} flex items-center justify-center font-bold text-black text-xs md:text-sm`}>
        {number}
      </div>
    </div>
    <h4 className="font-orbitron text-base md:text-lg font-bold text-white mb-2">{title}</h4>
    <p className="font-rajdhani text-xs md:text-sm text-muted-foreground leading-relaxed max-w-[250px]">
      {desc}
    </p>
  </div>
);

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden bg-background">
      {/* Soft Ambient Background - Adjusted for mobile */}
      <div className="absolute top-1/4 -left-64 w-64 h-64 md:w-96 md:h-96 bg-neon-cyan/20 rounded-full blur-[100px] md:blur-[128px]" />
      <div className="absolute bottom-1/4 -right-64 w-64 h-64 md:w-96 md:h-96 bg-neon-magenta/20 rounded-full blur-[100px] md:blur-[128px]" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white tracking-tight">
            ABOUT THE <span className="text-neon-cyan">SPRINT</span>
          </h2>
          <p className="font-rajdhani text-base md:text-lg text-muted-foreground leading-relaxed px-2">
            ATHERA INNOVATION SPRINT is a <span className="text-white">high-octane hackathon</span> designed to test your limits. 
            No fluff, just pure innovation. Gather your team, build your prototype, and make an impact.
          </p>
        </motion.div>

        {/* 1. KEY STATS - Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 border-y border-white/10 py-6 md:py-8 bg-white/5 backdrop-blur-sm">
          <StatItem icon={Calendar} value="Feb 02, 2026" label="Final Round" color="neon-cyan" delay={0.1} />
          <StatItem icon={Clock} value="08 Hours" label="Duration" color="neon-magenta" delay={0.2} />
          <StatItem icon={Users} value="3-5 Members" label="Team Size" color="neon-cyan" delay={0.3} />
          <StatItem icon={Zap} value="Free" label="Registration" color="accent" delay={0.4} />
        </div>

        {/* 2. MAIN INFO - Stacked on Mobile, Split on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          {/* Eligibility Card */}
          <GlassCard title="WHO CAN JOIN?" delay={0.2} className="h-full">
             <div className="flex items-start gap-4">
                <div className="p-2 md:p-3 bg-neon-cyan/10 rounded-lg shrink-0">
                  <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-neon-cyan" />
                </div>
                <div>
                  <p className="font-rajdhani text-gray-300 mb-3 md:mb-4 text-base md:text-lg">
                    Open to all <strong className="text-white">UG & PG Students</strong> from any institution.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full shrink-0" /> Inter-college teams allowed
                    </li>
                    <li className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full shrink-0" /> Beginner friendly
                    </li>
                  </ul>
                </div>
             </div>
          </GlassCard>

          {/* Venue Card */}
          <GlassCard title="THE BATTLEGROUND" delay={0.3} className="h-full">
            <div className="flex items-start gap-4">
                <div className="p-2 md:p-3 bg-neon-magenta/10 rounded-lg shrink-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-neon-magenta" />
                </div>
                <div>
                  <p className="font-rajdhani text-gray-300 mb-3 md:mb-4 text-base md:text-lg">
                    <strong className="text-white">Chennai Institute of Technology</strong>
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    Experience the thrill of an offline hackathon. Code alongside the best minds in a high-energy environment.
                  </p>
                </div>
             </div>
             {/* Abstract Map Graphic */}
             <div className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 opacity-10 pointer-events-none">
                <MapPin className="w-full h-full" />
             </div>
          </GlassCard>
        </div>

        {/* 3. WORKFLOW - Vertical on Mobile, Horizontal on Desktop */}
        <GlassCard className="text-center" delay={0.4}>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 py-4 relative">
              {/* Connecting Line (Desktop Only) */}
              <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-neon-cyan via-purple-500 to-neon-magenta opacity-30" />
              
              {/* Connecting Line (Mobile Only - Vertical) */}
              <div className="md:hidden absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-neon-cyan via-purple-500 to-neon-magenta opacity-20 -translate-x-1/2" />

              <ProcessStep 
                number="01"
                icon={Lightbulb} 
                title="IDEATE" 
                desc="Identify a problem and brainstorm a unique solution." 
                color="neon-cyan"
              />
              <ProcessStep 
                number="02"
                icon={Hammer} 
                title="BUILD" 
                desc="Develop a working prototype within the 8-hour timeframe." 
                color="neon-magenta"
              />
              <ProcessStep 
                number="03"
                icon={Rocket} 
                title="INNOVATE" 
                desc="Present your solution to the judges and win big." 
                color="accent"
              />
           </div>
        </GlassCard>

      </div>
    </section>
  );
};

export default About;