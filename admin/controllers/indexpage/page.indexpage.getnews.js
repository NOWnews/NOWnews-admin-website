import Debug from 'debug';
import config from 'config';
const debug = Debug('NOWnews-admin-website: controllers:page:indexpage.getnews');

module.exports = async (req, res, next) => {
    try {
        let {title, status, type}= req.query;

        debug('req.query = %j',req.query);

        let { data: {newsList} } = await axios.get(`/news?title=${encodeURIComponent(title)}&status=${status}&type=${type}&isScheduled=false&isFeed=false`);

        debug('news = %j', newsList);
        return res.json({
            newsList,
        });
    }
    catch(err) {
        return next(err);
    }
};
