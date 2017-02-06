
import Debug from 'debug';
import { NEWS_TYPES, NEWS_STATUS } from '../../util/constants';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.edit');

module.exports = async (req, res, next) => {

    try {

        let { newsId } = req.params;

        let { data: news } = await axios.get(`/news/${newsId}`);

        debug('news = %j', news);

        return res.render('news/page.news.edit.html', {
            NEWS_TYPES,
            NEWS_STATUS,
            news
        });

    }
    catch(err) {
        return next(err);
    }
};
