
import Debug from 'debug';
import { NEWS_TYPES, NEWS_STATUS } from '../../util/constants';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.create');

module.exports = async (req, res, next) => {

    try {

        let { data: { users: userList, pageData } } = await axios.get('/users');

        return res.render('news/page.news.create.html', {
            userList,
            NEWS_TYPES,
            NEWS_STATUS
        });
    }
    catch(err) {
        return next(err);
    }
};
