import React, { useState } from 'react';
import { Plus, Heart, Mail, Phone, Globe, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const quickLinks = [
    { name: 'Find Clinics', href: '#clinics' },
    { name: 'Book Appointment', href: '#booking' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' }
  ];

  const resources = [
    { name: 'Blog', href: '#blog' },
    { name: 'Health Tips', href: '#tips' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Follow us on Facebook' },
    { icon: Twitter, href: '#', label: 'Follow us on Twitter' },
    { icon: Instagram, href: '#', label: 'Follow us on Instagram' },
    { icon: Linkedin, href: '#', label: 'Connect with us on LinkedIn' }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'fr', name: 'Français' }
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About HealthLand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Plus className="w-6 h-6 text-primary absolute top-0 left-0" />
                <Heart className="w-6 h-6 text-primary transform translate-x-2 translate-y-2" />
              </div>
              <span className="ml-4 text-xl font-jakarta font-bold">
                HealthLand
              </span>
            </div>
            <p className="text-gray-300 font-inter leading-relaxed">
              Connecting you with trusted healthcare providers across Algeria. 
              Your health, our priority.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-primary transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-jakarta font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200 font-inter"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-jakarta font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200 font-inter"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-jakarta font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:support@healthland.dz"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 font-inter"
                >
                  support@healthland.dz
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+213555123456"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 font-inter"
                >
                  +213 555 123 456
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-primary flex-shrink-0" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-transparent text-gray-300 border border-gray-600 rounded px-2 py-1 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  aria-label="Select language"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-neutral-900">
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 font-inter text-sm">
              © 2025 HealthLand. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#privacy"
                className="text-gray-400 hover:text-primary transition-colors duration-200 font-inter"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-gray-400 hover:text-primary transition-colors duration-200 font-inter"
              >
                Terms of Service
              </a>
              <a
                href="#cookies"
                className="text-gray-400 hover:text-primary transition-colors duration-200 font-inter"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;