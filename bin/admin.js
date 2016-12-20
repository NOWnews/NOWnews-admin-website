require('babel-core/register');
require('babel-polyfill');
require('../global.js');

let mobile = require('../admin.js');
let http = require('http');

let env = process.env.NODE_ENV;
let port = process.env.PORT || '3000';
mobile.set('port', port);

var server = http.createServer(mobile);
server.listen(port);
console.log(`-------------------------------`);
console.log(`Start NOWnewsAdmin`);
console.log(`Listen Port ${port}`);
console.log(`${env} mode`);
console.log(`-------------------------------`);
