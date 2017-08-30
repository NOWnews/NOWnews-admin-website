import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:action.news.remove');

module.exports = async (req, res, next) => {

    try {

        let { newsId } = req.params;
        let userId = req.session.adminUser._id;

        let { data: news } = await axios.delete( `/news/${newsId}`, {
            data: { UpdatedBy: userId }
        });
        debug('removedNews = %j', news);

        return res.json({ news });
    }
    catch(err) {
        return next(err);
    }
};
