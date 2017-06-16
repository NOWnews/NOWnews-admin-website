import express from 'express';
let router = express.Router();
import actionCreate from './action.create';
import actionRemove from './action.remove';
import actionUpdate from './action.update';
import actionCommentCreate from './action.comment.create';
import actionCommentRemove from './action.comment.remove';

import pageList from './page.list';
import pageOne from './page.one';
import pageCreate from './page.create'
import pageEdit from './page.edit';


router.route('/create')
    .get(pageCreate)
    .post(actionCreate);

router.route('/')
    .get(pageList)
    .post(actionCreate);

router.route('/:id/comment')
    .post(actionCommentCreate)
    .delete(actionCommentRemove);

router.route('/view/:id')
    .get(pageOne);

router.route('/:id')
    .get(pageEdit)
    .delete(actionRemove)
    .put(actionUpdate);

module.exports = router;
