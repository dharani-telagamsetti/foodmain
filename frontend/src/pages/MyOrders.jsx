import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, QrCode, Clock, MapPin, CheckCircle2, X } from 'lucide-react';
import api from '../services/api';
import socket from '../services/socket';
import { useToast } from '../context/ToastContext';

const MyOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const showToast = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders');
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();

    const handleOrderUpdate = (updatedOrder) => {
      showToast(`Order #${updatedOrder.orderNumber || updatedOrder._id.slice(-6)} status updated to ${updatedOrder.orderStatus.replace('_', ' ')}`, 'info');
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? { ...order, ...updatedOrder } : order
        )
      );
      setSelectedOrder((prev) => 
        prev?._id === updatedOrder._id ? { ...prev, ...updatedOrder } : prev
      );
    };

    socket.on('orderUpdated', handleOrderUpdate);

    return () => {
      socket.off('orderUpdated', handleOrderUpdate);
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'placed':
      case 'confirmed':
      case 'ready': return 'text-emerald-600 bg-emerald-100';
      case 'picked_up': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
              <History className="text-emerald-600" size={40} />
              My Orders
            </h1>
            <p className="text-slate-500 mt-2">Track your orders and access QR tokens</p>
          </header>

          <div className="space-y-6">
            {loading && <div className="text-center py-10">Loading orders...</div>}
            {orders.map((order) => {
              const dateObj = new Date(order.createdAt);
              const dateStr = dateObj.toLocaleDateString();
              const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                      <QrCode size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Order #{order.orderNumber || order._id.slice(-6)}</h3>
                      <p className="text-slate-500 flex items-center gap-2">
                        <Clock size={16} /> {dateStr} at {timeStr}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(order.orderStatus)} capitalize`}>
                      {order.orderStatus.replace('_', ' ')}
                    </span>
                    <span className="text-2xl font-black text-emerald-600">₹{order.totalAmount}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin size={16} />
                      <span className="text-sm">Pickup: {order.pickupSlot || 'N/A'}</span>
                    </div>
                    <button
                      onClick={() => setSelectedOrder({ ...order, dateStr, timeStr })}
                      className="btn-secondary"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            )})}
          </div>

          {orders.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-4">
                <History size={48} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No orders yet</h3>
              <p className="text-slate-500">Your order history will appear here once you place your first order.</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedOrder(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white rounded-3xl p-8 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X size={16} />
              </button>

                <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <QrCode size={32} className="text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Order #{selectedOrder.orderNumber || selectedOrder._id.slice(-6)}</h2>
                  <p className="text-slate-500">{selectedOrder.dateStr} at {selectedOrder.timeStr}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900">Order Items</h3>
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-slate-900">{item.name}</p>
                        <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-emerald-600">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-emerald-600">₹{selectedOrder.totalAmount}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin size={16} />
                    <span className="text-sm">Pickup Slot: {selectedOrder.pickupSlot || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 size={16} />
                    <span className="text-sm capitalize">Status: {selectedOrder.orderStatus.replace('_', ' ')}</span>
                  </div>
                </div>

                {(selectedOrder.orderStatus === 'placed' || selectedOrder.orderStatus === 'confirmed' || selectedOrder.orderStatus === 'ready') && (
                  <div className="pt-4">
                    <div className="bg-emerald-50 rounded-2xl p-4 text-center">
                      {selectedOrder.qrCode ? (
                        <img src={selectedOrder.qrCode} alt="QR Code" className="w-32 h-32 mx-auto mb-2" />
                      ) : (
                        <QrCode size={48} className="text-emerald-600 mx-auto mb-2" />
                      )}
                      <p className="text-sm font-medium text-emerald-800">Show this QR code at pickup counter</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyOrders;