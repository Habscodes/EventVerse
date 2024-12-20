import React from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WalletButton } from './WalletButton';

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Menu className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold text-gray-800">EventVerse</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/create" className="text-gray-600 hover:text-purple-600">Create Event</Link>
            <Link to="/events" className="text-gray-600 hover:text-purple-600">Browse Events</Link>
            <WalletButton />
          </div>
        </div>
      </div>
    </nav>
  );
};