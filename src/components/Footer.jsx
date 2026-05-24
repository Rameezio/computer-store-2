import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, Twitter, MessageCircle, Shield } from 'lucide-react';


const SHOP_LINKS = [
  { to: '/shop', label: 'All Products' },
  { to: '/shop?sort=newest', label: 'New Arrivals' },
  { to: '/shop?sort=popular', label: 'Best Sellers' },
  { to: '/deals', label: 'Deals' },
  { to: '/shop', label: 'Brands' },
];

const SUPPORT_LINKS = [
  { to: '/dashboard', label: 'Track Order' },
  { to: '/contact', label: 'Returns & Refunds' },
  { to: '/contact', label: 'Shipping Info' },
  { to: '/contact', label: 'Warranty' },
  { to: '/contact', label: 'Help Center' },
];

const COMPANY_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/about', label: 'Blog' },
  { to: '/about', label: 'Careers' },
  { to: '/about', label: 'Affiliates' },
  { to: '/contact', label: 'Contact' },
];

const POLICY_LINKS = [
  { to: '/contact', label: 'Privacy Policy' },
  { to: '/contact', label: 'Terms of Service' },
  { to: '/contact', label: 'Terms of Sale' },
  { to: '/contact', label: 'Security' },
  { to: '/contact', label: 'Cookie Policy' },
];

const LinkList = ({ title, links }) => (
  <div>
    <h4 className="text-white text-[11px] font-black uppercase tracking-wider mb-4">{title}</h4>
    <ul className="space-y-2.5">
      {links.map(l => (
        <li key={l.label}>
          <Link to={l.to} className="text-gray-500 hover:text-white transition-colors text-[12px]">
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => (
  <footer className="bg-[#0f0f0f] text-gray-400 border-t border-white/5">

    {/* Main Footer */}
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">

        {/* Brand – 2 cols on lg */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-2">
          <Link to="/" className="inline-flex mb-4">
            <img
              src="/logo.png"
              alt="Al-Quresh Traders"
              className="h-20 w-auto object-contain"
            />
          </Link>
          <p className="text-gray-500 text-[12px] leading-relaxed mb-5 max-w-xs">
            Premium gaming gear for elite performance and style. Built for gamers. Backed by 50,000+ satisfied customers.
          </p>
          <div className="flex items-center gap-2">
            {[Facebook, MessageCircle, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded bg-white/5 hover:bg-[#ff4700] flex items-center justify-center text-gray-500 hover:text-white transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <LinkList title="Shop"     links={SHOP_LINKS}    />
        <LinkList title="Support"  links={SUPPORT_LINKS} />
        <LinkList title="Company"  links={COMPANY_LINKS} />
        <LinkList title="Policies" links={POLICY_LINKS}  />
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-white/5 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-wrap">

        <p className="text-gray-600 text-[11px]">© 2026 Al-Quresh Traders. All rights reserved.</p>

        {/* Payment icons */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="text-gray-600 text-[10px] font-bold uppercase tracking-wider mr-1 hidden sm:inline">
            Payments
          </span>
          <div className="h-6 px-3 rounded text-[9px] font-black text-white flex items-center gap-1" style={{ backgroundColor: '#1a6b3c' }}>
            💵 COD
          </div>
          <div className="h-6 px-3 rounded text-[9px] font-black text-white flex items-center gap-1" style={{ backgroundColor: '#4CAF50' }}>
            ⚡ EasyPaisa
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600 text-[10px]">
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-[#ff4700]" /> Secure Checkout
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Trusted by 50,000+ Customers</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
