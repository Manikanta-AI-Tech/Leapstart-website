import { Navbar } from "@/components/Navbar";
import { BookingForm } from "@/components/BookingForm";
import { 
  ArrowRight, 
  Terminal, 
  Cpu, 
  Code2, 
  Database, 
  Layers, 
  BrainCircuit, 
  Briefcase, 
  GraduationCap,
  Users,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Reusable Section Component
const Section = ({ 
  children, 
  className = "", 
  id = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
  id?: string;
}) => (
  <section id={id} className={`py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: "-50px" }
};

export default function Home() {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary-foreground/80 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Admissions Open for 2026 Batch
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1]">
              Experiential Learning that makes you <br/>
              <span className="text-gradient-primary">Job-Ready</span>
            </h1>

            <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
              A 4-year on campus experiential program designed to make students industry-ready from Day One. No outdated theory—just real engineering.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                onClick={scrollToBooking}
                className="text-lg px-8 py-6 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1"
              >
                Book a Program Demo
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 rounded-xl border-white/10 text-white hover:bg-white/5 backdrop-blur-sm"
              >
                Talk to Career Advisor
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Visual representation of code/tech */}
            <div className="relative z-10 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"/>
                <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                <div className="w-3 h-3 rounded-full bg-green-500"/>
                <div className="ml-auto text-xs text-slate-500 font-mono">student_project.tsx</div>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex gap-4">
                  <span className="text-slate-600">1</span>
                  <span className="text-purple-400">import</span> <span className="text-white">Future</span> <span className="text-purple-400">from</span> <span className="text-green-400">'@leapstart/engineers'</span>;
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600">2</span>
                  <span className="text-blue-400">const</span> <span className="text-yellow-300">Student</span> = () ={">"} {"{"}
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600">3</span>
                  <div className="pl-4">
                    <span className="text-blue-400">return</span> (
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600">4</span>
                  <div className="pl-8 text-white">
                    {"<"}JobReady <span className="text-purple-400">skills</span>={"{"}['AI', 'DevOps']{"}"} /{">"}
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600">5</span>
                  <div className="pl-4 text-white">);</div>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600">6</span>
                  <span className="text-white">{"}"};</span>
                </div>
              </div>

              {/* Stats Overlay */}
              <div className="absolute -bottom-10 -right-10 bg-white text-slate-900 p-6 rounded-2xl shadow-xl flex flex-col gap-1 max-w-[200px]">
                <span className="text-4xl font-bold text-primary">₹50k</span>
                <span className="text-sm font-medium leading-tight">Average internship stipend by Year 3</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE PROBLEM SECTION */}
      <section className="bg-white text-slate-900 py-24 light-theme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              We create real world problem solvers and technology disruptors.
            </h2>
            <p className="text-xl text-slate-600">
              Engineering education is broken. It focuses on passing exams, not building careers.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: AlertTriangle,
                title: "75% Not Job-Ready",
                desc: "Companies struggle to find graduates with actual coding skills."
              },
              {
                icon: Briefcase,
                title: "Outdated Curriculum",
                desc: "Learning tech from 2010 won't get you a job in 2025."
              },
              {
                icon: Terminal,
                title: "No Real Projects",
                desc: "Writing code on paper doesn't count as experience."
              },
              {
                icon: Users,
                title: "Forced Coaching",
                desc: "Students pay lakhs for bootcamps after graduation just to learn."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-red-200 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-16 text-center">
            <p className="text-2xl font-display font-medium text-slate-800">
              Engineering should prepare students for <span className="text-primary font-bold decoration-wavy underline">careers</span> — not confusion.
            </p>
          </div>
        </div>
      </section>

      {/* WHY LEAPSTART */}
      <Section className="relative" id="why-leapstart">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn}>
            <span className="text-accent font-semibold tracking-wider text-sm uppercase">Our Purpose</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6 text-white">
              LeapStart Was Built to <br/><span className="text-gradient-primary">Fix This Problem</span>
            </h2>
            <p className="text-lg text-slate-400 mb-6 leading-relaxed">
              We bridge the massive gap between traditional engineering education and real industry requirements. We don't just teach computer science; we create software engineers.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-1 bg-primary h-full rounded-full min-h-[60px]" />
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Our Vision</h4>
                  <p className="text-slate-400">Create engineers who can think, build, and contribute from Day One.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 bg-accent h-full rounded-full min-h-[60px]" />
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Our Mission</h4>
                  <p className="text-slate-400">Combine strong academics with real-world engineering experience.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            {...fadeIn}
            className="grid sm:grid-cols-2 gap-4"
          >
            {[
              { label: "Real-world Projects", val: "50+" },
              { label: "Internship Stipend", val: "₹50k/mo" },
              { label: "Degree Program", val: "4 Years" },
              { label: "Focus", val: "AI & Data" },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-800/50 backdrop-blur border border-white/5 p-8 rounded-2xl hover:bg-slate-800 transition-colors">
                <div className="text-4xl font-bold text-white mb-2">{stat.val}</div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* LEARNING JOURNEY TIMELINE */}
      <section id="journey" className="bg-slate-900 border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-wider text-sm uppercase">Curriculum</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">
              Your 4-Year Evolution
            </h2>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0" />
            
            <div className="grid lg:grid-cols-4 gap-8 relative z-10">
              {[
                { 
                  year: "Year 1", 
                  title: "The Foundation", 
                  skills: ["Programming Logic", "Problem Solving", "C++ / Java", "Data Structures"],
                  icon: Code2 
                },
                { 
                  year: "Year 2", 
                  title: "Full Stack Dev", 
                  skills: ["Frontend (React)", "Backend (Node)", "Databases", "APIs & Auth"],
                  icon: Layers
                },
                { 
                  year: "Year 3", 
                  title: "System Design", 
                  skills: ["Cloud (AWS)", "DevOps", "Microservices", "Scalability"],
                  icon: Database
                },
                { 
                  year: "Year 4", 
                  title: "Specialization", 
                  skills: ["AI & ML", "Data Science", "Capstone Project", "Industry Internship"],
                  icon: BrainCircuit
                },
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background border border-slate-800 p-6 rounded-2xl group hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="text-accent font-bold text-sm mb-2 uppercase tracking-wide">{step.year}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <ul className="space-y-2">
                    {step.skills.map(skill => (
                      <li key={skill} className="flex items-center gap-2 text-slate-400 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-primary" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES & STUDENT WORK */}
      <Section id="outcomes">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              What You Actually Do
            </h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                  <Terminal className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Build 50+ Real Apps</h4>
                  <p className="text-slate-400">Not "Hello World". You build chat apps, e-commerce platforms, and AI models.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Collaborate on GitHub</h4>
                  <p className="text-slate-400">Learn to work in teams, review code, and manage versions like pros.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Portfolio-Based Assessment</h4>
                  <p className="text-slate-400">Your grades depend on what you build, not just what you memorize.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Outcome Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary to-indigo-600 p-6 rounded-2xl text-white shadow-lg transform lg:translate-y-12">
              <h3 className="text-2xl font-bold mb-2">1000+ Hours</h3>
              <p className="opacity-90">Of pure coding experience before you even graduate.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-white/5 text-slate-300">
              <h3 className="text-2xl font-bold text-white mb-2">IIT Degree</h3>
              <p>B.S. Degree in Data Science & Applications from IIT Jodhpur (Remote learning).</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-white/5 text-slate-300 transform lg:translate-y-12">
              <h3 className="text-2xl font-bold text-white mb-2">Confidence</h3>
              <p>Walk into interviews knowing you have built more than the interviewer.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl text-slate-900 shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Career Clarity</h3>
              <p className="text-slate-600">Know exactly which domain (Frontend, Backend, AI) suits you best.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* PARENT REASSURANCE */}
      <section className="bg-slate-50 text-slate-900 py-20 light-theme">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeIn}>
            <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">A Note for Parents</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              "IIT Rank doesn't define success. Skills do." <br/><br/>
              The world has changed. Google and Amazon don't care about rank; they care if you can solve problems. At LeapStart, we provide the environment, mentorship, and curriculum that traditional colleges lack. We turn students into professionals.
            </p>
            <div className="w-24 h-1 bg-slate-200 mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA & BOOKING FORM */}
      <Section id="booking" className="relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your <br/>
              <span className="text-primary">Real Engineering</span> Journey?
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Don't just take admission. Take a step towards a career. Book a free demo to see our campus, meet mentors, and understand the curriculum.
            </p>
            
            <ul className="space-y-4 mb-8">
              {["Attend a Free Demo Class", "Understand the Career Path", "Make an Informed Decision"].map((step, i) => (
                <li key={i} className="flex items-center gap-4 text-white">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <BookingForm />
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-background border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold font-display text-white">LeapStart</span>
              </div>
              <p className="text-slate-500 max-w-sm">
                Creating the next generation of software engineers who are ready to build, lead, and innovate.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="hover:text-primary cursor-pointer">About Us</li>
                <li className="hover:text-primary cursor-pointer">Programs</li>
                <li className="hover:text-primary cursor-pointer">Admissions</li>
                <li className="hover:text-primary cursor-pointer">Contact</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
                <li className="hover:text-primary cursor-pointer">Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center text-slate-600 text-sm">
            © {new Date().getFullYear()} LeapStart School of Technology. All rights reserved.
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918328409387"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[9999] bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
        title="Chat on WhatsApp"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-6 h-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.552 4.197 1.603 6.02L0 24l6.135-1.61a11.81 11.81 0 005.911 1.56H12.05c6.635 0 12.05-5.414 12.05-12.05a11.81 11.81 0 00-3.476-8.514z"/>
        </svg>
      </a>
    </div>
  );
}
