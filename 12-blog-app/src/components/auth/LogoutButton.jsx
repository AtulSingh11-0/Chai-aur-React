import { useDispatch } from 'react-redux';
import authService from '../../lib/authService';
import { logout } from '../../store/authSlice';

export default function LogoutButton({ onLogout }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService.logout()
      .then(() => {
        dispatch(logout());
        if (onLogout) onLogout();
      });
  }

  return (
    <button
      type='button'
      name='logout'
      className='flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 group'
      onClick={handleLogout}
      role="menuitem"
    >
      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill='none' stroke='currentColor' strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap='round' strokeLinejoin='round' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
      </svg>
      <span className='font-medium'>Logout</span>
    </button>
  )
}
