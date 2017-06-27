/*
 * 設定變數到 nunjucks
 */
import config from 'config';

module.exports = () => {

    return (req, res, next) => {
        res.locals.NODE_ENV = process.env.NODE_ENV;

        // 設定左選單的
        let pathname = req._parsedUrl.pathname.split('/')[1];
        res.locals.adminMenu = req.session.adminMenu;
        res.locals.pathname = pathname;
        res.locals.currentUser = req.session.adminUser;
        return next();
    };
};
