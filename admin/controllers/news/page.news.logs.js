import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.logs');

module.exports = async (req, res, next) => {

    try {
        let { newsId } = req.params;

        let { data: newslogList } = await axios.get('/newslog', {
            newsId,
            sort: 'createdAt',
        });

        debug('newslogList = %j', newslogList);

        return res.render('news/page.news.logs.html', {
            newslogList,
        });
    }
    catch(err) {
        return next(err);
    }
};
