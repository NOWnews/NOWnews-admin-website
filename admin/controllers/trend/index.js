
import express from 'express';
let router = express.Router();

import actionFindGoogle from './action.find.google';

router.route('/google')
    .get(actionFindGoogle);

module.exports = router;
