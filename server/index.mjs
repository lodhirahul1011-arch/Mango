import 'dotenv/config';
import { createApp } from './app.mjs';
const port = Number(process.env.PORT || 3001);
createApp().listen(port, '0.0.0.0', () => console.log('PIO server listening on port ' + port));
