import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.myList');
import { NEWS_TYPES, NEWS_STATUS } from '../../util/constants';
module.exports = async (req, res, next) => {

    try {
        let queryString = req._parsedUrl.query? '?' + req._parsedUrl.query: '';
        let userId = req.session.adminUser._id;
        let { data: newsListInfo } = await axios.get(`/news${queryString}`, {
            params: {
                status: 'REVIEW',
                LastReviewer: userId
            }
        });

        let pageData = newsListInfo.pageData;
        let listDescription = {
            title: '待我審核新聞',
            subtitle: '需要由我審核的新聞。',
        };

        debug('newsListInfo = %j', newsListInfo );

        return res.render('news/page.news.myList.html', {
            NEWS_STATUS,
            NEWS_TYPES,
            newsListInfo,
            pageData,
            listDescription
        });
    }
    catch(err) {
        return next(err);
    }
};
