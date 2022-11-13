import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router';

function LinkGroup({ pages }) {
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    return () => {
      navigate(link);
    };
  };

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages.map((page) => (
        <Button
          key={page.title}
          onClick={handleLinkClick(page.link)}
          sx={{ my: 2, display: 'block' }}>
          {page.title}
        </Button>
      ))}
    </Box>
  );
}

export default LinkGroup;
