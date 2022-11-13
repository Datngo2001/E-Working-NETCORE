import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { AppBar } from '@mui/material';
import MenuButton from '../../../components/MenuButton';
import UserMenu from '../../../components/UserMenu';
import Logo from '../../../components/Logo';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './consoleAppbar.module.css';

function ConsoleAppbar() {
  const { user } = useSelector((state) => state.user);
  const pages = [
    {
      title: 'Home',
      link: '/'
    }
  ];

  return (
    <AppBar position="static" sx={{ boxShadow: 'none' }}>
      <div className={styles['container']}>
        <Toolbar disableGutters>
          <MenuButton pages={pages}></MenuButton>

          <Logo navlink={'/console'}></Logo>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

          {user ? <UserMenu /> : <CircularProgress color="inherit" />}
        </Toolbar>
      </div>
    </AppBar>
  );
}

export default ConsoleAppbar;
