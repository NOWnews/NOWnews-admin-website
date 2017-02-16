
import express from 'express';
let router = express.Router();

import pageList from './page.list';
import pageSort from './page.sort';
import pageCreate from './page.create';
import pageEdit from './page.edit';

import actionSortUpdate from './action.sort.update';
import actionCreate from './action.create';
import actionRemove from './action.remove';
import actionUpdate from './action.update';

router.route('/')
    .get(pageList);

router.route('/sort')
    .get(pageSort)
    .put(actionSortUpdate);

router.route('/create')
    .get(pageCreate)
    .post(actionCreate);

router.route('/:menuId')
    .delete(actionRemove)
    .put(actionUpdate)
    .get(pageEdit);

module.exports = router;
