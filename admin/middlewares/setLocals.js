/*
 * 設定變數到 nunjucks
 */
import config from 'config';
import adminMenu from '../../adminMenu.json';
let apiServer = config.get('apiServer');

module.exports = () => {

    return (req, res, next) => {
        res.locals.NODE_ENV = process.env.NODE_ENV;

        // 設定左選單的
        let pathname = req._parsedUrl.pathname.split('/')[1];
        res.locals.adminMenu = adminMenu;
        res.locals.pathname = pathname;
        res.locals.currentUser = req.session.adminUser;
        res.locals.apiServer = apiServer;

        return next();
    };
};
