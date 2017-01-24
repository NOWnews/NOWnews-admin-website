import Debug from 'debug';
import _ from 'lodash';
const debug = Debug('NOWnews-admin-website: controllers:auth:role:page.edit');

module.exports = async (req, res, next) => {

    try {

        let { data: role } = await axios.get(`/roles/${req.params.id}`);

        let { data: defaultPolicies } = await axios.get('/policies/group');

        debug('role = %j', role);

        // 方便前端 mapping
        let checkedPolicies = {};
        _.forEach(role.Policies, (policy) => {
            checkedPolicies[policy] = "checked";
        });

        return res.render('auth/role/page.edit.html', {
            checkedPolicies,
            defaultPolicies,
            role,
        });
    }
    catch(err) {
        return next(err);
    }
};
