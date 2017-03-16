
import express from 'express';
let router = express.Router();

import pageList from './page.specialchannel.list';
import pageSpecialChannelCreate from './page.specialchannel.create';
import pageSpecialChannelEdit from './page.specialchannel.edit';

import actionSpecialChannelCreate from './action.specialchannel.create';
import actionSpecialChannelUpdate from './action.specialchannel.update';
import actionSpecialChannelRemove from './action.specialchannel.remove';

// 特輯 Route
router.route('/')
    .get(pageList);

router.route('/create')
    .get(pageSpecialChannelCreate)
    .post(actionSpecialChannelCreate);

router.route('/:specialchannelId')
    .put(actionSpecialChannelUpdate)
    .get(pageSpecialChannelEdit)
    .delete(actionSpecialChannelRemove);

module.exports = router;
