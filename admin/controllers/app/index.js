import { Router } from 'express';

import multer from 'multer';
let imageUpload = multer({ dest: 'uploads/' });

import pageversionList from './page.versionList';
import pageSplashList from './page.splashList';
import pageNotification from './page.notification';
import actionVersionCreate from './action.versionCreate';
import actionSplashCreate from './action.splashCreate';
import actionNotification from './action.notification';


let router = Router();

router.route('/version')
    .post(actionVersionCreate)
    .get(pageversionList);

router.route('/splash')
    .get(pageSplashList)
    .post(imageUpload.single('image'), actionSplashCreate);

router.route('/notification')
    .get(pageNotification)
    .post(actionNotification);

module.exports = router;
