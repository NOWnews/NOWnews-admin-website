import express from 'express';
let router = express.Router();

import actionRemove from './action.remove';
import actionRealRemove from './action.realRemove';
import actionUpload from './action.upload';
import actionFind from './action.find';

router.route('/:id')
    .delete(actionRemove);

router.route('/:id/realremove')
    .delete(actionRealRemove);

router.route('/')
    .post(actionUpload)
    .get(actionFind);

module.exports = router;
