import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'dambae',
  brand: {
    displayName: '담배 한 대',
    primaryColor: '#1B64DA',
    icon: '',
  },
  web: {
    host: 'localhost',
    port: 5173,
    commands: {
      dev: 'npm run dev',
      build: 'npm run build',
    },
  },
  permissions: [],
  outdir: 'dist',
});
