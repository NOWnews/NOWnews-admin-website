
import express from 'express';
let router = express.Router();

import pageOne from './page.one';
import actionUpdate from './action.update';

router.route('/')
    .get(pageOne)
    .put(actionUpdate);

module.exports = router;
