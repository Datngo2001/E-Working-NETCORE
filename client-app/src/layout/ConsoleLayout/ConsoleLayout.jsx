import React from 'react';
import ConsoleRoute from '../../routes/ConsoleRoute';
import SideBar from './components/SideBar/SideBar';
import styles from './consoleLayout.module.css';
import ConsoleAppBar from './components/ConsoleAppbar/ConsoleAppbar';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';

function ConsoleLayout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  return (
    <div className={styles['container']}>
      <ConsoleAppBar />
      <div className={styles['body-container']}>
        {user ? (
          <>
            {location.pathname != '/console' ? (
              <div className={styles['sidebar-container']}>
                <SideBar />
              </div>
            ) : null}
            <div className={styles['route-container']}>
              <ConsoleRoute />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ConsoleLayout;
