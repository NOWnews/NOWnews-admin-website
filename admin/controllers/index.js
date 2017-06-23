import adminMenu from '../../adminMenu.json';
import home from './home';
import trend from './trend';
import map from './map';
import postBoard from './postBoard';
import robot from './robot';
import _ from 'lodash';

let adminPageRouter = {
    auth: require('./auth'),
    dailyplan: require('./dailyplan'),
    layout: require('./layout'),
    menu: require('./menu'),
    tags: require('./tags'),
    news: require('./news'),
    image: require('./image'),
    video: require('./video'),
    topic: require('./topic'),
    specialchannel: require('./specialchannel'),
    indexpage: require('./indexpage'),
    statistics: require('./statistics'),
    priority: require('./priority'),
    app: require('./app')
};

module.exports = function(app) {
    _.forEach(adminMenu, (menuValue, key) => {
        app.use(`/${key}`, adminPageRouter[key]);
    });

    app.use('/robots.txt', robot);
    app.use('/trend', trend);
    app.use('/map', map);
    app.use('/postBoard', postBoard);
    app.use('/', home);

    return function(req, res, next) {
        let err = {
            data: { statusCode: 404, message: '找不到頁面' },
            stack: 'Error: Request failed with status code 404'
        }
        return next(err);
    };
};
