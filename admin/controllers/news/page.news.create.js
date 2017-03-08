
import Debug from 'debug';
import { NEWS_TYPES, NEWS_STATUS } from '../../util/constants';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.create');

module.exports = async (req, res, next) => {

    try {
        let userId = req.session.adminUser._id;
        let { data: { users: userList } } = await axios.get('/users?limit=10000');

        let { data: menus } = await axios.get('/menus/struction');

        debug('userList = %j', userList);
        debug('news = %j', menus);

        return res.render('news/page.news.create.html', {
            userList,
            menus,
            userId,
            NEWS_TYPES,
            NEWS_STATUS
        });
    }
    catch(err) {
        return next(err);
    }
};
