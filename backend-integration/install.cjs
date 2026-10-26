// Run from this directory: node install.cjs /absolute/path/to/car-booking/backend
const fs=require('node:fs');const path=require('node:path');
const target=path.resolve(process.argv[2] || '');
if(!process.argv[2] || !fs.existsSync(path.join(target,'server.js'))) throw Error('Pass the existing car-booking backend directory.');
const server=path.join(target,'server.js');let source=fs.readFileSync(server,'utf8');
const routeMount="app.use('/api/pio/contact', cors({ origin: true }), require('./pio/contact.cjs').createRouter());";
source=source.replace(/^app\.use\('\/api\/pio\/contact'.*contact\.cjs.*\);\r?\n?/m,'');
if(!source.includes('// CORS configuration'))throw Error('Cannot locate CORS position; see README for manual integration.');
if(!source.includes(routeMount))source=source.replace('// CORS configuration',`${routeMount}\n\n// CORS configuration`);
if(!source.includes("app.set('trust proxy'"))source=source.replace('const app = express();',"const app = express();\napp.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS || 1));");
fs.cpSync(path.join(__dirname,'pio'),path.join(target,'pio'),{recursive:true});
fs.writeFileSync(server,source);console.log('PIO contact integration installed in existing backend. Configure environment and redeploy that service.');
