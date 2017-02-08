import actionCreate from './action.create';
import actionRemove from './action.remove';
import actionUpdate from './action.update';
import actionMeUpdate from './action.me.update';

import pageCreate from './page.create';
import pageList from './page.list';
import pageEdit from './page.edit';
import pageMe from './page.me';

module.exports = (router) => {

    router.route('/me')
        .get(pageMe)
        .put(actionMeUpdate);

    router.route('/user/')
        .get(pageList);

    router.route('/user/create')
        .get(pageCreate)
        .post(actionCreate);

    router.route('/user/:id')
        .delete(actionRemove)
        .get(pageEdit)
        .put(actionUpdate);
};
