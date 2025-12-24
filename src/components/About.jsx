import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Users,
  Clock,
  Calendar,
  MapPin,
  GraduationCap,
  Wallet,
} from "lucide-react";

const eventDetails = [
  { icon: Calendar, value: "Feb 2, 2026", label: "Final Round" },
  { icon: Clock, value: "8", label: "Hours" },
  { icon: Users, value: "2-4", label: "Team Size" },
  { icon: Wallet, value: "FREE", label: "Registration" },
];

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-neon-cyan/5 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* ================= HEADER ================= */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <span className="font-mono text-sm text-neon-cyan mb-4 block tracking-widest">
            // ABOUT THE EVENT
          </span>

          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-6 gradient-text-pinkviolet">
            ATHERA INNOVATION SPRINT
          </h2>

          <p className="font-rajdhani text-lg md:text-xl text-muted-foreground leading-relaxed">
            This hackathon aims to inspire students to develop solutions that combine creativity,
            technical knowledge, and real-world applicability.
          </p>
        </motion.div>

        {/* ================= EVENT DETAILS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
          {eventDetails.map((detail, index) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="
                p-6 rounded-lg bg-card/50 backdrop-blur-sm
                border border-neon-cyan/30
                transition-all duration-300
                hover:border-neon-cyan
                hover:box-glow-cyan
              "
            >
              <div className="flex flex-col items-center">
                <detail.icon className="w-8 h-8 text-neon-magenta mb-3" />

                {/* Original cyan color */}
                <span className="font-orbitron text-2xl md:text-3xl font-bold text-primary">
                  {detail.value}
                </span>

                <span className="font-mono text-xs text-muted-foreground mt-1 tracking-widest uppercase">
                  {detail.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= ELIGIBILITY & VENUE ================= */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="
              p-6 rounded-lg bg-card/30 backdrop-blur-sm
              border border-neon-cyan/30
              transition-all duration-300
              hover:border-neon-cyan
              hover:box-glow-cyan
            "
          >
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-8 h-8 text-neon-cyan" />
              <h3 className="font-orbitron text-xl font-bold gradient-text-pinkviolet">
                ELIGIBILITY
              </h3>
            </div>

            <p className="font-rajdhani text-muted-foreground">
              Open to all <span className="text-primary font-semibold">UG and PG students</span>.
              Teams of 2–4 members.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="
              p-6 rounded-lg bg-card/30 backdrop-blur-sm
              border border-neon-magenta/30
              transition-all duration-300
              hover:border-neon-magenta
              hover:box-glow-magenta
            "
          >
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-neon-magenta" />
              <h3 className="font-orbitron text-xl font-bold gradient-text-pinkviolet">
                VENUE
              </h3>
            </div>

            <p className="font-rajdhani text-muted-foreground">
              <span className="text-primary font-semibold">
                Chennai Institute of Technology
              </span>{" "}
              — Offline final round.
            </p>
          </motion.div>
        </div>

        {/* ================= FEATURES ================= */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "IDEATE", desc: "Brainstorm innovative solutions." },
            { title: "BUILD", desc: "Convert ideas into prototypes." },
            { title: "INNOVATE", desc: "Create real-world impact." },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="
                p-6 rounded-lg bg-card/30 backdrop-blur-sm
                border border-neon-magenta/30
                transition-all duration-300
                hover:border-neon-magenta
                hover:box-glow-magenta
              "
            >
              <h3 className="font-orbitron text-xl font-bold gradient-text-pinkviolet mb-3">
                {feature.title}
              </h3>
              <p className="font-rajdhani text-muted-foreground">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;