import Debug from 'debug';
import Promise from 'bluebird';
const debug = Debug('NOWnews-admin-website: controllers:priority:action.update');

module.exports = async (req, res, next) => {

    try {

        let { newsId } = req.params;
        let { weightedScore } = req.body;

        if (!newsId) {
            return res.json({ error: '更新失敗！' });
        }
        let { data } = await axios.put(`scores/${newsId}`, { weightedScore });

        return res.redirect(req.originalUrl);

    } catch(err) {
        return next(err);
    }
};
