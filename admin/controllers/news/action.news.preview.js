import config from 'config';
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:action.news.preview');

module.exports = async (req, res, next) => {

    try {
        let officialUrl = config.get('officialUrl');

        let { newsId } = req.params;

        let { data: { redisKey } } = await axios.post('/previews', { id: newsId });

        debug('redisKey = %j', redisKey);

        return res.json({
            previewUrl: `${officialUrl}/preview/${redisKey}`
        });
    }
    catch(err) {
        return next(err);
    }
};
