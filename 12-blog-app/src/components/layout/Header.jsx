import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import { Container, Logo, LogoutButton } from '../index';

export default function Header() {
  const authStatus = useSelector((state) => state.auth.isAuthenticated);

  const navLinks = [
    {
      name: 'Home',
      path: '/',
      active: true
    },
    {
      name: 'Login',
      path: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      path: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      path: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add Post',
      path: '/add-post',
      active: authStatus
    },
  ]

  return (
    <header className='bg-[#c6dabf] border-b border-[#88d498] sticky top-0 z-50 shadow-md'>
      <Container>
        <nav className='flex items-center h-16'>
          <div className="mr-8">
            <NavLink to="/" className='flex items-center gap-2 group'>
              <div className='w-9 h-9 bg-[#114b5f] rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm'>
                <Logo width='60%' />
              </div>
              <span className='font-bold text-[#114b5f] text-lg hidden sm:block'>Blog</span>
            </NavLink>
          </div>
          <ul className='flex items-center gap-1 ml-auto'>
            {navLinks.map((link) => (
              link.active ? (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `inline-block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? "bg-[#114b5f] text-white shadow-sm" : "text-[#114b5f] hover:text-white hover:bg-[#1a936f]"}`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ) : null
            ))}

            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
};
