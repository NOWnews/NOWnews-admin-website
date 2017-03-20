
import express from 'express';
let router = express.Router();

import pageList from './page.topic.list';
import pageTopicCreate from './page.topic.create';
import pageTopicEdit from './page.topic.edit';
import pageSpecialTopicGetNews from './page.topic.getnews';

import actionTopicCreate from './action.topic.create';
import actionTopicUpdate from './action.topic.update';
import actionTopicRemove from './action.topic.remove';

// 專題 Route
router.route('/')
    .get(pageList);

router.route('/create')
    .get(pageTopicCreate)
    .post(actionTopicCreate);

router.route('/news')
    .get(pageSpecialTopicGetNews);

router.route('/:topicId')
    .delete(actionTopicRemove)
    .put(actionTopicUpdate)
    .get(pageTopicEdit);

module.exports = router;
