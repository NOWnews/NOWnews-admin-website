import express from 'express';
let router = express.Router();

import actionRecommendNewsKeywords from './action.newsKeywords';

router.route('/newskeywords')
    .post(actionRecommendNewsKeywords);

module.exports = router;