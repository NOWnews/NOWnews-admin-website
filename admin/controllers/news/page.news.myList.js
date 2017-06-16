import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.myList');
import qs from 'querystring';
import { NEWS_TYPES, NEWS_STATUS } from '../../util/constants';
module.exports = async (req, res, next) => {

    try {
        let { query, originalUrl } = req;
        let queryString = req._parsedUrl.query? '?' + req._parsedUrl.query: '';
        let userId = req.session.adminUser._id;
        let { data: newsListInfo } = await axios.get(`/news${queryString}`, {
            params: {
                CreatedBy: userId
            }
        });

        let pageData = newsListInfo.pageData;
        let listDescription = {
            title: '我的新聞',
            subtitle: '由我建立的所有新聞列表。',
        };

        let qsNoPage = qs.parse(req._parsedUrl.query);
        delete qsNoPage.page;
        qsNoPage = qs.stringify(qsNoPage);
        pageData.qsNoPage = qsNoPage ? '&' + qsNoPage : '';

        debug('newsListInfo = %j', newsListInfo );

        return res.render('news/page.news.myList.html', {
            query,
            originalUrl,
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
