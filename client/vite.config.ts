import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { mkdirSync, renameSync } from 'node:fs';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';

const normalizeAdminPath = (value: string | undefined) => {
  const normalized = `/${(value || 'admin-unt-ops').replace(/^\/+|\/+$/g, '')}`;
  if (!/^\/[a-zA-Z0-9_-]+$/.test(normalized)) {
    throw new Error('ADMIN_PATH must contain only letters, numbers, hyphens, or underscores.');
  }
  return normalized;
};

const adminEntryPlugin = (adminPath: string): Plugin => ({
  name: 'private-admin-entry',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const pathname = req.url?.split('?', 1)[0].replace(/\/$/, '') || '/';

      if (pathname === adminPath) {
        req.url = '/admin.html';
        next();
        return;
      }

      if (pathname === '/admin' || pathname === '/admin.html') {
        res.statusCode = 404;
        res.end('Not found');
        return;
      }

      next();
    });
  },
  writeBundle(options) {
    const outputDirectory = path.resolve(__dirname, options.dir || 'dist');
    const privateDirectory = path.join(outputDirectory, adminPath.slice(1));
    mkdirSync(privateDirectory, { recursive: true });
    renameSync(
      path.join(outputDirectory, 'admin.html'),
      path.join(privateDirectory, 'index.html'),
    );
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '');
  const adminPath = normalizeAdminPath(env.ADMIN_PATH);

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          admin: path.resolve(__dirname, 'admin.html'),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    plugins: [react(), tailwindcss(), adminEntryPlugin(adminPath)],

  };
});
