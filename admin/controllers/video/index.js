import express from 'express';
import multer from 'multer';

let router = express.Router();
let videoUpload = multer({ dest: 'uploads/' });

import actionRemove from './action.remove';
import actionRealRemove from './action.realRemove';
import actionUpload from './action.upload';
import actionFind from './action.find';

router.route('/:id')
    .delete(actionRemove);

router.route('/realremove/:id')
    .delete(actionRealRemove);

router.route('/')
    .post(videoUpload.single('video'), actionUpload)
    .get(actionFind);

module.exports = router;
