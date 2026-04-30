import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone } from 'lucide-react';

const TwitterIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 5.92c-.65.3-1.34.5-2.07.6.75-.45 1.33-1.16 1.6-2.02-.7.42-1.47.73-2.29.9A3.5 3.5 0 0016.15 4c-1.93 0-3.5 1.57-3.5 3.5 0 .27.03.53.09.78C9.7 8.14 6.9 6.5 4.98 4c-.3.52-.48 1.12-.48 1.76 0 1.22.62 2.3 1.57 2.93-.58-.02-1.12-.18-1.6-.44v.04c0 1.7 1.21 3.12 2.83 3.44-.3.08-.62.12-.95.12-.23 0-.46-.02-.68-.06.46 1.43 1.8 2.47 3.38 2.5A7.03 7.03 0 013 18.57c.98.62 2.15.98 3.4.98 4.08 0 6.32-3.38 6.32-6.31v-.29c.43-.3.8-.68 1.09-1.11-.4.18-.83.29-1.28.34.46-.28.81-.73 1-1.27z" />
  </svg>
);

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.16 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.54 2.36 1.1 2.94.84.09-.65.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.338 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.1 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v12H0V8zm7.5 0H12v1.6h.07c.58-1.1 2-2.26 4.1-2.26C21.5 7.34 24 9.64 24 13.84V20h-5v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.15 1.46-2.15 2.97V20H7.5V8z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-slate-900 pt-20 pb-10 text-white overflow-hidden relative">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Leaf size={24} />
              </div>
              <span className="text-2xl font-bold font-display tracking-tight">
                WasteNot
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Smart college canteen management system designed to reduce food waste and support hunger relief efforts.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 transform hover:-translate-y-1">
                <TwitterIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 transform hover:-translate-y-1">
                <GithubIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 transform hover:-translate-y-1">
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Platform</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/student-portal" className="hover:text-emerald-400 transition-colors">Student Portal</Link></li>
              <li><Link to="/donations" className="hover:text-emerald-400 transition-colors">Donation Center</Link></li>
              <li><Link to="/admin" className="hover:text-emerald-400 transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Resources</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Project</Link></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Sustainability Report</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display">Contact Us</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-500" />
                <span>support@wastenot.edu</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-500" />
                <span>+1 (234) 567-890</span>
              </li>
            </ul>
            <div className="mt-8 pt-6 border-t border-slate-800">
              <p className="text-sm text-slate-500 italic">
                “Eat smart, waste less.”
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 WasteNot Project. All rights reserved. Built for DTI.
          </p>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
