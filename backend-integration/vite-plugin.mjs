import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const {createApp,loadEnvironment} = require('./app.cjs');
export function contactApi() {
  loadEnvironment();
  return {
    name: 'pio-contact-api',
    configureServer(server) { server.middlewares.use(createApp()); },
    configurePreviewServer(server) { server.middlewares.use(createApp()); },
  };
}
