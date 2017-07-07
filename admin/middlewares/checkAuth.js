import config from 'config';
import _ from 'lodash';
import adminMenu from '../../adminMenu.json';

const debug = require('debug')('NOWadmin:admin:middlewares:checkAuth');

module.exports = async (req, res, next) => {

    try {
        const { method, path } = req;
        let checkList = [];

        // get menu checkList
        _.forEach(adminMenu, (group) => {
            _.forEach(group.children, (child) => {
                checkList.push(child.url);
            });
        });

        if (method !== 'GET' || checkList.indexOf(path) === -1) {
            return next();
        }

        await axios.get(`/policies/check?path=${path}&roleId=${req.session.adminUser.Role._id}`);

        return next();
     }
     catch(err) {
         return next(err);
     }

};
