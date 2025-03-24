import path from 'path';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

import { version } from './package.json';

dotenv.config({ path: '.env.local' });

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const assetsBaseUrl = process.env.VITE_ASSETS_BASE_URL || '';
  const isProduction = command === 'build';

  if (!assetsBaseUrl && isProduction) {
    throw new Error('Environment variable [VITE_ASSETS_BASE_URL] is not set. Did you configure your .env.local file correctly?'); 
  }

  if (!version) {
    throw new Error('Component version is not set. Did you configure your package.json file correctly?');
  }

  return {
    root: 'src',
    base: isProduction ? `${assetsBaseUrl}/${version}/` : '/',
    plugins: [
      react(),
      visualizer({ open: false, gzipSize: true })
    ],
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      sourcemap: false,
      target: 'esnext',
      rollupOptions: {
        external: ['react', 'react-dom'],
        input: path.resolve(__dirname, 'src/index.tsx'),
        output: {
          format: 'umd',
          entryFileNames: 'wristband-sdk-matrix.js',
          assetFileNames: 'assets/[name].[ext]',
          globals: { 'react': 'React', 'react-dom': 'ReactDOM' }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: { port: 3000, cors: true },
    preview: { port: 3000, cors: true },
  };
});
