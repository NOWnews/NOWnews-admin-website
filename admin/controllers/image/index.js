import express from 'express';
import multer from 'multer';
let router = express.Router();

let imageUpload = multer({ dest: 'uploads/' });
import actionRemove from './action.remove';
import actionRealRemove from './action.realRemove';
import actionFind from './action.find';
import actionUpload from './action.upload';

router.route('/:id')
    .delete(actionRemove);

router.route('/:id/realremove')
    .delete(actionRealRemove);

router.route('/')
    .get(actionFind);

router.route('/upload')
    .post(imageUpload.single('image'), actionUpload);


module.exports = router;
