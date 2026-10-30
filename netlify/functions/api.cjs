const serverless = require('serverless-http');
const {createApp} = require('../../backend-integration/app.cjs');

exports.handler = serverless(createApp());
