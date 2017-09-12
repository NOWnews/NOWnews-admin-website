import Debug from 'debug';
import Promise from 'bluebird';
import { NEWS_TYPES, NEWS_STATUS, NEWS_TEMPLATES, TEMPLATES_AD } from '../../util/constants';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.create');

module.exports = async (req, res, next) => {

    try {
        let roleId = req.session.adminUser.Role._id;

        let [
            { data: { users: userList } },
            { data: menus },
            { data: reviewers },
        ] = await Promise.all([
            axios.get('/users?limit=10000&sort=staffId'),
            axios.get('/menus/struction'),
            axios.get(`/roles/${roleId}/reviewers`),
        ]);


        debug('userList = %j', userList);

        debug('menus = %j', menus);

        return res.render('news/page.news.create.html', {
            reviewers,
            userList,
            menus,
            NEWS_TYPES,
            NEWS_STATUS,
            TEMPLATES: NEWS_TEMPLATES,
            TEMPLATES_AD
        });
    }
    catch(err) {
        return next(err);
    }
};
