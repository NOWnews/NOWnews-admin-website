
import express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import nunjucks from 'nunjucks';
import methodOverride from 'method-override';

import setLocals from './setLocals';
import isLogin from './isLogin';
import checkAuth from './checkAuth';
import checkLoginedTime from './checkLoginedTime';
import renderMinified from './render-minified';

module.exports = function(app) {

    app.use(favicon(rootPath + '/admin/favicon/favicon.ico'));
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(cors());

    // express session setting
    app.set('trust proxy', 1);
    app.use(cookieSession({
        name: 'admin',
        keys: ['NOWadmin', 'admin']
    }));

    // view engine 設定與 views 擺放位置設定
    app.set('view engine', 'html');
    nunjucks.configure( rootPath + '/admin/views/', {
        autoescape: true,
        express: app,
        watch: true
    }).addFilter('transIdToColorCode', function(str) {
        // 依據 Unique Objectid 中擷取固定一段當顏色碼 (memo.html 人名用)
        return `#${str.slice(18, 24)}`;
    });

    // 做 HTML Minify
    app.use(renderMinified);

    // 靜態檔案位置
    // let staticFilePath = (process.env.NODE_ENV === 'production') ? 'public/dist' : 'source';
    let staticFilePath = 'source';
    app.use('/static', express.static(`${rootPath}/admin/${staticFilePath}`));

    // overwrite put and delete method
    app.use(methodOverride(function(req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            let method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));

    app.use(logger('dev'));
    app.use(isLogin);
    app.use(checkLoginedTime);
    app.use(setLocals);
    app.use(checkAuth);


    return function(req, res, next) {
        return next();
    };
};
