import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AddFloatButton({ onClick }) {
  return (
    <Fab onClick={onClick} color="secondary" aria-label="add">
      <AddIcon />
    </Fab>
  );
}
