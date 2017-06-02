import express from 'express';
import multer from 'multer';
let router = express.Router();

let imageUpload = multer({ dest: 'uploads/' });

import actionClone from './action.clone';
import actionFind from './action.find';
import actionRemove from './action.remove';
import actionRealRemove from './action.realRemove';
import actionUpdate from './action.update';
import actionUpload from './action.upload';

import pageCreate from './page.create';
import pageList from './page.list';

router.route('/:id')
    .delete(actionRemove)
    .put(actionUpdate);

router.route('/:id/clone')
    .post(actionClone);

router.route('/:id/realremove')
    .delete(actionRealRemove);

router.route('/')
    .get(actionFind);

router.route('/upload')
    .post(imageUpload.single('image'), actionUpload);

router.route('/create')
    .get(pageCreate);

router.route('/list')
    .get(pageList);


module.exports = router;
