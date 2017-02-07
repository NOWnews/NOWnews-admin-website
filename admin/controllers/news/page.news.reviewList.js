import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.reviewList');
import { NEWS_TYPES, NEWS_STATUS } from '../../util/constants';

module.exports = async (req, res, next) => {

    try {

        let { data: newsListInfo } = await axios.get('/news', {
            params: {
                status: 'REVIEW'
            }
        });

        debug('newsListInfo = %j', newsListInfo );

        return res.render('news/page.news.myList.html', {
            NEWS_STATUS,
            newsListInfo,
        });

    }
    catch(err) {
        return next(err);
    }
};
