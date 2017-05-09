
const co = require('co');
const Promise = require('bluebird');
const mongodb = require('mongodb');

const config = require('config');

const MongoDB = Promise.promisifyAll(mongodb);
const MongoClient = Promise.promisifyAll(MongoDB.MongoClient);

const newsMongodb = 'mongodb://nowproduction:werocks@61.220.58.2/production';


const mongodb14 = MongoClient.connectAsync(newsMongodb);

module.exports = mongodb14;