
import express from 'express';
let router = express.Router();

import pagePriorityList from './page.priority.list';
import actionFind from './action.find';

router.route('/')
    .get(pagePriorityList);

module.exports = router;
