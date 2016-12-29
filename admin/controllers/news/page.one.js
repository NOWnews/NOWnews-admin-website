import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:page.one');

module.exports = async (req, res, next) => {

    try {

        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/news/page.one.js');
        });

        debug('news = %j', result);
        return res.render('news/page.one.html');
    }
    catch(err) {
        return next(err);
    }
};
