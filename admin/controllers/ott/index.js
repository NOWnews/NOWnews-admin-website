
import express from 'express';
let router = express.Router();

import pageList from './page.list';
import pageProviderEdit from './page.provider.edit';
import pageChannelList from './page.channel.create';
import pageCategoryCreate from './page.category.create';
import pageInfoCreate from './page.info.create';
import pageAllChannelList from './page.channel.list';

import actionChannelCreate from './action.channel.create';
import actionCategoryCreate from './action.category.create';
import actioncategoryRemove from './action.category.remove';
import actionchannelRemove from './action.channel.remove';

import actionInfoCreate from './action.info.create';
import actionProviderUpdate from './action.provider.update';
import actionUpdateChannelList from './action.channellist.update'

router.route('/providers/list')
    .get(pageList);

router.route('/category')
    .get(pageCategoryCreate)
    .post(actionCategoryCreate);

router.route('/category/:id')
    .delete(actioncategoryRemove);

router.route('/channels/:id')
    .delete(actionchannelRemove);

router.route('/channels')
    .get(pageChannelList)
    .post(actionChannelCreate);

router.route('/channels/list')
    .get(pageAllChannelList)
    .put(actionUpdateChannelList);


router.route('/info')
    .get(pageInfoCreate)
    .post(actionInfoCreate);


router.route('/providers/:providerId')
    .get(pageProviderEdit)
    .put(actionProviderUpdate);



module.exports = router;
