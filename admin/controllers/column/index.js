import express from 'express';
let router = express.Router();

import pageList from './page.specialchannel.list';
import pageCreate from './page.specialchannel.create';
import pageEdit from './page.specialchannel.edit';

import actionCreate from './action.specialchannel.create';
import actionRemove from './action.specialchannel.remove';
import actionUpdate from './action.specialchannel.update';

router.route('/specialchannel/')
    .get(pageList);

router.route('/specialchannel/create')
    .get(pageCreate)
    .post(actionCreate);

router.route('/specialchannel/:columnId')
    .delete(actionRemove)
    .put(actionUpdate)
    .get(pageEdit);

module.exports = router;
