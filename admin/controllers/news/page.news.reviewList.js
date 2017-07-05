import config from 'config';
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.reviewList');
import qs from 'querystring';
import { NEWS_TYPES, NEWS_STATUS, NEWS_TEMPLATES, NEWS_TEMPLATES_AD } from '../../util/constants';
import checkSchedule from '../../util/checkSchedule';

module.exports = async (req, res, next) => {

    try {

        let checkPath = '/news/reviewList';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);

        let officialUrl = config.get('officialUrl');
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

        return res.render('news/page.news.myList.html', {
            officialUrl,
            NEWS_STATUS,
            NEWS_TYPES,
            NEWS_TEMPLATES,
            NEWS_TEMPLATES_AD,
            newsListInfo,
            pageData,
            listDescription
        });

    }
    catch(err) {
        return next(err);
    }
};
