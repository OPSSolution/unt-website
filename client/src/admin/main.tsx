import React from 'react';
import ReactDOM from 'react-dom/client';
import { AdminGuard } from './components/AdminGuard';
import { Layout } from './components/Layout';
import { ThemeProvider } from './components/ThemeContext';
import '../index.css';
import { LanguageProvider } from '../i18n/LanguageContext';

ReactDOM.createRoot(document.getElementById('admin-root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider><AdminGuard>
        <Layout />
      </AdminGuard></LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
