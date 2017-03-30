
import express from 'express';
let router = express.Router();

import pageStatisticsCenters from './page.statistics.centers';
import pageStatisticsCenter from './page.statistics.center';
import pageStatisticsUsers from './page.statistics.users';

router.route('/centers')
    .get(pageStatisticsCenters);

router.route('/users/:id')
    .get(pageStatisticsUsers);

router.route('/centers/:id')
    .get(pageStatisticsCenter)

module.exports = router;
