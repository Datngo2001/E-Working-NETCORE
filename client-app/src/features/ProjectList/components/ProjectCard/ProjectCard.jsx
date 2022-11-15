import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

function ProjectCard({ name }) {
  return (
    <Card
      sx={{
        minWidth: 275,
        borderRadius: 2,
        minHeight: 200,
        boxShadow: 2,
        '&:hover': {
          backgroundColor: '#f2f2f2'
        },
        cursor: 'pointer'
      }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
