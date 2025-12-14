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
    }
  ]
  return (
    <header className='bg-gray-400 py-4'>
      <Container>
        <nav className='flex'>
          <div className="mr-4">
            <NavLink to="/">
              <Logo width='40px' />
            </NavLink>
          </div>
          <ul className='flex ml-auto'>
            {navLinks.map((link) => (
              link.active ? (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `inline-block px-6 mx-0.5 py-2 rounded-full duration-200 ${isActive ? "bg-blue-200" : "hover:bg-blue-100"}`
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
    </header >
  )
};
