import { CssBaseline } from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import { store } from './app/store.js';

import 'bear-react-carousel/dist/index.css';
import ToggleColorMode from './context/ToggleColorMode.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToggleColorMode>
      <CssBaseline />
      <App />
    </ToggleColorMode>
  </Provider>
);
