import express from 'express';
let router = express.Router();

import check from './check';

router.route('/check')
    .get(check);

module.exports = router;
