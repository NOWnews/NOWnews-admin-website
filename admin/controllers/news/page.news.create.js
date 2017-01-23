import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.create');

module.exports = async (req, res, next) => {

    try {

        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/news/page.create.js');
        });

        console.log(result);
        return res.render('news/page.news.create.html');
    }
    catch(err) {
        return next(err);
    }
};
