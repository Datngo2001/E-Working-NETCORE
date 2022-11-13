import { Stack } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import LoginForm from '../../features/Login/LoginForm';
import LoginGoogleButton from '../../features/Login/LoginGoogleButton';
import styles from './login.module.css';

function LoginPage() {
  const { user } = useSelector((state) => state.user);
  if (user) {
    return <Navigate to={'/'}></Navigate>;
  }

  return (
    <div className={styles['container']}>
      <Stack spacing={2} className={styles['form-container']}>
        <h1>Login</h1>
        <LoginForm />
        <LoginGoogleButton />
        <p>
          Did not have an account yet? <Link to={'/register'}>Register</Link>
        </p>
      </Stack>
    </div>
  );
}

export default LoginPage;
