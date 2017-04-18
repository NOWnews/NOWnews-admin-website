
import express from 'express';
let router = express.Router();

import pagePriorityList from './page.priority.list';
import pagePriorityGetNewsByCategory from './page.priorityGetNewslistByCatgory';

router.route('/')
    .get(pagePriorityList);

router.route('/getnews')
    .get(pagePriorityGetNewsByCategory);

module.exports = router;
