
import express from 'express';
let router = express.Router();

import pageIndexPageCreate from './page.indexpage.create';

import actionIndexPageCreate from './action.indexpage.create';

router.route('/create')
    .get(pageIndexPageCreate)
    .put(actionIndexPageCreate);

module.exports = router;
