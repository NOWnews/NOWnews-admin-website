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
import pageDemo from './page.demo';

router.route('/:id')
    .delete(actionRemove);

router.route('/:id')
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

router.route('/demo/:videoId')
    .get(pageDemo);

module.exports = router;
