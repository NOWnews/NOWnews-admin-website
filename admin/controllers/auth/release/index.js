import actionUpsert from './action.upsert';
import pageEdit from './page.edit';

module.exports = (router) => {
    router.route('/release')
        .get(pageEdit)
        .post(actionUpsert);
};
