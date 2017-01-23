import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.reviewList');

module.exports = async (req, res, next) => {

    try {
        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/news/page.myList.js');
        });

        debug('newsList = %j', result);
        return res.render('news/page.news.reviewList.html');
    }
    catch(err) {
        return next(err);
    }
};
