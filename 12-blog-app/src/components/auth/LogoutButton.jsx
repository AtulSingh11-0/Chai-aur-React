import { useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../lib/authService';
import { logout } from '../../store/authSlice';

export default function LogoutButton({ onLogout }) {
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authService.logout();
      dispatch(logout());
      if (onLogout) onLogout();
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  }

  return (
    <button
      type='button'
      name='logout'
      className='flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 group disabled:opacity-50 disabled:cursor-not-allowed'
      onClick={handleLogout}
      disabled={isLoggingOut}
      role="menuitem"
    >
      {isLoggingOut ? (
        <>
          <svg className="w-5 h-5 animate-spin" fill='none' viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className='font-medium'>Logging out...</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill='none' stroke='currentColor' strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap='round' strokeLinejoin='round' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
          </svg>
          <span className='font-medium'>Logout</span>
        </>
      )}
    </button>
  )
}
