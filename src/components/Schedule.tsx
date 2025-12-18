import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, Rocket, Users, Code, Trophy, PartyPopper, Coffee, Lightbulb, Zap } from "lucide-react";
import GlitchText from "./GlitchText";

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: React.ElementType;
  highlight?: boolean;
}

interface DaySchedule {
  day: string;
  date: string;
  events: TimelineEvent[];
}

const schedule: DaySchedule[] = [
  {
    day: "DAY 1",
    date: "MARCH 15",
    events: [
      { time: "09:00", title: "Gates Open", description: "Check-in and registration at Afterlife Club", icon: Clock },
      { time: "10:00", title: "Opening Ceremony", description: "Welcome speech from Magnus himself", icon: Rocket },
      { time: "11:00", title: "Team Formation", description: "Find your crew or go solo", icon: Users },
      { time: "12:00", title: "HACKING BEGINS", description: "48 hours on the clock. Let's go.", icon: Code, highlight: true },
      { time: "14:00", title: "Lunch Break", description: "Sponsored by Arasaka Foods", icon: Coffee },
      { time: "18:00", title: "Workshop: AI Basics", description: "Neural net fundamentals", icon: Lightbulb },
    ],
  },
  {
    day: "DAY 2",
    date: "MARCH 16",
    events: [
      { time: "00:00", title: "Midnight Mentoring", description: "One-on-one with industry fixers", icon: Zap },
      { time: "08:00", title: "Breakfast", description: "Fuel up for the final stretch", icon: Coffee },
      { time: "10:00", title: "Workshop: Pitching", description: "How to sell your idea", icon: Lightbulb },
      { time: "14:00", title: "Lunch Break", description: "Last chance to network", icon: Coffee },
      { time: "18:00", title: "Office Hours", description: "Final mentor sessions", icon: Users },
      { time: "22:00", title: "Energy Boost", description: "Late night snacks and drinks", icon: Zap },
    ],
  },
  {
    day: "DAY 3",
    date: "MARCH 17",
    events: [
      { time: "08:00", title: "Final Breakfast", description: "Last meal before submission", icon: Coffee },
      { time: "12:00", title: "HACKING ENDS", description: "Submit your projects", icon: Code, highlight: true },
      { time: "13:00", title: "Judging Begins", description: "Demos and presentations", icon: Trophy },
      { time: "16:00", title: "Closing Ceremony", description: "Winners announced", icon: Trophy, highlight: true },
      { time: "17:00", title: "After Party", description: "Celebrate at Afterlife", icon: PartyPopper },
    ],
  },
];

const TimelineItem = ({ 
  event, 
  index, 
  isLeft,
  dayIndex,
}: { 
  event: TimelineEvent; 
  index: number;
  isLeft: boolean;
  dayIndex: number;
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const Icon = event.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex items-center gap-4 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
    >
      {/* Content Card */}
      <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} text-left`}>
       <motion.div
  initial={{ scale: 1 }}
  whileHover={{ scale: 1.02 }}   // optional eye candy
  className={`p-4 md:p-6 rounded-lg border backdrop-blur-sm
    transition-all duration-300
    ${event.highlight 
      ? 'border-neon-cyan bg-neon-cyan/15 box-glow-cyan'
      : 'border-neon-cyan/40 bg-card/50'
    }
  `}
>

          <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <span className="font-mono text-sm text-neon-magenta font-semibold">
              {event.time}
            </span>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              event.highlight 
                ? 'bg-neon-cyan/20 border border-neon-cyan/50' 
                : 'bg-card border border-border/50'
            }`}>
              <Icon className={`w-5 h-5 ${event.highlight ? 'text-neon-cyan' : 'text-primary'}`} />
            </div>
          </div>
          <h4 className={`font-orbitron font-semibold text-lg ${
            event.highlight ? 'text-neon-cyan text-glow-cyan' : 'text-foreground'
          }`}>
            <GlitchText triggerOnHover={true}>
              {event.title}
            </GlitchText>
          </h4>
          <p className="font-rajdhani text-muted-foreground mt-1">
            {event.description}
          </p>
        </motion.div>
      </div>

      {/* Timeline dot - Hidden on mobile */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className={`w-4 h-4 rounded-full border-2 z-10 ${
            event.highlight 
              ? 'bg-neon-cyan border-neon-cyan shadow-[0_0_10px_hsl(var(--neon-cyan))]' 
              : 'bg-background border-primary'
          }`}
        />
      </div>

      {/* Spacer for alignment */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
};

const Schedule = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="schedule" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-neon-magenta/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-neon-cyan mb-4 block tracking-widest">
            // EVENT TIMELINE
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-4">
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-4">
  <GlitchText triggerOnHover={false} glitchOnMount={true}>
    THE SCHEDULE
  </GlitchText>
</h2>


          </h2>
          <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto">
            48 hours of non-stop hacking. Here's how it goes down.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-16">
          {schedule.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: dayIndex * 0.2 }}
            >
              {/* Day Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: dayIndex * 0.2 }}
                  className="inline-flex items-center gap-4 px-6 py-3 bg-card/50 border border-neon-cyan/30 rounded-full backdrop-blur-sm"
                >
                  <span className="font-orbitron text-xl md:text-2xl font-bold text-primary text-glow-cyan">
                    {day.day}
                  </span>
                  <span className="w-px h-6 bg-border" />
                  <span className="font-mono text-sm text-muted-foreground">
                    {day.date}
                  </span>
                </motion.div>
              </div>

              {/* Timeline Events */}
              <div className="relative">
                {/* Vertical line - Desktop only */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-magenta to-neon-cyan timeline-line transform -translate-x-1/2" />
                
                {/* Mobile vertical line */}
                <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-magenta to-neon-cyan" />

                <div className="space-y-6">
                  {day.events.map((event, eventIndex) => (
                    <TimelineItem
                      key={event.time}
                      event={event}
                      index={eventIndex}
                      isLeft={eventIndex % 2 === 0}
                      dayIndex={dayIndex}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
