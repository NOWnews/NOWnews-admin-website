import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.logs');

module.exports = async (req, res, next) => {

    try {
        let { id } = req.params;

        let { data: newslogList } = await axios.get('/newslog', {
            newsId: id,
            sort: 'createdAt',
        });

        debug('newslogList = %j', newslogList);

        newslogList = [{
            formatCreatedAt: '123',
            CreatedBy: {name: '楊過'},
            title: 'title123',
            _id: 123,
        },{
            formatCreatedAt: '456',
            CreatedBy: {name: '小龍女'},
            title: 'title456',
            _id: 456,
        }];

        return res.render('news/page.news.logs.html', {
            newslogList,
        });
    }
    catch(err) {
        return next(err);
    }
};
