import actionCreate from './action.create';
import actionRemove from './action.remove';
import actionUpdate from './action.update';

import pageCreate from './page.create';
import pageList from './page.list';
import pageEdit from './page.edit';

module.exports = (router) => {
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
