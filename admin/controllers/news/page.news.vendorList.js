import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.vendorList');
import qs from 'querystring';
import { NEWS_TYPES, NEWS_STATUS, NEWS_TEMPLATES, TEMPLATES_AD } from '../../util/constants';
import checkSchedule from '../../util/checkSchedule';

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
            title: '我的新聞(廠商)',
            subtitle: '由我建立的所有新聞列表。',
        };

        newsListInfo.newsList = _.map(newsListInfo.newsList, (news) => {
            // 發布的新聞是否為預約發稿
            if (news.status === 'RELEASE'){
                news.isSchedule = checkSchedule(news.startedAt);
            }
            return news;
        });

        let qsNoPage = qs.parse(req._parsedUrl.query);
        delete qsNoPage.page;
        qsNoPage = qs.stringify(qsNoPage);
        pageData.qsNoPage = qsNoPage ? '&' + qsNoPage : '';

        debug('newsListInfo = %j', newsListInfo );

        return res.render('news/page.news.vendorList.html', {
            query,
            originalUrl,
            NEWS_STATUS,
            NEWS_TYPES,
            TEMPLATES: NEWS_TEMPLATES,
            TEMPLATES_AD,
            newsListInfo,
            pageData,
            listDescription
        });
    }
    catch(err) {
        return next(err);
    }
};
