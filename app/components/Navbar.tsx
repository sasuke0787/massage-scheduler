'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarClock, Users, Home, Link as LinkIcon } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Appointments', href: '/appointments', icon: CalendarClock },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Booking Links', href: '/booking-links', icon: LinkIcon },
  ];
  
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-primary-600">
              Massage Scheduler
            </Link>
          </div>
          
          <nav className="flex space-x-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-1.5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 