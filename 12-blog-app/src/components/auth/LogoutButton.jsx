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
      className='inline-block px-4 py-2 text-sm font-medium text-[#114b5f] hover:text-white hover:bg-[#1a936f] rounded-lg transition-all duration-200'
      onClick={handleLogout}
    >
      Logout
    </button>
  )
}
