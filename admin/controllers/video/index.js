import express from 'express';
import multer from 'multer';

let router = express.Router();
let videoUpload = multer({ dest: 'uploads/' });

import actionRemove from './action.remove';
import actionUpdate from './action.update';
import actionUpload from './action.upload';
import actionCreate from './action.create';
import actionFind from './action.find';

router.route('/remove/:id')
    .delete(actionRemove);

router.route('/update/:id')
    .put(actionUpdate);

router.route('/')
    .post(actionCreate)
    .get(actionFind);

router.route('/upload')
    .post(videoUpload.single('video'), actionUpload)

module.exports = router;
