import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, User, Calendar, ClipboardList, Users, 
  BarChart, Shield, MessageCircle, Bot, FileText, Settings, 
  ChevronLeft, ChevronRight, Menu, LogOut, Search, HelpCircle, 
  Moon, Sun, Bell, X 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard', roles: ['all'] },
  { icon: <User size={20} />, label: 'My Profile', path: '/profile', roles: ['all'] },
  { icon: <Calendar size={20} />, label: 'Appointments', path: '/appointments', roles: ['doctor', 'patient'], badge: true },
  // Replaced Hospital icon with ClipboardList as a placeholder since Hospital is not imported or does not exist
  { icon: <ClipboardList size={20} />, label: 'Clinic Profile', path: '/clinic-profile', roles: ['clinic'] },
  { icon: <ClipboardList size={20} />, label: 'Services', path: '/services', roles: ['clinic'] },
  { icon: <Users size={20} />, label: 'Staff Management', path: '/staff', roles: ['clinic'] },
  { icon: <BarChart size={20} />, label: 'Analytics', path: '/analytics', roles: ['clinic'], new: true },
  { icon: <Shield size={20} />, label: 'Security Medicine', path: '/security', roles: ['clinic'] },
  { icon: <MessageCircle size={20} />, label: 'Messages', path: '/messages', roles: ['all'], badge: true },
  { icon: <Bot size={20} />, label: 'AI Assistant', path: '/ai-assistant', roles: ['all'] },
  { icon: <FileText size={20} />, label: 'Billing & Plans', path: '/billing', roles: ['clinic'] },
  { icon: <Settings size={20} />, label: 'Settings', path: '/settings', roles: ['all'] },
  { icon: <HelpCircle size={20} />, label: 'Help Center', path: '/help', roles: ['all'] },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const userRole = user?.role || 'all';
  // Use user?.name or user?.username as fallback for initials if firstName/lastName do not exist
  let initials = '';
  if ('firstName' in (user || {}) && 'lastName' in (user || {})) {
    // @ts-expect-error: user may not be fully typed, but we expect firstName and lastName to exist here
    initials = (user?.firstName?.[0]?.toUpperCase() || '') + (user?.lastName?.[0]?.toUpperCase() || '');
  } else if ('name' in (user || {})) {
    // @ts-expect-error: user may not be fully typed, but we expect name to exist here
    initials = user?.name?.split(' ').map((n: string) => n[0]?.toUpperCase()).join('').slice(0, 2) || '';
  } else if ('username' in (user || {})) {
    // @ts-expect-error: user may not be fully typed, but we expect username to exist here
    initials = user?.username?.slice(0, 2).toUpperCase() || '';
  }
  const location = useLocation();
  const navigate = useNavigate();
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  
  const filteredNav = navItems.filter(item => item.roles.includes('all') || item.roles.includes(userRole));

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (idx + 1) % filteredNav.length;
      navRefs.current[nextIdx]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (idx - 1 + filteredNav.length) % filteredNav.length;
      navRefs.current[prevIdx]?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(filteredNav[idx].path);
      setMobileOpen(false);
    }
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchRef.current?.value) {
      // In a real app, you would handle search here
      alert(`Searching for: ${searchRef.current.value}`);
      searchRef.current.value = '';
    }
    setSearchOpen(false);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, you would persist this setting
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileOpen && !(e.target as HTMLElement).closest('.mobile-sidebar')) {
        setMobileOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-md border-r border-gray-100 dark:border-gray-700 z-50 transition-all duration-300 ease-in-out ${
          collapsed ? 'w-20' : 'w-64'
        } hidden md:flex flex-col`}
        role="navigation"
        aria-label="Main sidebar navigation"
      >
        {/* Logo and Collapse Button */}
        <div className="flex items-center justify-between px-4 pt-5 pb-4">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/')}
            tabIndex={0} 
            aria-label="Go to home" 
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate('/')}
          >
            <img src={logo} alt="Logo" className={`h-10 w-10 transition-transform ${!collapsed ? 'mr-3' : ''}`} />
            {!collapsed && (
              <span className="font-bold text-xl tracking-wide text-indigo-600 dark:text-indigo-400">
                HealthLand
              </span>
            )}
          </div>
          <button 
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${collapsed ? 'self-center' : ''}`}
            onClick={() => setCollapsed(!collapsed)} 
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Search Bar */}
        {!collapsed && (
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm"
              />
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1" aria-label="Sidebar navigation">
          {filteredNav.map((item, idx) => (
            <button
              key={item.label}
              ref={el => navRefs.current[idx] = el}
              className={`group flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 text-base font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                isActive(item.path) 
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              } ${collapsed ? 'justify-center' : ''}`}
              tabIndex={0}
              aria-label={item.label}
              aria-current={isActive(item.path) ? 'page' : undefined}
              onClick={() => navigate(item.path)}
              onKeyDown={e => handleKeyDown(e, idx)}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
                {item.new && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
                )}
              </div>
              {!collapsed && (
                <span className="ml-3 flex-1 text-left">{item.label}</span>
              )}
              {!collapsed && item.new && (
                <span className="ml-2 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-0.5 rounded-full">
                  New
                </span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-4 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile & Settings */}
        <div className="mt-auto px-4 pb-6">
          <div className={`flex items-center ${collapsed ? 'justify-center' : ''} mb-4`}>
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                {initials}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            {!collapsed && (
              <div className="ml-3 overflow-hidden">
                <div className="font-semibold truncate">{user?.name ?? ''}</div>
                <div className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full inline-block mt-1 truncate">
                  {user?.role}
                </div>
              </div>
            )}
            
          </div>
          
          {!collapsed && (
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
              <button 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={toggleDarkMode}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => navigate('/notifications')}
                aria-label="Notifications"
              >
                <div className="relative">
                  <Bell size={18} />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
              </button>
              <button 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => navigate('/help')}
                aria-label="Help Center"
              >
                <HelpCircle size={18} />
              </button>
              <button 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={logout}
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="mr-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setMobileOpen(true)}
            aria-label="Open sidebar menu"
          >
            <Menu size={24} />
          </button>
          <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
          <span className="font-bold text-lg text-indigo-600 dark:text-indigo-400">HealthLand</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            onClick={() => navigate('/notifications')}
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4">
            <div className="flex items-center mb-4">
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search menu, features, help..."
                    autoFocus
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm"
                  />
                </div>
              </form>
              <button 
                className="ml-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Try searching for "appointments" or "billing"
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div 
            className="mobile-sidebar absolute top-0 left-0 h-full w-4/5 max-w-xs bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300"
            onClick={e => e.stopPropagation()} 
            role="navigation" 
            aria-label="Mobile sidebar navigation"
          >
            <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-10 w-10 mr-3" />
                <span className="font-bold text-xl text-indigo-600 dark:text-indigo-400">HealthLand</span>
              </div>
              <button 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMobileOpen(false)}
                aria-label="Close sidebar"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="px-4 py-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm"
                />
              </div>
            </div>
            
            <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1" aria-label="Sidebar navigation">
              {filteredNav.map((item, idx) => (
                <button
                  key={item.label}
                  ref={el => navRefs.current[idx] = el}
                  className={`flex items-center w-full px-3 py-3 rounded-lg transition-all duration-200 text-base font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                    isActive(item.path) 
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}
                  tabIndex={0}
                  aria-label={item.label}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  onClick={() => { navigate(item.path); setMobileOpen(false); }}
                  onKeyDown={e => handleKeyDown(e, idx)}
                >
                  <div className="relative">
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                    {item.new && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
                    )}
                  </div>
                  <span className="ml-3 flex-1 text-left">{item.label}</span>
                  {item.new && (
                    <span className="ml-2 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </button>
              ))}
            </nav>
            
            <div className="mt-auto px-4 py-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                    {initials}
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="ml-3 overflow-hidden">
                  <div className="font-semibold truncate">{user?.fullName || user?.username || ''}</div>
                  <div className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full inline-block mt-1 truncate">
                    {user?.role}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <button 
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={toggleDarkMode}
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => navigate('/help')}
                  aria-label="Help Center"
                >
                  <HelpCircle size={18} />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => navigate('/settings')}
                  aria-label="Settings"
                >
                  <Settings size={18} />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={logout}
                  aria-label="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;