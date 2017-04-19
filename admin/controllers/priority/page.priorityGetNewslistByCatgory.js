import Debug from 'debug';
import config from 'config';
const debug = Debug('NOWnews-admin-website: controllers:page:priority.getnews');

module.exports = async (req, res, next) => {

    try {
        let baseURL = config.get('apiServer');
        let {menuId}= req.query;
        let { data: {newsListWithPageviews} } = await axios.get(baseURL+`/scores?menuId=${menuId}`);

        return res.json(newsListWithPageviews);
        // return res.render('priority/page.list.html', {
        //     newsListWithPageviews
        // });
        // debug('news = %j', newsList);
        // return res.json({
        //     newsList,
        // });
    }
    catch(err) {
        return next(err);
    }
};
