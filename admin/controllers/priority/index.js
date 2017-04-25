
import express from 'express';
let router = express.Router();

import pagePriorityList from './page.priority.list';
import actionUpdate from './action.update';

router.route('/')
    .get(pagePriorityList);

router.route('/:newsId')
    .put(actionUpdate);

module.exports = router;
