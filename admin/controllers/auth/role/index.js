import actionCreate from './action.create';
import actionRemove from './action.remove';
import actionUpdate from './action.update';

import pageCreate from './page.create';
import pageList from './page.list';
import pageOne from './page.one';

module.exports = (router) => {
    router.route('/role/')
        .get(pageList);

    router.route('/role/create')
        .get(pageCreate)
        .post(actionCreate);

    router.route('/role/:id')
        .delete(actionRemove)
        .get(pageOne)
        .put(actionUpdate);
};
