import express from 'express';
let router = express.Router();
import listByCategory from './listByCategory';
import one from './one';

router.route('/photo')
    .get(listByCategory);

router.route('/photo/category/:taxId')
    .get(listByCategory);

router.route('/photo/:photoId')
    .get(one);

module.exports = router;
