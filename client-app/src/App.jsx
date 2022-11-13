import React from 'react';
import { useDispatch } from 'react-redux';
import { HANDLE_AUTH_STATE_CHANGE_REQUEST } from './store/reducer/user/userActionTypes';
import './App.css';
import { auth } from './firebase/auth';
import { useEffect } from 'react';
import LandingPageLayout from './layout/LandingPageLayout/LandingPageLayout';
import { useLocation, useNavigate } from 'react-router';
import ConsoleLayout from './layout/ConsoleLayout/ConsoleLayout';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#039be5'
    },
    secondary: {
      main: '#8777d9'
    }
  }
});

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onIdTokenChanged((currentUser) => {
      dispatch({ type: HANDLE_AUTH_STATE_CHANGE_REQUEST });
      if (!currentUser && location.pathname.includes('/console')) {
        navigate('/');
      }
    });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <div>
        {location.pathname.includes('/console') ? <ConsoleLayout /> : <LandingPageLayout />}
      </div>
    </ThemeProvider>
  );
};

export default App;
