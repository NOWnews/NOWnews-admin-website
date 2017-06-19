let axiosLib = require('axios');
let config = require('config');

global._ = require('lodash');

global.NODE_ENV = process.env.NODE_ENV || 'staging';

global.rootPath = __dirname;
global.imageStorage = __dirname + '/imageStorage';


global.axios = axiosLib.create({
    baseURL: config.get('apiServer'),
    timeout: 10000,
    headers: config.get('headers'),
});
