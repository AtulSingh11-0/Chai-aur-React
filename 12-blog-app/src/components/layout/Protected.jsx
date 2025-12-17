import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router'

export default function Protected({ children, requiresAuthentication = true }) {
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (requiresAuthentication && !isUserLoggedIn) {
      navigate('/login');
    } else if (!requiresAuthentication && isUserLoggedIn) {
      navigate('/');
    }
  }, [isUserLoggedIn, navigate, requiresAuthentication]);

  return <>{children || <Outlet />}</>;
}
