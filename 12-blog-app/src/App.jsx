import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';
import { Footer, Header } from './components';
import authService from './lib/authService';
import { login, logout } from './store/authSlice';

export default function App() {
  const [loading, setLoading] = React.useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        user ? dispatch(login({ userData: user })) : dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ) : null;
}
