import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Who can participate in HacksWithMagnus?",
    answer: "Any choom with a valid ID and a passion for tech. Students, professionals, solos, corpos — everyone's welcome. You must be at least 18 to compete. Teams can have 1-4 members.",
  },
  {
    question: "What can I build?",
    answer: "Anything goes — web apps, mobile apps, hardware hacks, AI/ML projects, games, cyberware prototypes, security tools. If it runs code or uses tech, it counts. Pre-existing projects are not allowed; all work must be done during the 48-hour window.",
  },
  {
    question: "Do I need a team?",
    answer: "Nope. You can go solo or form a team of up to 4. We'll have a team formation session on Day 1 if you're looking for chooms to work with.",
  },
  {
    question: "What should I bring?",
    answer: "Your laptop, chargers, toiletries, sleeping bag (if you want), and any hardware you're planning to hack on. We provide food, drinks, wifi, and power. Leave the weapons at home.",
  },
  {
    question: "Is there a code of conduct?",
    answer: "Yes. Respect other hackers, mentors, and sponsors. No harassment, discrimination, or gonk behavior. Violations will get you kicked out. Full details in the registration packet.",
  },
  {
    question: "How is judging done?",
    answer: "Projects are judged on innovation, technical complexity, polish, and impact. Each team presents a 3-minute demo to our panel of industry fixers and tech legends. Track winners are chosen first, then overall.",
  },
  {
    question: "Is the event in-person or virtual?",
    answer: "In-person only. The venue is the Afterlife Club in Night City. No remote participation for the main event, but we'll livestream the demos and awards ceremony.",
  },
  {
    question: "What's the refund policy?",
    answer: "Registration is free, so no refunds needed. If you can't make it, please cancel your spot so another hacker can take it.",
  },
];

const FAQItem = ({ question, answer, isOpen, onClick }: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void;
}) => (
  <motion.div
    initial={false}
    className={`border rounded-lg transition-all duration-300 ${
      isOpen 
        ? "border-neon-cyan bg-card/50" 
        : "border-border/50 bg-card/20 hover:border-neon-cyan/50"
    }`}
  >
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-5 text-left"
    >
      <span className="font-orbitron font-semibold text-foreground pr-4">
        {question}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown className={`w-5 h-5 flex-shrink-0 ${isOpen ? "text-neon-cyan" : "text-muted-foreground"}`} />
      </motion.div>
    </button>
    
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-5 pb-5 pt-0">
            <p className="font-rajdhani text-muted-foreground">
              {answer}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid bg-grid-40 opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-neon-cyan mb-4 block tracking-widest">
            // GOT QUESTIONS?
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-4 gradient-text-cyber">
            FAQ
          </h2>
          <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know before you jack in.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
