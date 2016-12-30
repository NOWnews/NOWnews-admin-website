
import express from 'express';
let router = express.Router();

import pageList from './page.list';

router.route('/')
    .get(pageList);

module.exports = router;