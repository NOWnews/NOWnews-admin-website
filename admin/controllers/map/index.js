
import express from 'express';
let router = express.Router();

import actionFindLocation from './action.find.location';

router.route('/')
    .get(actionFindLocation);

module.exports = router;
