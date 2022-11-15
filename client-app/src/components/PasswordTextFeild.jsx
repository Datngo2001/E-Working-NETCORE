import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';

function PasswordTextFeild({ name, value, onChange, label, variant, sx }) {
  const [show, setShow] = useState(false);

  const handleClickShowPassword = () => {
    setShow((val) => !val);
  };

  return (
    <TextField
      name={name || 'password'}
      type={show ? 'text' : 'password'}
      value={value || ''}
      onChange={onChange}
      label={label}
      variant={variant || 'outlined'}
      sx={sx}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} edge="end">
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}></TextField>
  );
}

export default React.memo(PasswordTextFeild);
