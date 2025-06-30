import React, { useState } from 'react';
import { Home, User, Calendar, Hospital, ClipboardList, Users, BarChart, Shield, MessageCircle, Bot, FileText, Settings, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import logo from '../assets/logo.png';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { icon: <Home size={20} />, label: 'Dashboard', roles: ['all'] },
  { icon: <User size={20} />, label: 'My Profile', roles: ['all'] },
  { icon: <Calendar size={20} />, label: 'Appointments', roles: ['doctor', 'patient'] },
  { icon: <Hospital size={20} />, label: 'Clinic Profile', roles: ['clinic'] },
  { icon: <ClipboardList size={20} />, label: 'Services', roles: ['clinic'] },
  { icon: <Users size={20} />, label: 'Staff Management', roles: ['clinic'] },
  { icon: <BarChart size={20} />, label: 'Analytics', roles: ['clinic'] },
  { icon: <Shield size={20} />, label: 'Security Medicine', roles: ['clinic'] },
  { icon: <MessageCircle size={20} />, label: 'Messages', roles: ['all'] },
  { icon: <Bot size={20} />, label: 'AI Assistant', roles: ['all'] },
  { icon: <FileText size={20} />, label: 'Billing & Plans', roles: ['clinic'] },
  { icon: <Settings size={20} />, label: 'Settings', roles: ['all'] },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const userRole = user?.role || 'all';
  const initials = user?.firstName?.[0]?.toUpperCase() + (user?.lastName?.[0]?.toUpperCase() || '');

  const filteredNav = navItems.filter(item => item.roles.includes('all') || item.roles.includes(userRole));

  return (
    <>
      <div className={`fixed top-0 left-0 h-full bg-[#f8f9fa] shadow-md border-r border-[#e0e0e0] z-50 transition-all duration-300 ${collapsed ? 'w-20' : 'w-[250px]'} hidden md:flex flex-col`}>
        <div className="flex items-center px-4 pt-4 pb-6 mb-6">
          <img src={logo} alt="Logo" className={`h-10 w-10 transition-transform ${!collapsed ? 'mr-3' : ''} hover:scale-105`} />
          {!collapsed && <span className="font-bold text-lg tracking-wide">HealthLand</span>}
        </div>
        <nav className="flex-1 overflow-y-auto px-2 space-y-1">
          {filteredNav.map((item, idx) => (
            <button key={item.label} className={`flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 text-base font-medium ${idx === 0 ? 'border-l-4 border-[#2faaa1] bg-[#e6f8f6] font-bold' : 'hover:bg-[#e6f8f6]'} ${collapsed ? 'justify-center' : ''}`}> 
              {item.icon}
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="mt-auto px-4 pb-4">
          <div className={`flex items-center ${collapsed ? 'justify-center' : ''} mb-3`}>
            <div className="h-10 w-10 rounded-full bg-[#2faaa1] flex items-center justify-center text-white font-bold text-lg">{initials}</div>
            {!collapsed && (
              <div className="ml-3">
                <div className="font-semibold">{user?.firstName} {user?.lastName}</div>
                <div className="text-xs bg-[#e6f8f6] text-[#2faaa1] px-2 py-1 rounded-full inline-block mt-1">{user?.role}</div>
              </div>
            )}
          </div>
          {!collapsed && (
            <button className="w-full text-left text-sm text-gray-700 py-2 px-3 rounded hover:bg-[#e6f8f6]" onClick={logout}>Logout</button>
          )}
          <button className="absolute bottom-4 right-4 bg-white border rounded-full shadow p-2" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>
      <button className="md:hidden fixed top-4 left-4 z-50 bg-white border rounded-full shadow p-2" onClick={() => setMobileOpen(true)}>
        <Menu size={24} />
      </button>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setMobileOpen(false)}>
          <div className="absolute top-0 left-0 h-full w-[250px] bg-[#f8f9fa] shadow-md border-r border-[#e0e0e0] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center px-4 pt-4 pb-6 mb-6">
              <img src={logo} alt="Logo" className="h-10 w-10 mr-3" />
              <span className="font-bold text-lg tracking-wide">HealthLand</span>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 space-y-1">
              {filteredNav.map((item, idx) => (
                <button key={item.label} className={`flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 text-base font-medium ${idx === 0 ? 'border-l-4 border-[#2faaa1] bg-[#e6f8f6] font-bold' : 'hover:bg-[#e6f8f6]'}`}>
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </button>
              ))}
            </nav>
            <div className="mt-auto px-4 pb-4">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-[#2faaa1] flex items-center justify-center text-white font-bold text-lg">{initials}</div>
                <div className="ml-3">
                  <div className="font-semibold">{user?.firstName} {user?.lastName}</div>
                  <div className="text-xs bg-[#e6f8f6] text-[#2faaa1] px-2 py-1 rounded-full inline-block mt-1">{user?.role}</div>
                </div>
              </div>
              <button className="w-full text-left text-sm text-gray-700 py-2 px-3 rounded hover:bg-[#e6f8f6]" onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar; 