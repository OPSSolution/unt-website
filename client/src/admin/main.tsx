import React from 'react';
import ReactDOM from 'react-dom/client';
import { AdminGuard } from './components/AdminGuard';
import { Layout } from './components/Layout';
import { ThemeProvider } from './components/ThemeContext';
import '../index.css';

ReactDOM.createRoot(document.getElementById('admin-root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AdminGuard>
        <Layout />
      </AdminGuard>
    </ThemeProvider>
  </React.StrictMode>
);
