import express from 'express';
import multer from 'multer';

let router = express.Router();
let videoUpload = multer({ dest: 'uploads/' });

import actionRemove from './action.remove';
import actionUpdate from './action.update';
import actionUpload from './action.upload';
import actionCreate from './action.create';
import actionFind from './action.find';

import pageCreate from './page.create';
import pageList from './page.list';
import pageOne from './page.one';
import pageDemo from './page.demo';

router.route('/remove/:id')
    .delete(actionRemove);

router.route('/update/:id')
    .put(actionUpdate);

router.route('/')
    .post(actionCreate)
    .get(actionFind);

router.route('/upload')
    .post(videoUpload.single('video'), actionUpload);

router.route('/create')
    .get(pageCreate);

router.route('/list')
    .get(pageList);

router.route('/:videoId')
    .get(pageOne);

router.route('/demo/:videoId')
    .get(pageDemo);

module.exports = router;
