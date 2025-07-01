import React from 'react';
import { 
  Mail, Phone, Facebook, Twitter, Instagram, Linkedin, 
  ArrowUp, MapPin, Globe
} from 'lucide-react';
// import logomain from '../assets/logomain-removebg-preview.png';

const Footer = () => {
  const quickLinks = [
    { name: 'Find Clinics', href: '/find-clinics' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Features', href: '/features' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About Us', href: '/about' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Support', href: 'mailto:support@healthland.dz' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'System Status', href: '/status' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Globe, href: '#', label: 'Website' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Top decorative wave */}
      <div className="w-full h-12 bg-gradient-to-r from-teal-600 via-blue-500 to-indigo-600"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <h2 className="text-2xl font-bold text-white">HealthLand</h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Connecting you with trusted healthcare providers across Algeria. 
              Your health journey simplified with our comprehensive platform.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center text-gray-300 hover:text-teal-400 transition-colors duration-300 group"
                  >
                    <span className="h-0.5 w-3 bg-teal-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center text-gray-300 hover:text-teal-400 transition-colors duration-300 group"
                  >
                    <span className="h-0.5 w-3 bg-teal-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                <a
                  href="mailto:support@healthland.dz"
                  className="text-gray-300 hover:text-teal-400 transition-colors duration-300"
                >
                  support@healthland.dz
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                <a
                  href="tel:+213555123456"
                  className="text-gray-300 hover:text-teal-400 transition-colors duration-300"
                >
                  +213 555 123 456
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Healthcare Avenue<br />
                  Algiers, Algeria 16000
                </span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="bg-gray-800 hover:bg-gradient-to-r from-teal-500 to-blue-600 p-3 rounded-full transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 my-10"></div>
        
        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {legalLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <p className="text-gray-500 text-sm text-center">
            © 2025 HealthLand. All rights reserved. 
            <span className="block md:inline mt-1 md:mt-0 md:ml-2">Made with ❤️ for healthier communities</span>
          </p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors duration-300 group"
          >
            <span>Back to top</span>
            <div className="bg-gray-800 group-hover:bg-gradient-to-r from-teal-500 to-blue-600 p-2 rounded-full transition-all duration-300">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
      
      {/* Decorative bottom border */}
      <div className="h-2 bg-gradient-to-r from-teal-600 via-blue-500 to-indigo-600"></div>
    </footer>
  );
};

export default Footer;