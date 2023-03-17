import { ConfigProvider, theme } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';

import './assets/styles/index.css';
import App from './App';

const { darkAlgorithm } = theme;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0fff00',
          colorTextBase: '#ffffff',
          colorBgBase: '#101010',
          borderRadius: 6,
          fontFamily: 'DMSans',
          wireframe: false,
        },
        algorithm: [darkAlgorithm],
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
