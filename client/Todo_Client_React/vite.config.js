import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // listen on all IP addresses
    port: 4000, // or any port you prefer
    strictPort: false, // fail if port is taken or try next port
  },
});