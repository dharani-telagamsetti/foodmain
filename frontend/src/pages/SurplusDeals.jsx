import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Clock, 
  TrendingDown, 
  Flame, 
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { SURPLUS_DEALS } from '../data/menu';

const SurplusDeals = () => {
  const [timeLeft, setTimeLeft] = useState('29:59');

  // Simple countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const [m, s] = prev.split(':').map(Number);
        if (s > 0) return `${m}:${(s - 1).toString().padStart(2, '0')}`;
        if (m > 0) return `${m - 1}:59`;
        return 'EXPIRED';
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <header className="max-w-3xl mb-16 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 font-bold text-sm animate-pulse"
          >
            <Flame size={16} /> Flash Sale: 70% Off Surplus
          </motion.div>
          <h1 className="text-5xl font-bold text-slate-900 leading-tight">
            Rescue Meals. <br />
            <span className="text-orange-500">Save Big.</span>
          </h1>
          <p className="text-xl text-slate-600">
            Every day, help us reach zero-waste by grabbing delicious surplus meals at clearance prices in the last 30 mins.
          </p>
        </header>

        {/* Global Timer Card */}
        <div className="glass-dark rounded-[3rem] p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.1),transparent)]" />
          
          <div className="space-y-4 relative z-10">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Clock className="text-orange-500" /> Deals Ending In
            </h2>
            <div className="text-7xl md:text-9xl font-black font-display tracking-tighter text-orange-500">
              {timeLeft}
            </div>
          </div>

          <div className="flex flex-col gap-4 relative z-10 md:text-right">
             <p className="text-slate-400 max-w-xs md:ml-auto">
               Available only until canteen closing time. These are perfectly fresh meals that would otherwise go to waste.
             </p>
             <div className="flex gap-4 md:justify-end">
               <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex flex-col">
                 <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Meals Left</span>
                 <span className="text-2xl font-bold text-white">23</span>
               </div>
               <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col">
                 <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest">Saved Carbon</span>
                 <span className="text-2xl font-bold text-emerald-400">4.2kg</span>
               </div>
             </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SURPLUS_DEALS.map((deal, i) => (
            <motion.div 
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                 <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-black text-xs">
                   -70%
                 </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    <ShieldCheck size={16} /> Quality Checked
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">{deal.name}</h3>
                </div>

                <div className="flex items-center gap-4">
                   <div className="text-4xl font-black text-slate-900">₹{deal.dealPrice}</div>
                   <div className="text-xl text-slate-400 line-through font-bold">₹{deal.originalPrice}</div>
                </div>

                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${(deal.remainingCount / 20) * 100}%` }}
                     className="h-full bg-orange-500"
                   />
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>Only {deal.remainingCount} left</span>
                  <span>Almost Gone</span>
                </div>

                <button className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95">
                  Claim Deal <ArrowRight size={20} />
                </button>
              </div>

              {/* Hover highlight */}
              <div className="absolute inset-0 border-2 border-orange-500 rounded-[2.5rem] opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity" />
            </motion.div>
          ))}

          {/* Impact Stats Card */}
          <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-xl shadow-emerald-600/30">
             <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
               <TrendingDown size={32} />
             </div>
             <div className="space-y-4">
               <h3 className="text-2xl font-bold leading-tight">Last week, surplus deals saved students ₹12,400</h3>
               <p className="text-emerald-100 text-sm">Join the efficiency revolution. Good food shouldn't cost the earth or your wallet.</p>
               <button className="flex items-center gap-2 font-bold hover:gap-4 transition-all">
                 View savings report <ArrowRight size={20} />
               </button>
             </div>
          </div>
        </div>

        {/* Warning card */}
        <div className="mt-20 glass rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 border-orange-500/20 max-w-4xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
             <AlertCircle size={24} />
          </div>
          <p className="text-slate-600 text-sm font-medium text-center md:text-left">
            <span className="font-bold text-slate-900">Important:</span> Surplus deals are available on a first-come, first-served basis. Orders must be collected immediately after booking to ensure freshness.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SurplusDeals;
