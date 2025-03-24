import React from 'react';
import ReactDOM from 'react-dom/client';
import { SdkMatrix } from '@/components/sdk-matrix';

ReactDOM.createRoot(document.getElementById('wristband-sdk-matrix')!).render(
  <React.StrictMode>
    <SdkMatrix />
  </React.StrictMode>
);
