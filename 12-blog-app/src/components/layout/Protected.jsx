import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, Outlet, useLocation } from 'react-router'

export default function Protected({ children, requiresAuthentication = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isUserLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (requiresAuthentication && !isUserLoggedIn) {
      navigate('/login', {
        replace: true,
        state: {
          from: location
        }
      });
    } else if (!requiresAuthentication && isUserLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [isUserLoggedIn, navigate, requiresAuthentication, location]);

  return <>{children || <Outlet />}</>;
}
