import Debug from 'debug';
import { forEach } from 'lodash';
const debug = Debug('NOWnews-admin-website: controllers:auth:role:page.one');

module.exports = async (req, res, next) => {

    try {

        // let { data: role } = await axios.get(`/roles/${req.params.id}`);

        let { data: defaultPolicies } = await axios.get('/policies/group');

        let role = {
            name: '總編輯',
            polices: [
                '510000000000000000000001',
                '510000000000000000000003',
            ],
        };

        // debug('role = %j', role);

        // 方便前端 mapping
        let checkedPolicies = {};
        forEach(role.polices, (policy) => {
            checkedPolicies[policy] = "checked";
        });

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
