import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { LogoutButton } from '../auth';

export default function ProfileDropdown({ userName = 'User' }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const profileLinks = [
    {
      name: 'My Profile',
      path: '/profile',
      icon: <ProfileIcon />
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <SettingsIcon />
    },
  ];

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // close dropdown on ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [open]);

  return (
    <div className='relative' ref={dropdownRef}>
      {/* Profile Button */}
      <button
        className='flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 group'
        title='Open profile menu'
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <div className='w-8 h-8 rounded-full bg-linear-to-br from-[#114b5f] to-[#1a936f] flex items-center justify-center text-white font-semibold text-sm group-hover:scale-110 transition-transform'>
          {userName?.charAt(0).toUpperCase()}
        </div>
        <svg
          className={`w-4 h-4 text-[#114b5f] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className='absolute right-0 mt-2 w-56 bg-white border border-[#c6dabf] rounded-lg shadow-xl z-50 overflow-hidden animate-fadeIn'
          role="menu"
        >
          {/* User Info Header */}
          <div className='px-4 py-3 bg-linear-to-r from-[#114b5f] to-[#1a936f] text-white'>
            <p className='text-sm font-medium truncate'>{userName}</p>
            <p className='text-xs opacity-90 mt-0.5'>Manage your account</p>
          </div>

          {/* Menu Items */}
          <ul className='py-2'>
            {profileLinks.map((link, index) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className='flex items-center gap-3 px-4 py-2.5 text-sm text-[#114b5f] hover:bg-[#f3e9d2] transition-colors duration-150 group'
                  onClick={() => setOpen(false)}
                  role="menuitem"
                >
                  <span className='text-[#1a936f] group-hover:scale-110 transition-transform'>
                    {link.icon}
                  </span>
                  <span className='font-medium'>{link.name}</span>
                </Link>
                {index === profileLinks.length - 1 && (
                  <div className='border-t border-[#c6dabf] my-2'></div>
                )}
              </li>
            ))}
            <li>
              <LogoutButton onLogout={() => setOpen(false)} />
            </li>
          </ul>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
          }
        `}
      </style>
    </div>
  );
}

const ProfileIcon = () => (
  <svg className="w-5 h-5" fill='none' stroke='currentColor' strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap='round' strokeLinejoin='round' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill='none' stroke='currentColor' strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap='round' strokeLinejoin='round' d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
    <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
  </svg>
);
