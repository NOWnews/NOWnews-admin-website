
import express from 'express';
let router = express.Router();

import pageStatisticsDepartments from './page.statistics.departments';
import pageStatisticsDepartment from './page.statistics.department';
import pageStatisticsUsers from './page.statistics.users';

router.route('/departments')
    .get(pageStatisticsDepartments);

router.route('/users/:id')
    .get(pageStatisticsUsers);

router.route('/departments/:id')
    .get(pageStatisticsDepartment)

module.exports = router;
