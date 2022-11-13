import { Button, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import styles from './createButton.module.css';

function CreateButton({ defaultValue, onSubmit, placeholder, buttonText }) {
  const [isCreatable, setIsCreatable] = useState(false);
  const [inputText, setInputText] = useState(defaultValue || '');

  const submission = (e) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      setInputText('');
      onSubmit(inputText);
    }
    setIsCreatable(false);
  };

  return (
    <div className={styles['container']}>
      {isCreatable ? (
        <form onSubmit={submission} className={styles['form']}>
          <TextField
            type="text"
            value={inputText}
            placeholder={placeholder}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <div className={styles['footer']}>
            <Button variant="outlined" type="submit">
              {buttonText || 'Add'}
            </Button>
            <IconButton onClick={() => setIsCreatable(false)}>
              <CloseIcon />
            </IconButton>
          </div>
        </form>
      ) : (
        <Button className={styles['button']} onClick={() => setIsCreatable(true)}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}

export default CreateButton;
