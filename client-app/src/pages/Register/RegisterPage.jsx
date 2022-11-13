import React from 'react';
import styles from './register.module.css';
import RegisterForm from '../../features/Register/RegisterForm';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RegisterPage() {
  const { user } = useSelector((state) => state.user);

  if (user) {
    return <Navigate to={'/'}></Navigate>;
  }

  return (
    <div className={styles['container']}>
      <div className={styles['form-container']}>
        <h1>Register</h1>
        <RegisterForm />
        <p>
          Already had an account? <Link to={'/login'}>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
