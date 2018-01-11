import Debug from 'debug';
import _ from 'lodash';
import qs from 'querystring';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.myList');
import { NEWS_TYPES, NEWS_STATUS } from '../../util/constants';
import checkSchedule from '../../util/checkSchedule';

module.exports = async (req, res, next) => {

    try {
        let { query, originalUrl } = req;
        let queryString = req._parsedUrl.query? '?' + req._parsedUrl.query: '?';
        let isFeed = 'false';
        if( queryString.includes('CreatedBy=530000000000000000000002') || //鉅亨網
            queryString.includes('CreatedBy=530000000000000000000004') || //中央社
            queryString.includes('CreatedBy=530000000000000000000005') || //軍聞社
            queryString.includes('CreatedBy=530000000000000000000006') || //PINKNOW
            queryString.includes('CreatedBy=530000000000000000000007') || //PLAYNOW
            queryString.includes('CreatedBy=530000000000000000000008') || //IFUNNOW
            queryString.includes('CreatedBy=530000000000000000000009') || //SPORTNOW
            queryString.includes('CreatedBy=530000000000000000000010') || //寵毛
            queryString.includes('CreatedBy=530000000000000000000011') || //保庇
            queryString.includes('CreatedBy=530000000000000000000012') //今日觀點
           ){
            isFeed = 'true';
           }
        let [{ data: { users: userList } },{ data: newsListInfo }, { data: mainMenus}] = await Promise.all([
            axios.get('/users?limit=10000&isInitUser=true'),
            axios.get(`/news${queryString}&isFeed=${isFeed}`),
            axios.get(`/menus?level=0`),
        ]);
        let pageData = newsListInfo.pageData;
        let listDescription = {
            title: '所有新聞',
            subtitle: '新聞列表，照時間排序，狀態有草稿、審核、...等等 的項目。',
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
            mainMenus,
            query,
            originalUrl,
            NEWS_STATUS,
            NEWS_TYPES,
            userList,
            newsListInfo,
            pageData,
            listDescription
        });
    }
    catch(err) {
        return next(err);
    }
};
