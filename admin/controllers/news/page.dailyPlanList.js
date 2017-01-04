import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:page.dailyPlanList');

module.exports = async (req, res, next) => {

    try {
        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/news/page.dailyPlanList.js');
        });

        debug('newsList = %j', result);
        return res.render('news/page.daily-plan-list.html');
    }
    catch(err) {
        return next(err);
    }
};
