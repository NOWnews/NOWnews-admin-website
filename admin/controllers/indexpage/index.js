
import express from 'express';
let router = express.Router();

import pageIndexPageCreate from './page.indexpage.create';

import actionIndexPageCreate from './action.indexpage.create';

import pageIndexGetNews from './page.indexpage.getnews';

import pageSpecialTopicGetTopic from './page.indexpage.getspecialtopic'

import pageSpecialChannelGetChannel from './page.indexpage.getspecialchannel'

router.route('/create')
    .get(pageIndexPageCreate)
    .put(actionIndexPageCreate);

router.route('/news')
    .get(pageIndexGetNews);

router.route('/specialtopics')
    .get(pageSpecialTopicGetTopic);

router.route('/specialchannels')
    .get(pageSpecialChannelGetChannel);

module.exports = router;
