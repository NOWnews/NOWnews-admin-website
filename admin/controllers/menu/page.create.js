import Debug from 'debug';
import { NEWS_TEMPLATES, NEWS_TEMPLATES_AD } from '../../util/constants';

const debug = Debug('NOWnews-admin-website: controllers:menu:page.create');

module.exports = async (req, res, next) => {

    try {
        let checkPath = '/menu/create';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);

        return res.render('menu/page.create.html', {
            NEWS_TEMPLATES,
            NEWS_TEMPLATES_AD,
        });
    }
    catch(err) {
        return next(err);
    }
};
