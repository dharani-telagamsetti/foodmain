import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, HeartHandshake, ArrowLeft } from 'lucide-react';

const nearbyNgos = [
  {
    id: 1,
    name: 'Goonj Foundation',
    area: 'Anna Nagar',
    distance: '1.2 km',
    contact: '+91 98765 11223',
    pickupWindow: '10:00 AM - 8:00 PM',
    acceptedItems: 'Cooked meals, packed rice, rotis',
  },
  {
    id: 2,
    name: 'Feeding Hope Trust',
    area: 'Velachery',
    distance: '2.8 km',
    contact: '+91 99887 33445',
    pickupWindow: '11:00 AM - 9:00 PM',
    acceptedItems: 'Fresh cooked food, snacks',
  },
  {
    id: 3,
    name: 'No Waste Hunger Relief',
    area: 'Tambaram',
    distance: '4.1 km',
    contact: '+91 97890 55667',
    pickupWindow: '9:30 AM - 7:30 PM',
    acceptedItems: 'Meal boxes, bread, fruits',
  },
  {
    id: 4,
    name: 'Care & Share NGO',
    area: 'Guindy',
    distance: '3.0 km',
    contact: '+91 97901 77889',
    pickupWindow: '12:00 PM - 10:00 PM',
    acceptedItems: 'Lunch meals, dinner meals',
  },
];

const NearbyNgos = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <Link
            to="/donations"
            className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800"
          >
            <ArrowLeft size={18} />
            Back to Donation Portal
          </Link>
        </div>

        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Nearby NGOs for Food Donation
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Select a nearby NGO and coordinate pickup to donate your surplus food safely and quickly.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nearbyNgos.map((ngo) => (
            <article key={ngo.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">{ngo.name}</h2>
              <p className="mt-2 text-sm text-slate-500">Accepts: {ngo.acceptedItems}</p>

              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-emerald-600" />
                  <span>{ngo.area} ({ngo.distance})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-emerald-600" />
                  <span>{ngo.contact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-emerald-600" />
                  <span>Pickup: {ngo.pickupWindow}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="btn-primary py-2.5 px-5">
                  <HeartHandshake size={18} />
                  Donate Food
                </button>
                <button className="btn-secondary py-2.5 px-5">Call NGO</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NearbyNgos;
