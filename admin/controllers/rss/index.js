import express from 'express';
import path from 'path';
import pageList from './page.list';
import pageCreate from './page.create';
import rssGet from './rssGet';
import actionRssCreate from './action.create.js';
import pageRssUpdate from './page.update';
import actionRssUpdate from './action.update';
import actionRssRemove from './action.remove'
let router = express.Router();


router.route('/list')
    .get(pageList);

router.route('/create')
    .get((pageCreate))
    .post(actionRssCreate);

router.route('/update/:sn')
    .get(pageRssUpdate)
    .put(actionRssUpdate);

router.route('/delete/:sn')
    .delete(actionRssRemove);

router.route('/*')
    .get(rssGet);

module.exports = router;
