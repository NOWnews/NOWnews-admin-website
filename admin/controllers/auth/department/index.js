import actionCreate from './action.create';
import actionRemove from './action.remove';
import actionUpdate from './action.update';

import pageCreate from './page.create';
import pageList from './page.list';
import pageEdit from './page.edit';

module.exports = (router) => {
    router.route('/department/')
        .get(pageList);

    router.route('/department/create')
        .get(pageCreate)
        .post(actionCreate);

    router.route('/department/:id')
        .delete(actionRemove)
        .get(pageEdit)
        .put(actionUpdate);
};
