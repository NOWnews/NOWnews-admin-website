import { Router } from 'express';
import actionLogin from './action.login';
import actionLogout from './action.logout';
import pageLogin from './page.login';

import department from './department';
import center from './center';
import role from './role';
import user from './user';
import release from './release';

let router = Router();

router.route('/login')
    .get(pageLogin)
    .post(actionLogin);

router.route('/login')
    .get(pageLogin)
    .post(actionLogin);

router.route('/logout')
    .get(actionLogout);

department(router);
center(router);
role(router);
user(router);
release(router);


module.exports = router;
