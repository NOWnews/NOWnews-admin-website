/*
 * 設定變數到 nunjucks
 */

import adminMenu from '../../adminMenu.json';

module.exports = () => {

    return (req, res, next) => {
        res.locals.NODE_ENV = process.env.NODE_ENV;

        // 設定左選單的
        let pathName = req._parsedUrl.pathname.split('/')[1];
        res.locals.adminMenu = adminMenu;
        if (adminMenu[pathName]) {
            _.map(adminMenu, (value) => { 
                value.status = false; return value; 
            });
            adminMenu[pathName].status = true;
        }
        console.log(res.locals.adminMenu.member.children)

        return next();
    };
};
