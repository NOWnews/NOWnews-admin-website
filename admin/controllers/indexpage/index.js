
import express from 'express';
let router = express.Router();

// import pageList from './page.indexpage.list';
import pageIndexPageCreate from './page.indexpage.create';
// import pageSpecialChannelEdit from './page.specialchannel.edit';

import actionIndexPageCreate from './action.indexpage.create';
// import actionSpecialChannelUpdate from './action.specialchannel.update';
// import actionSpecialChannelRemove from './action.specialchannel.remove';

// 特輯 Route
// router.route('/')
//     .get(pageList);

router.route('/create')
    .get(pageIndexPageCreate)
    .put(actionIndexPageCreate);

// router.route('/:specialchannelId')
//     .put(actionSpecialChannelUpdate)
//     .get(pageSpecialChannelEdit)
//     .delete(actionSpecialChannelRemove);

module.exports = router;
