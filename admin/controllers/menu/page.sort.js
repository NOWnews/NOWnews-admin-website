import Debug from 'debug';
import { MENU_TEMPLATES } from '../../util/constants';
const debug = Debug('NOWnews-admin-website: controllers:menu:page.sort');

module.exports = async (req, res, next) => {

    try {
        let userId = req.session.adminUser._id;
        let { data: struction } = await axios.get('/menus/struction');

        debug('menuSort = %j', struction);

        return res.render('menu/page.sort.html', {
            struction,
            TEMPLATES: MENU_TEMPLATES
        });
    }
    catch(err) {
        return next(err);
    }
};
