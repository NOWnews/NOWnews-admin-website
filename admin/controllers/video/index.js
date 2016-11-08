import express from 'express';
let router = express.Router();

import listByCategory from './listByCategory';
import one from './one';

router.route('/video')
    .get(listByCategory);

router.route('/video/category/:taxId')
    .get(listByCategory);

router.route('/video/:videoId')
    .get(one);

module.exports = router;
