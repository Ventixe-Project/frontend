import React from 'react'
import Nav from '../Nav';
import Header from '../Header';
import Footer from '../Footer';

const PortalLayout = () => {
  return (
    <div className="portal-wrapper">
        <Nav />
        <Header />
      <main>
        <Outlet />
      </main>
        <Footer />
    </div>
  );
}

export default PortalLayout