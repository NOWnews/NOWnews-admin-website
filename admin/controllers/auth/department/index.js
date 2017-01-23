import actionCreate from './action.create';
import actionRemove from './action.remove';
import actionUpdate from './action.update';

module.exports = (router) => {

    router.route('/department')
        .post(actionCreate);

    router.route('/department/:id')
        .delete(actionRemove)
        .put(actionUpdate);
};
