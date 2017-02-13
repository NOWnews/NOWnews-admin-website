
import express from 'express';
let router = express.Router();

import pageList from './page.list';
import pageCreate from './page.create';
import pageEdit from './page.edit';

import actionCreate from './action.create';
import actionRemove from './action.remove';
import actionUpdate from './action.update';

router.route('/')
    .get(pageList);

router.route('/create')
    .get(pageCreate)
    .post(actionCreate);

router.route('/:tagId')
    .delete(actionRemove)
    .put(actionUpdate)
    .get(pageEdit);

// router.route('/create')
//     .get(pageMenuCreate);

module.exports = router;
