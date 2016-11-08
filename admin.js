import express from 'express';

const controllers = require('./admin/controllers');
const middlewares = require('./admin/middlewares');
const errorHandlers = require('./admin/errorHandlers');

let app = express();

// middlewares
app.use(middlewares(app));

// controllers
app.use(controllers(app));

// errorHandles
app.use(errorHandlers(app));

module.exports = app;
