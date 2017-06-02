import express from 'express';
let router = express.Router();

import actionNewsCreate from './action.news.create';
import actionNewsPreview from './action.news.preview';
import actionNewsRemove from './action.news.remove';
import actionNewsUpdate from './action.news.update';

import pageNewsMyList from './page.news.myList';
import pageNewsReviewList from './page.news.reviewList';
import pageNewsCreateList from './page.news.createList';
import pageNewsTakeMeReviewList from './page.news.takeMeReviewList';
import pageNewsCreate from './page.news.create';
import pageNewsEdit from './page.news.edit';
import pageNewsCompare from './page.news.compare';
import pageNewsLogs from './page.news.logs';

// 新聞 Route
router.route('/myList')
    .get(pageNewsMyList);

router.route('/createList')
    .get(pageNewsCreateList);

router.route('/reviewList')
    .get(pageNewsReviewList);

router.route('/takeMeReviewList')
    .get(pageNewsTakeMeReviewList);

router.route('/create')
    .get(pageNewsCreate)
    .post(actionNewsCreate);

router.route('/compare')
    .get(pageNewsCompare);

router.route('/:newsId/logs')
    .get(pageNewsLogs);

router.route('/preview')
    .post(actionNewsPreview);

router.route('/:newsId')
    .delete(actionNewsRemove)
    .get(pageNewsEdit)
    .put(actionNewsUpdate);

module.exports = router;
