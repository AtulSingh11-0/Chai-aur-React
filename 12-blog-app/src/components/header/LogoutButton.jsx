import { useDispatch } from 'react-redux';
import authService from '../../lib/authService';
import { logout } from '../../store/authSlice';

export default function LogoutButton() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout()
      .then(() => dispatch(logout()));
  }

  return (
    <button
      type='button'
      name='logout'
      className='px-5 py-2 text-sm font-medium text-gray-100 bg-gray-900 border border-gray-50 rounded-lg hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-400'
      onClick={handleLogout}
    >
      Logout
    </button>
  )
}
