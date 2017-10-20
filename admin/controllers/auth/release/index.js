import actionUpsert from './action.upsert';
import actionCreateTimeAndRole from './action.create.timeAndRole';
import pageEdit from './page.edit';


module.exports = (router) => {
    router.route('/release')
        .get(pageEdit)
        .post(actionUpsert);

    router.route('/release/timeAndRole')
        .post(actionCreateTimeAndRole);
};
