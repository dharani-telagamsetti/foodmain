import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  Plus, 
  Minus, 
  ShoppingBag,
  QrCode,
  X,
  CheckCircle2
} from 'lucide-react';
import { MENU_ITEMS, SLOTS } from '../data/menu';
import { useAuth } from '../App';
import api from '../services/api';

const StudentPortal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [bookedOrderId, setBookedOrderId] = useState(null);
  const [bookedOrderQr, setBookedOrderQr] = useState('');
  const [orderName, setOrderName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(SLOTS[0]);
  const [checkoutError, setCheckoutError] = useState('');
  const { isAuthenticated } = useAuth();

  const categories = ['All', 'Meal', 'Special', 'Veg', 'Non-Veg', 'Diet'];

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      item.category === selectedCategory ||
      (selectedCategory === 'Veg' && item.dietaryType === 'Veg') ||
      (selectedCategory === 'Non-Veg' && item.dietaryType === 'Non-Veg');
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item) => {
    if (!isAuthenticated) return;
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.qty + delta);
        return { ...i, qty: newQty };
      }
      return i;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleCheckout = async () => {
    if (!isAuthenticated) return;
    setCheckoutError('');
    try {
      const items = cart.map((item) => ({
        itemId: item.id,
        name: item.name,
        quantity: item.qty,
        price: item.price
      }));

      const { data } = await api.post('/orders', {
        items,
        totalAmount: cartTotal,
        pickupSlot: selectedSlot
      });

      setBookedOrderId(data.order.orderNumber || data.order._id);
      setBookedOrderQr(data.order.qrCode || '');
      setIsQRModalOpen(true);
      setCart([]);
    } catch (error) {
      setCheckoutError(error.response?.data?.error || 'Could not connect to server for checkout.');
    }
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Menu Area */}
          <div className="lg:w-2/3 space-y-8">
            <header className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold text-slate-900">Today's Menu</h1>
                  <p className="text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin size={16} /> College Canteen • Pre-orders active
                  </p>
                </div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search favorite meals..." 
                    className="pl-12 pr-6 py-3 rounded-full bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full md:w-80 shadow-sm transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat 
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
                        : 'bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </header>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode='popLayout'>
                {filteredItems.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={item.id}
                    data-category={item.dietaryType}
                    className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute top-3 right-3 glass px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                        <Clock size={12} className="text-emerald-600" /> {item.calories}
                      </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between items-start">
                         <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                         <div className="flex items-center text-orange-500 gap-1 text-sm font-bold">
                           <Star size={14} className="fill-orange-500" /> {item.rating}
                         </div>
                       </div>
                       <p className="text-slate-500 text-sm line-clamp-2">{item.description}</p>
                       <div className="flex items-center justify-between pt-4">
                         <span className="text-2xl font-black text-emerald-600">₹{item.price}</span>
                         {isAuthenticated ? (
                           <button 
                             onClick={() => addToCart(item)}
                             className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20 active:scale-95"
                            >
                             <Plus size={20} />
                           </button>
                         ) : (
                           <Link
                             to="/login"
                             className="rounded-full bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-300"
                           >
                             Login to Order Food
                           </Link>
                         )}
                       </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar / Cart Area */}
          <div className="lg:w-1/3">
            <div className="glass rounded-3xl p-6 shadow-xl border-white/50 sticky top-32">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <ShoppingBag size={20} />
                </div>
                <h2 className="text-2xl font-bold">Your Order</h2>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <ShoppingBag size={32} />
                  </div>
                  <p className="text-slate-500 font-medium">Your cart is empty.<br />Add multiple items and pay together!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center animate-slide-up">
                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
                        <div className="flex-grow">
                          <h4 className="font-bold text-slate-800">{item.name}</h4>
                          <p className="text-sm text-emerald-600 font-bold">₹{item.price * item.qty}</p>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-100 px-3 py-1 rounded-full">
                          <button onClick={() => updateQty(item.id, -1)} className="text-slate-500 hover:text-emerald-600"><Minus size={14} /></button>
                          <span className="font-bold text-sm w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="text-slate-500 hover:text-emerald-600"><Plus size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 pt-6 border-t border-slate-200">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-600 px-1">Order Name (Optional)</label>
                       <input 
                         type="text"
                         placeholder="E.g. For John / Study Group"
                         value={orderName}
                         onChange={(e) => setOrderName(e.target.value)}
                         className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-600 px-1">Table Number</label>
                       <input 
                         type="text"
                         placeholder="E.g. Table 5 or A-12"
                         value={tableNumber}
                         onChange={(e) => setTableNumber(e.target.value)}
                         className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-600 px-1">Pickup Slot</label>
                       <select
                         value={selectedSlot}
                         onChange={(e) => setSelectedSlot(e.target.value)}
                         className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                       >
                         {SLOTS.map(s => <option key={s}>{s}</option>)}
                       </select>
                    </div>

                    {checkoutError && (
                      <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                        {checkoutError}
                      </p>
                    )}

                    <div className="flex justify-between items-center text-lg font-bold pt-4">
                      <span>Total Amount</span>
                      <span className="text-emerald-600">₹{cartTotal}</span>
                    </div>

                    <button 
                      onClick={handleCheckout}
                      className={`w-full py-4 text-lg ${isAuthenticated ? 'btn-primary' : 'rounded-xl bg-slate-300 text-slate-700 cursor-not-allowed'}`}
                      disabled={!isAuthenticated}
                    >
                      {isAuthenticated ? 'Process Pre-Order' : 'Login to Order Food'}
                    </button>
                    <p className="text-[10px] text-center text-slate-400 italic">
                      Zero-waste guarantee: Meals prepared only after booking.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* QR MODAL */}
      <AnimatePresence>
        {isQRModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsQRModalOpen(false)}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-xs w-full relative z-10 shadow-2xl text-center"
            >
              <button 
                onClick={() => setIsQRModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                <X size={20} />
              </button>

              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4">
                <CheckCircle2 size={36} />
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-1">Order Confirmed!</h2>
              <p className="text-slate-500 text-sm mb-4">Scan this QR token at the counter for instant pickup.</p>

              {orderName && (
                <div className="mb-4 text-emerald-700 font-bold px-3 py-1 bg-emerald-50 rounded-lg inline-block text-xs border border-emerald-100 shadow-sm">
                  Order for: {orderName}
                </div>
              )}

              <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200 mb-6 inline-block">
                {bookedOrderQr ? (
                  <img
                    src={bookedOrderQr}
                    alt="Order QR"
                    className="w-40 h-40 rounded-lg border border-slate-200 bg-white p-2"
                  />
                ) : (
                  <div className="w-32 h-32 bg-white p-3 rounded-lg shadow-inner border border-slate-100 relative group overflow-hidden">
                    <QrCode size={104} className="text-slate-900" />
                  </div>
                )}
              </div>

              <div className="text-left space-y-2 mb-6 text-sm">
                 <div className="flex justify-between text-xs">
                   <span className="text-slate-400">Order ID:</span>
                   <span className="font-bold text-slate-800">{bookedOrderId}</span>
                 </div>
                 {tableNumber && (
                   <div className="flex justify-between text-xs">
                     <span className="text-slate-400">Table:</span>
                     <span className="font-bold text-slate-800">{tableNumber}</span>
                   </div>
                 )}
                 <div className="flex justify-between text-xs">
                   <span className="text-slate-400">Pickup Slot:</span>
                   <span className="font-bold text-emerald-600">{selectedSlot}</span>
                 </div>
              </div>

              <button 
                onClick={() => setIsQRModalOpen(false)}
                className="btn-primary w-full py-3 text-base"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentPortal;
