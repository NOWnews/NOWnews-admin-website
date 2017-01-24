import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:action.news.create');

module.exports = async (req, res, next) => {

    try {
        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/news/action.create.js');
        });

        debug('createdNews = %j', result);

        return res.json(result);
    }
    catch(err) {
        return next(err);
    }
};
