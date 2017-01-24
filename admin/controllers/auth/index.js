import { Router } from 'express';
import actionLogin from './action.login';
import actionLogout from './action.logout';
import pageLogin from './page.login';

import center from './center';
import department from './department';
import me from './me';
import role from './role';
import user from './user';

let router = Router();

router.route('/login')
    .get(pageLogin)
    .post(actionLogin);

router.route('/login')
    .get(pageLogin)
    .post(actionLogin);

router.route('/logout')
    .get(actionLogout);

center(router);
department(router);
me(router);
role(router);
user(router);


module.exports = router;
