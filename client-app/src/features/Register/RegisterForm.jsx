import { Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PasswordTextFeild from '../../components/PasswordTextFeild';
import { REGISTER_REQUEST } from '../../store/reducer/user/userActionTypes';

function RegisterForm() {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const validatePassword = (pass) => {
    if (pass && pass.lenght < 12) {
      return false;
    }
    if (pass.includes('< or >') || pass.includes('<or>')) {
      return false;
    }
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    if (!specialChars.test(pass)) {
      return false;
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!(inputs.email || inputs.password)) {
      setErrorMessage('Email or password must be inputed');
      return;
    }
    if (!validatePassword(inputs.password)) {
      setErrorMessage('Password must have special character');
      return;
    }
    dispatch({ type: REGISTER_REQUEST, payload: inputs });
  };

  useEffect(() => {
    if (error && error.action == REGISTER_REQUEST) {
      setErrorMessage(error.message);
    }
  }, [error]);

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <TextField
          type="email"
          name="email"
          value={inputs.email || ''}
          label="Email Address"
          variant="outlined"
          onChange={handleChange}></TextField>
        <PasswordTextFeild
          name="password"
          type="password"
          value={inputs.password || ''}
          onChange={handleChange}
          label="Password"
          variant="outlined"></PasswordTextFeild>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Button type="submit" variant="contained" disabled={loading}>
          Register
        </Button>
      </Stack>
    </form>
  );
}

export default RegisterForm;
