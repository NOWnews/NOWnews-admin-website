
import express from 'express';
let router = express.Router();

import pageList from './page.list';
import pageMenuCreate from './page.menu.create';

router.route('/')
    .get(pageList);

router.route('/create')
    .get(pageMenuCreate);

module.exports = router;
