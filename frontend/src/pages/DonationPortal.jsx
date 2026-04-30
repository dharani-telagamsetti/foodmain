import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  MapPin, 
  Truck, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const DonationPortal = () => {
  const surplusStock = [
    { id: 1, item: "Veg Thali", qty: 45, status: "Available", canteen: "North Campus" },
    { id: 2, item: "Rice & Dal Bowl", qty: 28, status: "Reserved", canteen: "Engineering Block" },
    { id: 3, item: "Mixed Sandwiches", qty: 15, status: "Available", canteen: "Main Library" },
  ];
  const volunteerNetwork = [
    {
      id: 1,
      name: 'Asha Kumar',
      area: 'Anna Nagar',
      availability: '11:30 AM - 2:30 PM',
      capacity: 'Up to 35 meals',
      phone: '+91 98761 24510',
    },
    {
      id: 2,
      name: 'Ravi Prakash',
      area: 'Guindy',
      availability: '1:00 PM - 5:00 PM',
      capacity: 'Up to 50 meals',
      phone: '+91 99620 11452',
    },
    {
      id: 3,
      name: 'Meera Joseph',
      area: 'Velachery',
      availability: '10:00 AM - 1:00 PM',
      capacity: 'Up to 25 meals',
      phone: '+91 98402 77831',
    },
    {
      id: 4,
      name: 'Karthik Nair',
      area: 'Tambaram',
      availability: '4:00 PM - 8:00 PM',
      capacity: 'Up to 40 meals',
      phone: '+91 97910 66429',
    },
  ];

  return (
    <div className="pt-32 pb-20 bg-emerald-50/30 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Donation Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="lg:w-1/2 space-y-6">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm"
            >
              <Heart size={16} className="fill-emerald-600" /> Canteen Food Rescue
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
              Zero Waste. <br />
              <span className="text-emerald-600">Zero Hunger.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
              Authorized NGOs and volunteers can claim surplus canteen meals for immediate distribution to local shelters and hostels. 
            </p>
            <div className="flex gap-4 pt-4">
               <Link to="/nearby-ngos" className="btn-primary py-4 px-8">
                 Register as NGO
               </Link>
               <a href="#volunteer-network" className="btn-secondary py-4 px-8">
                 Volunteer Network
               </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
             <div className="space-y-4 pt-12">
               <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-emerald-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 text-emerald-50 group-hover:text-emerald-100 transition-colors">
                    <Sparkles size={40} />
                  </div>
                  <div className="text-4xl font-black text-emerald-600 mb-2">12k+</div>
                  <div className="text-sm font-bold text-slate-500">Meals Donated Total</div>
               </div>
               <div className="bg-slate-900 p-6 rounded-[2rem] shadow-xl text-white">
                  <div className="text-4xl font-black text-emerald-400 mb-2">48</div>
                  <div className="text-sm font-bold text-slate-400">Partner NGOs</div>
               </div>
             </div>
             <div className="space-y-4">
               <div className="bg-emerald-600 p-6 rounded-[2rem] shadow-xl text-white">
                  <div className="text-4xl font-black mb-2">2.4T</div>
                  <div className="text-sm font-bold text-emerald-100">Waste Diverted</div>
               </div>
               <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-emerald-100">
                  <div className="text-4xl font-black text-slate-900 mb-2">15m</div>
                  <div className="text-sm font-bold text-slate-500">Avg. Claim Time</div>
               </div>
             </div>
          </div>
        </div>

        {/* Live Availability */}
        <div className="space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-slate-900">Live Surplus Availability</h2>
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Live Feed
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Claims List */}
              <div className="lg:col-span-2 space-y-4">
                {surplusStock.map((item) => (
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    key={item.id}
                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
                   >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-emerald-600 shrink-0 border border-slate-100">
                        <Users size={32} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{item.item}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                            <Clock size={12} /> Ends in 22m
                          </span>
                          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                            <MapPin size={12} /> {item.canteen}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 w-full md:w-auto">
                      <div className="text-center">
                         <div className="text-2xl font-black text-emerald-600">{item.qty}</div>
                         <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Meals Available</div>
                      </div>
                      <button 
                        disabled={item.status === "Reserved"}
                        className={`flex-grow md:flex-grow-0 px-8 py-3 rounded-2xl font-bold transition-all ${
                          item.status === "Reserved" 
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 active:scale-95'
                        }`}
                      >
                        {item.status === "Reserved" ? "Claimed" : "Claim Now"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Information Sidebar */}
              <div className="space-y-6">
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                   <div className="absolute bottom-0 right-0 p-4 opacity-10">
                     <Truck size={100} />
                   </div>
                   <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                     <Truck className="text-emerald-400" /> Logistics Guide
                   </h3>
                   <ul className="space-y-4">
                     <li className="flex gap-3 text-sm">
                       <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                       <span className="text-slate-300">Bring your own clean temperature-controlled containers.</span>
                     </li>
                     <li className="flex gap-3 text-sm">
                       <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                       <span className="text-slate-300">Claims must be picked up within 30 minutes of reservation.</span>
                     </li>
                     <li className="flex gap-3 text-sm">
                       <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                       <span className="text-slate-300">Identity card scan required at canteen counter.</span>
                     </li>
                   </ul>
                   <button className="w-full mt-8 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 font-bold transition-colors">
                     Download Guidelines
                   </button>
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 border border-emerald-100 shadow-xl">
                   <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900">
                     <ShieldCheck className="text-emerald-600" /> Verification
                   </h3>
                   <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                     All donation claims are logged and tracked to ensure food reaches the intended beneficiaries. 
                   </p>
                   <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-bold">
                     Last pickup: 12 minutes ago by "Goonj Foundation"
                   </div>
                </div>
              </div>
           </div>
        </div>

        {/* Volunteer Network */}
        <section id="volunteer-network" className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Volunteer Network</h2>
            <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
              {volunteerNetwork.length} Active Volunteers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {volunteerNetwork.map((volunteer) => (
              <div
                key={volunteer.id}
                className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-bold text-slate-900">{volunteer.name}</h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    Available
                  </span>
                </div>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p><span className="font-semibold text-slate-800">Area:</span> {volunteer.area}</p>
                  <p><span className="font-semibold text-slate-800">Time:</span> {volunteer.availability}</p>
                  <p><span className="font-semibold text-slate-800">Capacity:</span> {volunteer.capacity}</p>
                  <p><span className="font-semibold text-slate-800">Phone:</span> {volunteer.phone}</p>
                </div>
                <button className="mt-5 w-full rounded-2xl bg-slate-900 text-white py-2.5 font-semibold hover:bg-slate-800 transition-colors">
                  Assign Pickup
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Map Preview */}
        <div className="mt-24 h-64 w-full bg-slate-200 rounded-[3rem] relative overflow-hidden group">
           <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 text-white z-10 opacity-100 group-hover:bg-slate-900/60 transition-all cursor-pointer">
              <div className="text-center space-y-2">
                <MapPin size={40} className="mx-auto text-emerald-400" />
                <h3 className="text-2xl font-bold">View Donation Impact Map</h3>
                <p className="text-slate-300 text-sm">Real-time visualization of food rescue paths.</p>
              </div>
           </div>
           {/* Mock Map Background */}
           <div className="w-full h-full bg-[radial-gradient(circle_at_center,#d1fae5_0%,#f8fafc_100%)] opacity-50" />
        </div>

      </div>
    </div>
  );
};

export default DonationPortal;
