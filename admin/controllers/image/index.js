import express from 'express';
let router = express.Router();

import actionRealRemove from './action.realRemove';
import actionFind from './action.find';

router.route('/:id/realremove')
    .delete(actionRealRemove);

router.route('/')
    .get(actionFind);

module.exports = router;
