import { Pagination } from '@mui/material';
import React from 'react';
import styles from './paging.module.css';

function Paging({ count, page, onPageChange }) {
  return (
    <div className={styles['container']}>
      <Pagination
        count={count}
        page={page}
        onChange={(event, value) => {
          onPageChange(value);
        }}
      />
    </div>
  );
}

export default Paging;
