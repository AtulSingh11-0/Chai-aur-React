import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components';
import { Outlet } from 'react-router';
import authService from './lib/authService';

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
      <h1 className="p-8 text-center text-6xl font-extrabold bg-amber-800 text-white">Welcome to the Blog App using Appwrite</h1>
      TODO: <Outlet />
      <Footer />
    </>
  ) : null;
}
