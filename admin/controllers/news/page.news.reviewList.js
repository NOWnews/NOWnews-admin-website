import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.reviewList');
import { NEWS_TYPES, NEWS_STATUS } from '../../util/constants';

module.exports = async (req, res, next) => {

    try {
        let queryString = req._parsedUrl.query? '?' + req._parsedUrl.query: '';
        let userId = req.session.adminUser._id;
        let { data: newsListInfo } = await axios.get(`/news${queryString}`, {
            params: {
                status: 'REVIEW',
                CreatedBy: userId
            }
        });
        let pageData = newsListInfo.pageData;
        let listDescription = {
            title: '審核中新聞',
            subtitle: '交給對方審核的新聞列表。',
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
