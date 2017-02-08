import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:action.news.update');

module.exports = async (req, res, next) => {

    try {
        let { newsId } = req.params;
        let userId = req.session.adminUser._id;
        let data = req.body;

        debug('req.body = %j', data);

        data.isDeliver = data.isDeliver ? true : false ;
        data.isAdult = data.isAdult ? true : false ;

        data.UpdatedBy = userId;

        let newsStatus = data.status.toLowerCase();
        let { data: news } = await axios.put(`/news/${newsId}/${newsStatus}`, data);

        debug('updatedNews = %j', news);

        return res.redirect(`/news/${newsId}`);
    }
    catch(err) {
        return next(err);
    }
};
