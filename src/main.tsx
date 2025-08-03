import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setup } from './di/setup';
import { Provider } from 'react-redux';
import { store } from './app/store/store';

setup();

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
