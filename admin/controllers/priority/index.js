
import express from 'express';
let router = express.Router();

import pagePriorityList from './page.priority.list';

router.route('/')
    .get(pagePriorityList);


module.exports = router;
