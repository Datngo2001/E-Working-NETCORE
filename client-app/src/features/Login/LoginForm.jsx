import { Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PasswordTextFeild from '../../components/PasswordTextFeild';
import { SIGNIN_REQUEST } from '../../store/reducer/user/userActionTypes';

function LoginForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
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

  const onSubmit = (e) => {
    e.preventDefault();
    if (!(inputs.email || inputs.password)) {
      setErrorMessage('Email or password must be inputed');
      return;
    }
    dispatch({ type: SIGNIN_REQUEST, payload: inputs });
  };

  useEffect(() => {
    if (error && error.action == SIGNIN_REQUEST) {
      setErrorMessage(error.message);
    }
  }, [error]);

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <TextField
          name="email"
          type="email"
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
          Login
        </Button>
      </Stack>
    </form>
  );
}

export default LoginForm;
