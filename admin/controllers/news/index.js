import express from 'express';
let router = express.Router();

import actionNewsCreate from './action.news.create';
import actionNewsRemove from './action.news.remove';
import actionNewsUpdate from './action.news.update';

import actionDailyPlanCreate from './action.dailyPlan.create';
import actionDailyPlanRemove from './action.dailyPlan.remove';
import actionDailyPlanUpdate from './action.dailyPlan.update';

import pageDailyPlanList from './page.dailyPlan.list';
import pageDailyPlanCreate from './page.dailyPlan.create';
import pageDailyPlanEdit from './page.dailyPlan.edit';

import pageNewsMyList from './page.news.myList';
import pageNewsReviewList from './page.news.reviewList';
import pageNewsCreate from './page.news.create';
import pageNewsEdit from './page.news.edit';

// 每日稿單 Route
router.route('/dailyPlanList')
    .get(pageDailyPlanList);

router.route('/dailyPlan/create')
    .get(pageDailyPlanCreate)
    .post(actionDailyPlanCreate);

router.route('/dailyPlan/:id')
    .delete(actionDailyPlanRemove)
    .get(pageDailyPlanEdit)
    .put(actionDailyPlanUpdate);

// 新聞 Route
router.route('/myList')
    .get(pageNewsMyList);

router.route('/reviewList')
    .get(pageNewsReviewList);

router.route('/create')
    .get(pageNewsCreate)
    .post(actionNewsCreate);

router.route('/:id')
    .delete(actionNewsRemove)
    .get(pageNewsEdit)
    .put(actionNewsUpdate);

module.exports = router;
