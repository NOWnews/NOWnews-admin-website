import Debug from 'debug';
import { NEWS_TEMPLATES, NEWS_TEMPLATES_AD } from '../../util/constants';

const debug = Debug('NOWnews-admin-website: controllers:menu:page.create');

module.exports = async (req, res, next) => {

    try {
        return res.render('menu/page.create.html', {
            NEWS_TEMPLATES,
            NEWS_TEMPLATES_AD,
        });
    }
    catch(err) {
        return next(err);
    }
};
