import { Fab } from '@mui/material';
import React from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function EditFloatButton({ onClick }) {
  return (
    <Fab onClick={onClick} color="secondary" aria-label="edit">
      <ModeEditIcon />
    </Fab>
  );
}
