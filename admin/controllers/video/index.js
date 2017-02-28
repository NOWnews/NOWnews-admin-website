import express from 'express';
let router = express.Router();

import actionRemove from './action.remove';
import actionRealRemove from './action.realRemove';
import actionCreate from './action.create';
import actionFind from './action.find';

router.route('/:id')
    .delete(actionRemove);

router.route('/:id/realremove')
    .delete(actionRealRemove);

router.route('/')
    .post(actionCreate)
    .get(actionFind);

module.exports = router;
