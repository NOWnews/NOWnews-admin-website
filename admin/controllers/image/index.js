import express from 'express';
let router = express.Router();

import actionRemove from './action.remove';
import actionRealRemove from './action.realRemove';
import actionFind from './action.find';

router.route('/:id')
    .delete(actionRemove);

router.route('/:id/realremove')
    .delete(actionRealRemove);

router.route('/')
    .get(actionFind);

module.exports = router;
