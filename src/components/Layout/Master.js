import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';

export default function Master() {
  const location = useLocation();
  const Paths = ['/webdevchat', '/appdevchat', '/cyberchat', '/digitalchat', '/aichat', '/datascichat','/datascichat'];
  return (
    <>
      {!Paths.includes(location.pathname) && <Header />}
      <Outlet />
      {!Paths.includes(location.pathname) && <Footer />}
    </>
  );
}
