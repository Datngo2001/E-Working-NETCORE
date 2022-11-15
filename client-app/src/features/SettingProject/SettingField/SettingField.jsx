import { Box, Typography } from '@mui/material';
import EditableField from '../../../components/EditableField/EditableField';
import React from 'react';

function SettingField({ title, name, value, onSubmit, edittable }) {
  const handleSubmit = (text) => {
    onSubmit(name, text);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ flexGrow: 1, flexShrink: 0 }}>{title}</Typography>
      <Box sx={{ flexGrow: 5 }}>
        {edittable && <EditableField value={value} onSubmit={handleSubmit} />}
      </Box>
    </Box>
  );
}

export default React.memo(SettingField);
