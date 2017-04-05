import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.myList');
import { NEWS_TYPES, NEWS_STATUS } from '../../util/constants';
module.exports = async (req, res, next) => {

    try {
        let queryString = req._parsedUrl.query? '?' + req._parsedUrl.query: '';
        let { data: newsListInfo } = await axios.get(`/news${queryString}`);

        let pageData = newsListInfo.pageData;
        let listDescription = {
            title: '所有新聞',
            subtitle: '新聞列表，照時間排序，狀態有草稿、審核、...等等 的項目。',
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
