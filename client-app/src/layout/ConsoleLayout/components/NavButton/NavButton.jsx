import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navButton.module.css';

function NavButton({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${styles.navlink} ${isActive ? styles.active : ''}`}>
      {children}
    </NavLink>
  );
}

export default NavButton;
