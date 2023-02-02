import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: { 'process.env': process.env }
});

// import basicSsl from '@vitejs/plugin-basic-ssl';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), basicSsl()]
// });
