import { Box, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import CheckIcon from '@mui/icons-material/Check';
import styles from './editableField.module.css';

function EditableField({ onSubmit, placeholder, value }) {
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState(value || '');

  const submission = (e) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      setInputText('');
      onSubmit(inputText);
    }
    setIsEditable(false);
  };

  return (
    <Box>
      {isEditable ? (
        <form onSubmit={submission} className={styles['edit']}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              sx={{ flexGrow: 1 }}
              type="text"
              size="small"
              value={inputText}
              placeholder={placeholder || value}
              onChange={(event) => setInputText(event.target.value)}
              autoFocus
            />
            <IconButton variant="outlined" color="primary" type="submit">
              <CheckIcon />
            </IconButton>
            <IconButton onClick={() => setIsEditable(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </form>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ flexGrow: 1 }}>{value}</Typography>
          <IconButton onClick={() => setIsEditable(true)}>
            <CreateIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default EditableField;
