import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

// responsive logo
function Logo({ navlink }) {
  const navigate = useNavigate();
  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="a"
        onClick={() => navigate(navlink)}
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
          cursor: 'pointer'
        }}>
        E-working
      </Typography>

      <Typography
        variant="h5"
        noWrap
        component="a"
        onClick={() => navigate(navlink)}
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
          cursor: 'pointer'
        }}>
        E-working
      </Typography>
    </>
  );
}

export default Logo;
