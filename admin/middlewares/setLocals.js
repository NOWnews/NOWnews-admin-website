/*
 * 設定變數到 nunjucks
 */
import config from 'config';
import adminMenu from '../../adminMenu.json';
import _ from 'lodash';
import moment from 'moment-timezone';

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

    if (req.session.moderator) {
        let todayInfo = moment.tz('Asia/Taipei').toObject();
        let year = req.session.moderator.year;
        let month = req.session.moderator.month;
        if (year == todayInfo.years && month == todayInfo.months + 1) {
            req.session.moderator.morning = req.session.moderator.schedule['day' + todayInfo.date][0];
            req.session.moderator.night = req.session.moderator.schedule['day' + todayInfo.date][1];
        }
    }

    res.locals.pathname = pathname;
    res.locals.currentUser = req.session.adminUser;
    res.locals.Moderator = req.session.moderator;
    return next();
};
