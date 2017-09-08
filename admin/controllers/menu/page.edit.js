import Debug from 'debug';
import { MENU_TEMPLATES, TEMPLATES_AD } from '../../util/constants';
const debug = Debug('NOWnews-admin-website: controllers:menu:page.edit');

module.exports = async (req, res, next) => {

    try {

        let { menuId } = req.params;

        let { data: menu } = await axios.get(`/menus/${menuId}`);

        debug('menu = %j', menu);

        return res.render('menu/page.edit.html', {
            menu,
            TEMPLATES: MENU_TEMPLATES,
            TEMPLATES_AD
        });
    } catch(err) {
        return next(err);
    }
};
