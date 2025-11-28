import React from 'react';
import { Link, NavLink } from 'react-router';

export default function Header() {
  return (
    <header className="bg-linear-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-white text-4xl font-bold hover:text-indigo-100 transition">
            React Router
          </Link>
          <div className="flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white text-lg font-medium transition duration-200 hover:scale-105 transform ${isActive ? 'border-b-2 border-white' : 'hover:text-indigo-100'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `text-white text-lg font-medium transition duration-200 hover:scale-105 transform ${isActive ? 'border-b-2 border-white' : 'hover:text-indigo-100'
                }`
              }
            >
              Users
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-white text-lg font-medium transition duration-200 hover:scale-105 transform ${isActive ? 'border-b-2 border-white' : 'hover:text-indigo-100'
                }`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-white text-lg font-medium transition duration-200 hover:scale-105 transform ${isActive ? 'border-b-2 border-white' : 'hover:text-indigo-100'
                }`
              }
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
