import React from 'react';
import { Box, Typography } from '@mui/material';

export default function ErrorMessage() {
  return (
    <Box display="flex" flexDirection="column" margin="auto">
      <Typography variant="h6">Произошла ошибка, попробуйте позже</Typography>
    </Box>
  );
}
