import Debug from 'debug';
import Promise from 'bluebird';
import { NEWS_TYPES, NEWS_STATUS, NEWS_TEMPLATES, NEWS_TEMPLATES_AD } from '../../util/constants';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.create');

module.exports = async (req, res, next) => {

    try {

        let checkPath = '/news/create';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);

        let [
            { data: { users: userList } },
            { data: menus },
        ] = await Promise.all([
            axios.get('/users?limit=10000'),
            axios.get('/menus/struction')
        ]);

        debug('userList = %j', userList);

        debug('menus = %j', menus);

        return res.render('news/page.news.create.html', {
            userList,
            menus,
            NEWS_TYPES,
            NEWS_STATUS,
            NEWS_TEMPLATES,
            NEWS_TEMPLATES_AD
        });
    }
    catch(err) {
        return next(err);
    }
};
