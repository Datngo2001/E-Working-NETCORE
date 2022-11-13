import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { SIGNIN_GOOGLE_REQUEST } from '../../store/reducer/user/userActionTypes';

function LoginGoogleButton() {
  const dispatch = useDispatch();

  const handleLoginGoogle = (data) => {
    dispatch({ type: SIGNIN_GOOGLE_REQUEST, payload: data });
  };

  return (
    <Button variant="outlined" onClick={handleLoginGoogle}>
      Login with google
    </Button>
  );
}

export default LoginGoogleButton;
