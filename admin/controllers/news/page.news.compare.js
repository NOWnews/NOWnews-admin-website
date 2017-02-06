import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.compare');

module.exports = async (req, res, next) => {

    try {

        let { beforeLogId, afterLogId } = req.query;

        let url = `/newslog/compare?beforeLogId=${beforeLogId}&afterLogId=${afterLogId}`;

        let { data: result } = await axios.get(url);

        debug('result = %j', result);

        return res.render('news/page.news.compare.html', result);
    }
    catch(err) {
        return next(err);
    }
};
