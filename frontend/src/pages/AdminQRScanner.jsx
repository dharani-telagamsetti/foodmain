import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { motion } from 'framer-motion';
import { AlertCircle, Camera, CheckCircle, Loader2 } from 'lucide-react';
import api from '../services/api';
import socket from '../services/socket';

const AdminQRScanner = () => {
  const [scannerActive, setScannerActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scanError, setScanError] = useState('');
  const [ordersError, setOrdersError] = useState('');
  const [allOrders, setAllOrders] = useState([]);
  const [scannedResult, setScannedResult] = useState(null);

  const loadOrders = async () => {
    try {
      const { data } = await api.get('/orders/admin');
      setOrdersError('');
      // Pagination handling: data contains { orders, page, pages, total }
      setAllOrders(data.orders || data);
    } catch (error) {
      setOrdersError('Could not load orders from server.');
    }
  };

  useEffect(() => {
    loadOrders();

    const handleOrderCreated = (newOrder) => {
      setAllOrders((prev) => [newOrder, ...prev]);
    };

    const handleOrderUpdated = (updatedOrder) => {
      setAllOrders((prev) =>
        prev.map((order) =>
          order._id === updatedOrder._id ? { ...order, ...updatedOrder } : order
        )
      );
    };

    socket.on('orderCreated', handleOrderCreated);
    socket.on('orderUpdated', handleOrderUpdated);

    return () => {
      socket.off('orderCreated', handleOrderCreated);
      socket.off('orderUpdated', handleOrderUpdated);
    };
  }, []);

  const verifyQrText = async (qrText) => {
    setLoading(true);
    setScanError('');
    try {
      const { data } = await api.post('/orders/scan-order', { qrText });

      setScannedResult(data);
      await loadOrders();
    } catch (error) {
      setScanError(error.response?.data?.error || 'Could not verify QR code with server.');
    } finally {
      setLoading(false);
    }
  };

  const markPickedUp = async () => {
    if (!scannedResult?.order?.id) {
      return;
    }

    setLoading(true);
    setScanError('');
    try {
      const { data } = await api.patch(`/orders/${scannedResult.order.id}/status`);

      setScannedResult((prev) => ({
        ...prev,
        order: {
          ...prev.order,
          orderStatus: data.order.orderStatus
        }
      }));
      await loadOrders();
    } catch (error) {
      setScanError(error.response?.data?.error || 'Could not update order status.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!scannerActive) {
      return;
    }

    const scanner = new Html5QrcodeScanner(
      'qr-scanner-region',
      { fps: 10, qrbox: { width: 260, height: 260 } },
      false
    );

    scanner.render(
      async (decodedText) => {
        await verifyQrText(decodedText);
        await scanner.clear();
        setScannerActive(false);
      },
      () => {
        // ignore frame-level decode errors
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [scannerActive]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3">
            <Camera className="w-9 h-9 text-emerald-600" />
            Admin QR Verification
          </h1>
          <p className="text-slate-600 mt-2">Scan order QR and verify food + person details in real time.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass rounded-3xl p-6 lg:col-span-1">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Scanner</h2>
            {!scannerActive ? (
              <button
                onClick={() => setScannerActive(true)}
                className="w-full btn-primary py-3 rounded-2xl font-semibold"
                disabled={loading}
              >
                {loading ? 'Please wait...' : 'Start Scanning'}
              </button>
            ) : (
              <>
                <div id="qr-scanner-region" className="w-full overflow-hidden rounded-xl mb-3" />
                <button
                  onClick={() => setScannerActive(false)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-semibold"
                >
                  Stop Scanner
                </button>
              </>
            )}

            {scanError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-red-700 text-sm flex items-start gap-2">
                <AlertCircle size={18} className="mt-0.5" />
                {scanError}
              </div>
            )}

            {ordersError && (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-700 text-sm">
                {ordersError}
              </div>
            )}
          </div>

          <div className="glass rounded-3xl p-6 lg:col-span-2">
            {!scannedResult ? (
              <div className="h-full min-h-[260px] flex items-center justify-center text-center">
                <div>
                  <Camera className="w-14 h-14 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-700 font-semibold">No QR scanned yet</p>
                  <p className="text-slate-500 text-sm">Scan an order QR to see order and person details.</p>
                </div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-4">
                  <CheckCircle size={20} /> QR verified successfully
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                    <p className="text-blue-800 font-bold mb-2">Person Details</p>
                    <p className="text-sm"><span className="font-semibold">Name:</span> {scannedResult.person.fullName}</p>
                    <p className="text-sm"><span className="font-semibold">Email:</span> {scannedResult.person.email}</p>
                    <p className="text-sm"><span className="font-semibold">Role:</span> {scannedResult.person.role}</p>
                    <p className="text-sm"><span className="font-semibold">Phone:</span> {scannedResult.person.phone || 'N/A'}</p>
                  </div>

                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-emerald-800 font-bold mb-2">Order Details</p>
                    <p className="text-sm"><span className="font-semibold">Order #:</span> {scannedResult.order.orderNumber}</p>
                    <p className="text-sm"><span className="font-semibold">Status:</span> {scannedResult.order.orderStatus}</p>
                    <p className="text-sm"><span className="font-semibold">Payment:</span> {scannedResult.order.paymentStatus}</p>
                    <p className="text-sm"><span className="font-semibold">Pickup Slot:</span> {scannedResult.order.pickupSlot || 'N/A'}</p>
                    <p className="text-sm font-semibold mt-2">Total: Rs. {scannedResult.order.totalAmount}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 mb-5">
                  <p className="font-bold text-slate-900 mb-2">Food Items</p>
                  <div className="space-y-2">
                    {scannedResult.order.items.map((item, index) => (
                      <div key={`${item.name}-${index}`} className="flex justify-between text-sm border-b border-slate-100 pb-2 last:border-0">
                        <span>{item.name} x {item.quantity}</span>
                        <span>Rs. {item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={markPickedUp}
                  disabled={loading || scannedResult.order.orderStatus === 'picked_up'}
                  className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Updating...</span>
                  ) : scannedResult.order.orderStatus === 'picked_up' ? (
                    'Already Picked Up'
                  ) : (
                    'Mark as Picked Up'
                  )}
                </button>
              </motion.div>
            )}
          </div>
        </div>

        <div className="mt-8 glass rounded-3xl p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Recent Orders</h2>
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-slate-200">
                  <th className="py-2 pr-3">Order #</th>
                  <th className="py-2 pr-3">Person</th>
                  <th className="py-2 pr-3">Amount</th>
                  <th className="py-2 pr-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map((order) => (
                  <tr key={order._id} className="border-b border-slate-100">
                    <td className="py-2 pr-3 font-medium">{order.orderNumber || order._id}</td>
                    <td className="py-2 pr-3">{order.userId?.fullName || order.userId?.username || 'N/A'}</td>
                    <td className="py-2 pr-3">Rs. {order.totalAmount}</td>
                    <td className="py-2 pr-3">{order.orderStatus}</td>
                  </tr>
                ))}
                {allOrders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQRScanner;
