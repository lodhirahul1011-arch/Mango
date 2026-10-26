// Run from this directory: node install.cjs /absolute/path/to/car-booking/backend
const fs=require('node:fs');const path=require('node:path');
const target=path.resolve(process.argv[2] || '');
if(!process.argv[2] || !fs.existsSync(path.join(target,'server.js'))) throw Error('Pass the existing car-booking backend directory.');
const server=path.join(target,'server.js');let source=fs.readFileSync(server,'utf8');
if(!source.includes("require('./pio/contact.cjs')")){
 if(!source.includes('// Body parsing middleware'))throw Error('Cannot locate mount position; see README for manual integration.');
 source=source.replace('// Body parsing middleware',"app.use('/api/pio/contact', require('./pio/contact.cjs').createRouter());\n\n// Body parsing middleware");
}
if(!source.includes("app.set('trust proxy'"))source=source.replace('const app = express();',"const app = express();\napp.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS || 1));");
fs.cpSync(path.join(__dirname,'pio'),path.join(target,'pio'),{recursive:true});
fs.writeFileSync(server,source);console.log('PIO contact integration installed in existing backend. Configure environment and redeploy that service.');
