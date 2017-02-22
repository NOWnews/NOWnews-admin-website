import Debug from 'debug';
import { NEWS_TYPES, NEWS_STATUS } from '../../util/constants';

const debug = Debug('NOWnews-admin-website: controllers:news:page.news.compare');

module.exports = async (req, res, next) => {

    try {

        let { beforeLogId, afterLogId } = req.query;

        let url = `/newslog/compare?beforeLogId=${beforeLogId}&afterLogId=${afterLogId}`;

        let { data: { after, before } } = await axios.get(url);

        let result = {
            after,
            before,
            NEWS_TYPES,
            NEWS_STATUS,
        }

        debug('result = %j', result);

        return res.render('news/page.news.compare.html', result);
    }
    catch(err) {
        return next(err);
    }
};
