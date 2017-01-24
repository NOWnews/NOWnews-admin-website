import pageEdit from './page.edit';
import actionUpdate from './action.update';

module.exports = (router) => {

    router.route('/me')
        .get(pageEdit)
        .put(actionUpdate);

};
