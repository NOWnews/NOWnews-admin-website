import actionCreate from './action.create';
import actionRemove from './action.remove';
import actionUpdate from './action.update';

module.exports = (router) => {

    router.route('/center')
        .post(actionCreate);

    router.route('/center/:id')
        .delete(actionRemove)
        .put(actionUpdate);
};
