
import express from 'express';
let router = express.Router();

import pageList from './page.list';
import pageCreate from './page.create';

import actionCreate from './action.create';
import actionRemove from './action.remove';

router.route('/')
    .get(pageList);

router.route('/create')
    .get(pageCreate)
    .post(actionCreate);

router.route('/:tagId')
    .delete(actionRemove)

module.exports = router;
