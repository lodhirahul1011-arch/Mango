const express = require('express');
const path = require('node:path');
const dotenv = require('dotenv');
const {createRouter} = require('./pio/contact.cjs');
const root = path.resolve(__dirname, '..');
function loadEnvironment(directory = root, env = process.env) {
  dotenv.config({path:path.join(directory,'.env'),processEnv:env,quiet:true});
  return env;
}
function createApp(options = {}) {
  const app = express();
  app.disable('x-powered-by');
  if (process.env.TRUST_PROXY_HOPS) app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS));
  app.use('/api/pio/contact', createRouter(options));
  return app;
}
module.exports = {createApp,loadEnvironment};
