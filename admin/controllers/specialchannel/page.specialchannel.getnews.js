import Debug from 'debug';
import config from 'config';
const debug = Debug('NOWnews-admin-website: controllers:page:indexpage.getnews');

module.exports = async (req, res, next) => {

    try {
        let baseURL = config.get('apiServer');
        let {title, status, type}= req.query;
        let { data: {newsList} } = await axios.get(baseURL+`/news?title=${title}&status=${status}&type=${type}`);

        debug('news = %j', newsList);
        return res.json({
            newsList,
        });
    }
    catch(err) {
        return next(err);
    }
};
