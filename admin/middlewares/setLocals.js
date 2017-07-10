/*
 * 設定變數到 nunjucks
 */
import config from 'config';
import adminMenu from '../../adminMenu.json';
import _ from 'lodash';

module.exports = (req, res, next) => {

    res.locals.NODE_ENV = process.env.NODE_ENV;

    let pathname = req._parsedUrl.pathname.split('/')[1];


    // 設定左選單的 && 整理有權限的 Menu

    if (req.session.adminUser && !res.locals.adminMenu) {

        var pathArray = req.session.adminUser.Role.pathPolicies || [];

        var realMenus = _.cloneDeep(adminMenu);
        _.forEach(adminMenu, (group, groupKey) => {
            var hasChildAuth = false;
            _.forEach(group.children, (child, childKey) => {
                if (pathArray.indexOf(child.url) === -1) {
                    delete realMenus[groupKey].children[childKey];
                    return
                }
                hasChildAuth = true;
            });

            if (!hasChildAuth) {
                delete realMenus[groupKey];
            }
        });
        res.locals.adminMenu = realMenus;
    }

    res.locals.pathname = pathname;
    res.locals.currentUser = req.session.adminUser;
    return next();
};
