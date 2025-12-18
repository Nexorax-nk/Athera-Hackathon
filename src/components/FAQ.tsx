import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Who can participate in the Innovation Sprint Hackathon?",
    answer:
      "The hackathon is open to all undergraduate and postgraduate students from any college. Participants must be currently enrolled in an academic institution. Students from all branches and disciplines are welcome.",
  },
  {
    question: "What is the team size for the hackathon?",
    answer:
      "Each team must consist of 2 to 4 members. Solo participation is not allowed, as the event focuses on teamwork and collaborative problem-solving.",
  },
  {
    question: "Is there any registration fee?",
    answer:
      "No. The Innovation Sprint Hackathon is completely free of cost. There is no registration or participation fee for any round of the event.",
  },
  {
    question: "What domains can we choose for our project?",
    answer:
      "Participants may choose one domain for their project submission: Web3 and Blockchain, FinTech, EduTech, HealthTech, GreenTech and Sustainability, or Open Innovation. Projects must clearly align with the selected domain.",
  },
  {
    question: "How is the hackathon structured?",
    answer:
      "The hackathon consists of three rounds: Round 1 is PPT submission, Round 2 is prototype submission, and Round 3 is the offline final round conducted on February 2, 2026, at Chennai Institute of Technology with live demo and presentation.",
  },
  {
    question: "How will the projects be evaluated?",
    answer:
      "Projects will be evaluated based on innovation and originality, technical implementation, practicality and real-world impact, user experience and interface quality, and clarity of presentation.",
  },
  {
    question: "What rules should participants follow?",
    answer:
      "All submissions must be original. Plagiarism will result in immediate disqualification. Teams must adhere to deadlines, maintain professional conduct, and accept the judges’ decisions as final.",
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
