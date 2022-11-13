import React from 'react';
import Footer from '../components/Footer/Footer';
import LandingPageRoute from '../../routes/LandingPageRoute';
import styles from './landingPageLayout.module.css';
import Appbar from './components/AppBar/Appbar';

function LandingPageLayout() {
  return (
    <div>
      <Appbar />
      <div className={styles['app-route-container']}>
        <LandingPageRoute />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPageLayout;
