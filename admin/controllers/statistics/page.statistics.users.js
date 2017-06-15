import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:statistics:page.users');
import { NEWS_STATUS } from '../../util/constants';

module.exports = async (req, res, next) => {

    try {
        let query = req.query;
        let queryString = req._parsedUrl.query;
        let url = `statistics/users/${req.params.id}?${queryString}`;
        let { data: user } = await axios.get(url);

        debug('statisticsUser = %j', user);

        return res.render('statistics/page.users.html', {
            user,
            query,
            NEWS_STATUS
        });

    } catch(err) {
        return next(err);
    }
};
