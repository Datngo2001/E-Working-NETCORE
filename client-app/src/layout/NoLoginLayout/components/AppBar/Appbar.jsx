import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { AppBar, Button } from '@mui/material';
import LinkGroup from '../LinkGroup';
import UserMenu from '../../../components/UserMenu';
import Logo from '../../../components/Logo';
import MenuButton from '../../../components/MenuButton';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styles from './appbar.module.css';

function Appbar() {
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);
  const pages = [
    {
      title: 'Home',
      link: '/'
    }
  ];

  const gotoConsole = () => {
    navigate('/console');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <MenuButton pages={pages}></MenuButton>

          <Logo navlink={'/'}></Logo>

          <LinkGroup pages={pages}></LinkGroup>
          <div className={styles['left-group-container']}>
            {user ? (
              <>
                <Button color="inherit" variant="outlined" onClick={gotoConsole}>
                  Go to Console
                </Button>
                <UserMenu />
              </>
            ) : (
              <>
                {loading ? <CircularProgress color="inherit" /> : null}
                <Button variant="outlined" color="inherit" onClick={() => navigate('/login')}>
                  Login
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Appbar;
