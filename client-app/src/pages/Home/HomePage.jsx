import { Button } from '@mui/material';
import React from 'react';
import styles from './homepage.module.css';

function HomePage() {
  return (
    <div className={styles['container']}>
      <div className={styles['banner']}>
        <h1>E-working</h1>
        <h3>Project management solution</h3>
        <Button variant="contained">Get started</Button>
      </div>
    </div>
  );
}

export default HomePage;
