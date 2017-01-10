import Debug from 'debug';
import { forEach } from 'lodash';
const debug = Debug('NOWnews-admin-website: controllers:auth:role:page.one');

module.exports = async (req, res, next) => {

    try {

        let role = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/role/page.one.js');
        });

        debug('role = %j', role);
        role = {
            name: '總編輯',
            polices: [
                '510000000000000000000001',
                '510000000000000000000003',
            ],
        };

        // 方便前端 mapping
        let checkedPolicies = {};
        forEach(role.polices, (policy) => {
            checkedPolicies[policy] = "checked";
        });

        let defaultPolicies = [{
            "_id": "選單",
            "policies": [{
                "_id": "510000000000000000000003",
                "group": "選單",
                "desc": "",
                "type": "ADMIN",
                "method": "get",
                "path": "/menu"
            }]
        }, {
            "_id": "新聞",
            "policies": [{
                "_id": "510000000000000000000002",
                "group": "新聞",
                "desc": "",
                "type": "ADMIN",
                "method": "post",
                "path": "/user"
            }, {
                "_id": "510000000000000000000001",
                "group": "新聞",
                "desc": "",
                "type": "ADMIN",
                "method": "get",
                "path": "/user"
            }]
        }];

        return res.render('auth/role/page.one.html', {
            checkedPolicies,
            defaultPolicies,
            role,
        });
    }
    catch(err) {
        return next(err);
    }
};
