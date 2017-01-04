import express from 'express';
let router = express.Router();

import actionCreate from './action.create';
import actionRemove from './action.remove';
import actionUpdate from './action.update';

import pageCreate from './page.create';
import pageDailyPlanList from './page.dailyPlanList';
import pageMyList from './page.myList';
import pageOne from './page.one';
import pageReviewList from './page.reviewList';

router.route('/create')
    .get(pageCreate)
    .post(actionCreate);

router.route('/dailyPlanList')
    .get(pageDailyPlanList);

router.route('/myList')
    .get(pageMyList);

router.route('/reviewList')
    .get(pageReviewList);

router.route('/:id')
    .delete(actionRemove)
    .get(pageOne)
    .put(actionUpdate);


module.exports = router;
