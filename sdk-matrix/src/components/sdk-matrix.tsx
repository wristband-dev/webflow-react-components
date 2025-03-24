import React from 'react';
import { Box } from '@mui/material';

import { CodeFrame } from './code-frame';
import { frameworks } from '@/data/frameworks';

export const SdkMatrix: React.FC = () => {
  return (
    <Box sx={{ 
      width: '100%', 
      height: '532px',
      maxWidth: '961px',
      margin: '0 auto',
    }}>
      <CodeFrame frameworks={frameworks} />
    </Box>
  );
};
