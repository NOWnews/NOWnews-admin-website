import Debug from 'debug';
import _ from 'lodash';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.myList');
import { NEWS_TYPES, NEWS_STATUS } from '../../util/constants';
module.exports = async (req, res, next) => {

    try {
        let { query, originalUrl } = req;
        let queryString = req._parsedUrl.query? '?' + req._parsedUrl.query: '';
        let [{ data: { users: userList } },{ data: newsListInfo }] = await Promise.all([
            axios.get('/users?limit=10000'),
            axios.get(`/news${queryString}`)
        ]);

        let pageData = newsListInfo.pageData;
        let listDescription = {
            title: '所有新聞',
            subtitle: '新聞列表，照時間排序，狀態有草稿、審核、...等等 的項目。',
        };
        debug('newsListInfo = %j', newsListInfo );
        return res.render('news/page.news.myList.html', {
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
