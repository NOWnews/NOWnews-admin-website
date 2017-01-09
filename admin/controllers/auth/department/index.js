import actionCreate from './action.create';
import actionRemove from './action.remove';
import actionUpdate from './action.update';

import pageOne from './page.one';

module.exports = (router) => {

    router.route('/department')
        .post(actionCreate);

    router.route('/department/:id')
        .delete(actionRemove)
        .get(pageOne)
        .put(actionUpdate);
};
