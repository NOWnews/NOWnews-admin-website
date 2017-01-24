import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:action.news.update');

module.exports = async (req, res, next) => {

    try {
        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/news/action.update.js');
        });

        debug('updatedNews = %j', result);

        return res.json(result);
    }
    catch(err) {
        return next(err);
    }
};
