import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:priority:action.update');

module.exports = async (req, res, next) => {

    try {

        let { newsId } = req.params;
        let { weightedScore } = req.body;

        debug('newsId = %s', newsId);
        debug('weightedScore = %s', weightedScore);

        if (!newsId) {
            return res.json({ error: '更新失敗！' });
        }

        let { data } = await axios.put(`scores/${newsId}`, { weightedScore });

        return res.json({success: true});

    } catch(err) {
        return next(err);
    }
};
