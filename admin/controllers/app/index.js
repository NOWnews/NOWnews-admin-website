import { Router } from 'express';

import pageList from './page.list';
import actionCreate from './action.create';

let router = Router();

router.route('/version')
    .post(actionCreate)
    .get(pageList);

module.exports = router;
