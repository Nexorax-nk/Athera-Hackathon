import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown, CheckCircle, AlertTriangle } from "lucide-react";

const faqs = [
  {
    question: "Who can participate in ATHERA Innovation Sprint?",
    answer: "The hackathon is open to all UG and PG students from any college. Teams must consist of 2 to 4 members. Registration is completely free!",
  },
  {
    question: "What domains can I build projects in?",
    answer: "You can choose from 6 domains: Web3 & Blockchain, FinTech, EduTech, HealthTech, GreenTech & Sustainability, or Open Innovation for unique ideas that don't fit other categories.",
  },
  {
    question: "What is the hackathon structure?",
    answer: "The hackathon has 3 rounds: Round 1 is PPT submission where you present your idea. Round 2 is Prototype submission for shortlisted teams. Round 3 is the offline 8-hour final round at Chennai Institute of Technology on February 2, 2026.",
  },
  {
    question: "What should I include in my PPT submission?",
    answer: "Your presentation should cover: problem statement, proposed solution, key features, technology stack, expected impact, and feasibility of implementation.",
  },
  {
    question: "Can I use any programming language or framework?",
    answer: "Yes! Participants are free to use any programming languages, tools, or frameworks they prefer. Choose the tech stack that best suits your solution.",
  },
  {
    question: "How is judging done?",
    answer: "Projects are evaluated on: Innovation and originality, Technical implementation, Practicality and real-world impact, User experience and interface quality, and Presentation clarity and problem-solving approach.",
  },
];

const evaluationCriteria = [
  "Innovation and originality",
  "Technical implementation",
  "Practicality and potential real-world impact",
  "User experience and interface quality",
  "Presentation clarity and problem-solving approach",
];

const rules = [
  "All submitted work must be original.",
  "Plagiarism or duplication will result in immediate disqualification.",
  "Teams must adhere to all deadlines for each round.",
  "Participants are free to use any programming languages, tools, or frameworks.",
  "Professional and respectful conduct is expected throughout the event.",
  "Judges' decisions will be final.",
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
        {/* Evaluation Criteria Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="text-center mb-8">
            <span className="font-mono text-sm text-neon-magenta mb-4 block tracking-widest">
              // JUDGING CRITERIA
            </span>
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4 gradient-text-sunset">
              EVALUATION CRITERIA
            </h2>
          </div>

          <div className="grid gap-3">
            {evaluationCriteria.map((criteria, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 border border-neon-magenta/30 rounded-lg bg-card/30 backdrop-blur-sm"
              >
                <CheckCircle className="w-5 h-5 text-neon-magenta flex-shrink-0" />
                <span className="font-rajdhani text-foreground">{criteria}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Rules Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="text-center mb-8">
            <span className="font-mono text-sm text-accent mb-4 block tracking-widest">
              // IMPORTANT
            </span>
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4 text-accent text-glow-yellow">
              RULES & GUIDELINES
            </h2>
          </div>

          <div className="p-6 border border-accent/30 rounded-lg bg-card/30 backdrop-blur-sm">
            <ol className="space-y-4">
              {rules.map((rule, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="font-orbitron font-bold text-accent text-lg min-w-[2rem]">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="font-rajdhani text-foreground">{rule}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-sm text-neon-cyan mb-4 block tracking-widest">
            // GOT QUESTIONS?
          </span>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4 gradient-text-cyber">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about ATHERA Innovation Sprint.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
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