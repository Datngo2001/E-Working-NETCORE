import { Box, Typography } from '@mui/material';
import React from 'react';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import styles from './createProjectButton.module.css';

function CreateProjectButton() {
  return (
    <Box
      sx={{
        minWidth: 275,
        borderRadius: 2,
        minHeight: 200,
        boxShadow: 2,
        '&:hover': {
          backgroundColor: '#f2f2f2'
        },
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <div className={styles['icon-container']}>
        <ControlPointIcon />
        <Typography>Add project</Typography>
      </div>
    </Box>
  );
}

export default CreateProjectButton;
