import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Calendar, 
  Leaf, 
  TrendingDown, 
  Heart, 
  QrCode, 
  BarChart3, 
  Zap,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100 rounded-full blur-[100px] opacity-60 pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-teal-50 rounded-full blur-[80px] opacity-40 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold"
              >
                <Zap size={14} className="fill-emerald-600" />
                <span>Modernizing College Canteens</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold leading-tight text-slate-900"
              >
                Waste Less. <br />
                <span className="gradient-text">Feed More.</span> <br />
                Eat Smarter.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-slate-600 leading-relaxed max-w-xl"
              >
                Transforming college food management with real-time pre-ordering and impact-driven donations to achieve zero waste.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link to="/student-portal" className="btn-primary px-8 py-4 text-lg">
                  Order Meal <ArrowRight size={20} />
                </Link>
                <Link to="/admin" className="btn-secondary px-8 py-4 text-lg">
                  View Live Metrics
                </Link>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:w-1/2 relative group"
            >
              {/* Main Visual - Dashboard Mockup */}
              <div className="relative z-10 glass rounded-3xl p-4 shadow-3xl transform group-hover:rotate-1 transition-transform duration-700">
                <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
                  <div className="grid grid-cols-6 gap-3 p-4">
                    {/* Mock dashboard elements */}
                    <div className="col-span-4 h-32 bg-white rounded-xl shadow-sm p-4 flex flex-col justify-between">
                      <div className="w-1/2 h-4 bg-slate-100 rounded" />
                      <div className="flex gap-2 items-end">
                        <div className="w-3 h-12 bg-emerald-500 rounded-t" />
                        <div className="w-3 h-16 bg-emerald-600 rounded-t" />
                        <div className="w-3 h-10 bg-emerald-400 rounded-t" />
                        <div className="w-3 h-14 bg-emerald-500 rounded-t" />
                      </div>
                    </div>
                    <div className="col-span-2 h-32 bg-emerald-600 rounded-xl shadow-sm p-4 text-white flex flex-col justify-between">
                      <Heart size={24} />
                      <div className="text-2xl font-bold">12k+</div>
                      <div className="text-[10px]">Meals Saved</div>
                    </div>
                    <div className="col-span-2 h-24 bg-white rounded-xl shadow-sm p-4 flex flex-col justify-center gap-2">
                       <Smartphone className="text-slate-400" size={20} />
                       <div className="w-full h-2 bg-slate-100 rounded" />
                    </div>
                    <div className="col-span-4 h-24 bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                         <QrCode size={24} />
                       </div>
                       <div className="space-y-1">
                         <div className="w-24 h-3 bg-slate-100 rounded" />
                         <div className="w-32 h-2 bg-slate-50 rounded" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-100 rounded-full blur-[40px] opacity-60" />
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 glass-dark text-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                  <TrendingDown size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-300">Waste Level</div>
                  <div className="text-lg font-bold">-48% Reduction</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Counters */}
      <section className="py-12 bg-white relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter label="Meals Saved" value="12,482" icon={Leaf} trend="+12% this month" />
            <StatCounter label="Student Savings" value="₹85,400" icon={TrendingDown} trend="On track" />
            <StatCounter label="Waste Reduced" value="2.4 Tons" icon={TrendingDown} trend="All time" />
            <StatCounter label="Donations" value="412" icon={Heart} trend="Last 30 days" />
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Comprehensive Waste Control</h2>
            <p className="text-lg text-slate-600">A seamless ecosystem connecting students, canteen management, and social organizations to achieve zero waste.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <FeatureCard 
              icon={Calendar} 
              title="Pre-Order Meals" 
              description="Browse daily menus and reserve meals in advance. Helps canteens prepare the exact quantity needed."
            />
            <FeatureCard 
              icon={QrCode} 
              title="QR Pickup System" 
              description="Get a digital token upon booking. Fast-track collection with a simple scan, eliminating long queues."
            />

            <FeatureCard 
              icon={Heart} 
              title="Donation Mode" 
              description="Connect surplus food with NGOs and volunteers instantly. Automated pickups and verified claims."
            />
            <FeatureCard 
              icon={BarChart3} 
              title="Waste Analytics" 
              description="View real-time efficiency dashboards. Track savings, carbon footprint, and sustainability scores."
            />
            <FeatureCard 
              icon={Smartphone} 
              title="Mobile First" 
              description="Optimized experience for on-the-go students. Instant notifications and easy booking."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-emerald-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-emerald-600/30">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)] pointer-events-none" />
            
            <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">Ready to join the <span className="text-emerald-200">zero-waste</span> movement?</h2>
              <p className="text-xl text-emerald-50">Join hundreds of students already making an impact on campus sustainability.</p>
              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <Link to="/student-portal" className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-black/10">
                  Try it Now
                </Link>
                <Link to="/about" className="bg-emerald-700/50 hover:bg-emerald-700/70 border border-emerald-400/30 px-8 py-4 rounded-full font-bold text-lg transition-all">
                  Learn the Process
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const StatCounter = ({ label, value, icon: Icon, trend }) => (
  <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
        <Icon size={24} />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
        {trend}
      </span>
    </div>
    <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
    <div className="text-sm text-slate-500 font-medium">{label}</div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="card-premium h-full flex flex-col p-8"
  >
    <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
      <Icon size={32} />
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-slate-600 leading-relaxed mb-6 flex-grow">{description}</p>
    <div className="flex items-center gap-2 text-emerald-600 font-bold group">
      <span>Explore</span> 
      <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
    </div>
  </motion.div>
);

export default Home;
