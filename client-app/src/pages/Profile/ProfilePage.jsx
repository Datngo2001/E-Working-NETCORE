import { Container } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

function ProfilePage() {
  return (
    <Container maxWidth="sm">
      <Stack spacing={2} sx={{ marginTop: 4 }}></Stack>
    </Container>
  );
}

export default React.memo(ProfilePage);
