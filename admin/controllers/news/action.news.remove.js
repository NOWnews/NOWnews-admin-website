import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:action.news.remove');

module.exports = async (req, res, next) => {

    try {

        let { newsId } = req.params;

        let { data: news } = await axios.delete( `/news/${newsId}` );

        debug('removedNews = %j', news);

        return res.json({ news });
    }
    catch(err) {
        return next(err);
    }
};
