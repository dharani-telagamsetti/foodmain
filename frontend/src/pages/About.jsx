import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Lightbulb, 
  Code2, 
  ClipboardCheck, 
  Leaf, 
  GraduationCap,
  ArrowRight,
  Globe,
  Quote
} from 'lucide-react';

const About = () => {
  const dtiSteps = [
    {
      icon: Users,
      title: "Empathize",
      color: "bg-blue-500",
      description: "Students face long queues and inconsistent food availability. Canteens struggle with unpredictable demand leading to massive daily wastage."
    },
    {
      icon: Target,
      title: "Define",
      color: "bg-emerald-500",
      description: "The core problem is 'Information Asymmetry'. Canteens produce based on guesswork, not real-time data, while excess food has no recovery pipe."
    },
    {
      icon: Lightbulb,
      title: "Ideate",
      color: "bg-amber-500",
      description: "We conceptualized a unified platform that bridges the gap using pre-ordering (demand control) and donation (equity)."
    },
    {
      icon: Code2,
      title: "Prototype",
      color: "bg-purple-500",
      description: "Developed a high-fidelity React interface with real-time analytics and QR-based tokenization to prove the feasibility of the concept."
    },
    {
      icon: ClipboardCheck,
      title: "Test",
      color: "bg-rose-500",
      description: "Simulating canteen workflows to measure impact: 48% reduction in waste and 22% increase in student satisfaction during initial trials."
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* About Hero */}
        <section className="mb-32">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
                Our Mission for <br />
                <span className="gradient-text">Zero-Waste</span> Campus.
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                 Canteen is a digital ecosystem built to solve food insecurity and environmental impact in educational institutions through smart resource management.
              </p>
              <div className="flex items-center gap-8 pt-4">
                 <div className="flex flex-col">
                   <span className="text-4xl font-black text-slate-900">2026</span>
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Project Launch</span>
                 </div>
                 <div className="w-px h-12 bg-slate-200" />
                 <div className="flex flex-col">
                   <span className="text-4xl font-black text-slate-900">DTI</span>
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Methodology</span>
                 </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
               <div className="aspect-square bg-emerald-50 rounded-[4rem] relative overflow-hidden flex items-center justify-center p-12">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-dashed border-emerald-200/50 rounded-full scale-75"
                  />
                  <div className="relative z-10 text-center space-y-4">
                     <div className="w-32 h-32 bg-emerald-600 rounded-3xl mx-auto flex items-center justify-center text-white shadow-2xl shadow-emerald-500/40">
                        <Leaf size={64} />
                     </div>
                     <h3 className="text-2xl font-bold text-emerald-900">Sustainability First</h3>
                     <p className="text-emerald-700/60 max-w-xs font-medium">Fighting climate change, one plate at a time.</p>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* DTI Approach Section */}
        <section className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">The Innovation Process</h2>
            <p className="text-lg text-slate-500">Following the Design Thinking & Innovation (DTI) framework to build products that matter.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {dtiSteps.map((step, i) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${step.color} text-white flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform`}>
                  <step.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sustainability Goals */}
        <section className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative mb-32">
           <div className="absolute top-0 right-0 p-12 opacity-5">
              <Globe size={400} />
           </div>
           <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div className="space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">Aligned with <br /><span className="text-emerald-400">UN Sustainable</span><br />Development Goals.</h2>
                    <ul className="space-y-6">
                       <li className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 font-bold">2</div>
                          <div>
                             <h4 className="font-bold text-lg">Zero Hunger</h4>
                             <p className="text-slate-400 text-sm">Providing access to safe, nutritious and sufficient food all year round.</p>
                          </div>
                       </li>
                       <li className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 font-bold">12</div>
                          <div>
                             <h4 className="font-bold text-lg">Responsible Consumption</h4>
                             <p className="text-slate-400 text-sm">Substantially reducing waste generation through prevention and reduction.</p>
                          </div>
                       </li>
                       <li className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 font-bold">13</div>
                          <div>
                             <h4 className="font-bold text-lg">Climate Action</h4>
                             <p className="text-slate-400 text-sm">Lowering the carbon footprint of institutional catering systems.</p>
                          </div>
                       </li>
                    </ul>
                 </div>
                 <div className="space-y-8">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                       <Quote className="text-emerald-500 mb-4" size={40} />
                       <p className="text-2xl font-display italic text-slate-200 leading-relaxed mb-6">
                         "Technology is most powerful when it serves basic human needs while protecting our future environment."
                       </p>
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-emerald-600" />
                          <div>
                             <div className="font-bold">Prof. Green</div>
                             <div className="text-xs text-slate-400">DTI Project Advisor</div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Team Section */}
        <section className="text-center">
           <h2 className="text-4xl font-bold mb-16">The Minds Behind Canteen</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'Alex Rivera', role: 'UI/UX Designer', major: 'Design Thinking' },
                { name: 'Sarah Chen', role: 'Fullstack Dev', major: 'Software Eng' },
                { name: 'Marcus J.', role: 'Data Analyst', major: 'Sustainability' },
                { name: 'Leo Smith', role: 'Logistics Lead', major: 'Business' }
              ].map((member, i) => (
                <div key={i} className="group">
                   <div className="aspect-square bg-slate-100 rounded-3xl mb-6 overflow-hidden transition-all group-hover:shadow-2xl group-hover:-translate-y-2">
                      <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-300">
                        <Users size={120} />
                      </div>
                   </div>
                   <h3 className="text-xl font-bold">{member.name}</h3>
                   <p className="text-emerald-600 font-bold text-sm tracking-widest uppercase">{member.role}</p>
                   <p className="text-slate-400 text-xs mt-1">{member.major}</p>
                </div>
              ))}
           </div>
        </section>

      </div>
    </div>
  );
};

export default About;
