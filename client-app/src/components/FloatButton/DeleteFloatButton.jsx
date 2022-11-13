import { Fab } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteFloatButton({ onClick }) {
  return (
    <Fab onClick={onClick} color="secondary" aria-label="edit">
      <DeleteIcon />
    </Fab>
  );
}
