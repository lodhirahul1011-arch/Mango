const path = require('node:path');
const express = require('express');
const {createApp,loadEnvironment} = require('./app.cjs');
loadEnvironment();
const app = createApp();
const dist = path.resolve(__dirname,'../dist');
app.use(express.static(dist));
app.get('*',(req,res)=>res.sendFile(path.join(dist,'index.html')));
app.listen(Number(process.env.PORT || 5000),()=>console.log('PIO website and contact API running.'));
