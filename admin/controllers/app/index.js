import { Router } from 'express';

import multer from 'multer';
let imageUpload = multer({ dest: 'uploads/' });

import pageversionList from './page.versionList';
import pageSplashList from './page.splashList';
import actionVersionCreate from './action.versionCreate';
import actionSplashCreate from './action.splashCreate';

let router = Router();

router.route('/version')
    .post(actionVersionCreate)
    .get(pageversionList);

router.route('/splash')
    .get(pageSplashList)
    .post(imageUpload.single('image'), actionSplashCreate);

module.exports = router;
