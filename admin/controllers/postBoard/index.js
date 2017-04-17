import express from 'express';
let router = express.Router();

// import actionNewsCreate from './action.news.create';
import actionCreate from './action.create';
import actionRemove from './action.remove';
import actionUpdate from './action.update';
import actionSendMessage from './action.sendMessage';
import actionRemoveMessage from './action.removeMessage';

import pageList from './page.list';

router.route('/')
    .get(pageList)
    .post(actionCreate);

router.route('/:id/message')
    .put(actionSendMessage)
    .delete(actionRemoveMessage);

router.route('/:id')
    .delete(actionRemove)
    .put(actionUpdate);

module.exports = router;
