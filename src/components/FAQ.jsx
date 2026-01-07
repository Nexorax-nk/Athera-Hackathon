import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Plus, 
  Minus, 
  Target, 
  Code, 
  Zap, 
  Monitor, 
  Mic, 
  AlertTriangle,
  Check
} from "lucide-react";

// --- DATA ---
const faqs = [
  {
    question: "Who can participate?",
    answer: "Open to all UG and PG students from any college. Teams of 2-4 members. Zero registration fee.",
  },
  {
    question: "What are the domains?",
    answer: "FinTech, EduTech, HealthTech, Environment and Sustainablity.",
  },
  {
    question: "Hackathon Structure?",
    answer: "Round 1: PPT Submission. Round 2: Prototype Submission. Round 3: Offline 6-hr Finale at CIT.",
  },
  {
    question: "PPT Requirements?",
    answer: "Problem statement, solution, features, tech stack, impact, and feasibility.",
  },
  {
    question: "Tech Stack restrictions?",
    answer: "None. You are free to use any language, framework, or tool.",
  },
  {
    question: "Judging Criteria?",
    answer: "Innovation, Tech Implementation, Impact, UX/UI, and Presentation.",
  },
];

const evaluationCriteria = [
  { title: "Innovation", icon: Target, desc: "Originality of the idea" },
  { title: "Tech Stack", icon: Code, desc: "Code quality & implementation" },
  { title: "Impact", icon: Zap, desc: "Real-world practicality" },
  { title: "UI/UX", icon: Monitor, desc: "Design & User Experience" },
  { title: "Pitch", icon: Mic, desc: "Clarity of presentation" },
];

const rules = [
  "Original work only. Plagiarism leads to disqualification.",
  "Teams must strictly adhere to the provided deadlines.",
  "Teams must consist of 2 to 4 members.",
  "Professional and respectful conduct is mandatory.",
  "Judges' decisions are final and binding.",
];

// --- COMPONENTS ---

// 1. Evaluation Card (Neon Glass Style)
const CriteriaCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group relative p-6 rounded-xl bg-card/20 border border-neon-cyan/20 hover:border-neon-cyan backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] text-center flex flex-col items-center"
  >
    <div className="p-4 mb-4 rounded-full bg-neon-cyan/10 text-neon-cyan group-hover:bg-neon-cyan group-hover:text-black transition-colors duration-300">
      <item.icon className="w-8 h-8" />
    </div>
    <h3 className="font-orbitron text-lg font-bold text-white mb-2">{item.title}</h3>
    <p className="font-rajdhani text-sm text-muted-foreground">{item.desc}</p>
  </motion.div>
);

// 2. Rules List Item (Sharp & Clean)
const RuleItem = ({ rule, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="flex items-start gap-4 p-4 mb-3 rounded border border-white/5 bg-white/5 hover:bg-white/10 hover:border-neon-magenta/50 transition-all duration-300"
  >
    <div className="mt-1">
      <Check className="w-5 h-5 text-neon-magenta" />
    </div>
    <p className="font-rajdhani text-lg text-gray-300">
      {rule}
    </p>
  </motion.div>
);

// 3. FAQ Accordion (High Contrast)
const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="mb-4">
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-6 rounded-lg border transition-all duration-300 ${
        isOpen 
        ? "bg-neon-cyan/10 border-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.15)]" 
        : "bg-card/30 border-white/10 hover:border-white/30"
      }`}
    >
      <span className={`font-orbitron text-lg font-bold text-left ${isOpen ? "text-neon-cyan" : "text-white"}`}>
        {question}
      </span>
      <div className={`ml-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
        {isOpen ? (
          <Minus className="w-5 h-5 text-neon-cyan" />
        ) : (
          <Plus className="w-5 h-5 text-white/50" />
        )}
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="p-6 pt-2 border-l-2 border-neon-cyan/30 ml-4 mt-2">
            <p className="font-rajdhani text-lg text-gray-300 leading-relaxed">
              {answer}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-magenta/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* --- SECTION 1: EVALUATION (Centered Grid) --- */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-12">
            <span className="gradient-text-cyber">EVALUATION METRICS</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {evaluationCriteria.map((item, index) => (
              <CriteriaCard key={index} item={item} index={index} />
            ))}
          </div>
        </motion.div>


        {/* --- SECTION 2: RULES (Clean Panel) --- */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-24 items-start">
           
           {/* Left: Title */}
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="md:col-span-4"
           >
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-6">
                RULES & <br/><span className="text-neon-magenta">GUIDELINES</span>
              </h2>
              <div className="p-4 rounded border border-yellow-500/30 bg-yellow-500/5 flex items-start gap-3">
                 <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0" />
                 <p className="font-rajdhani text-sm text-yellow-200/80">
                   Violation of any rule may lead to immediate disqualification. Play fair, code hard.
                 </p>
              </div>
           </motion.div>

           {/* Right: List */}
           <div className="md:col-span-8">
              {rules.map((rule, index) => (
                <RuleItem key={index} rule={rule} index={index} />
              ))}
           </div>
        </div>


        {/* --- SECTION 3: FAQ (Centered) --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-2 text-white">
              FAQ
            </h2>
            <p className="font-rajdhani text-muted-foreground">Common queries answered</p>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQ;