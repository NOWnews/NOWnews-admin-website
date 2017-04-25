import Debug from 'debug';
import Promise from 'bluebird';
const debug = Debug('NOWnews-admin-website: controllers:priority:page.list');

module.exports = async (req, res, next) => {

    try {
        let { menuId }= req.query;

        let { data: menus } = await axios.get('menus/struction');

        if (!menuId) {
            menuId = menus[0]._id;
        }
        let { data } = await axios.get(`/scores?menuId=${menuId}`);

        debug('menus = %j', menus);
        debug('NewsByMenu = %j', data);

        return res.render('priority/page.list.html', {
            menus,
            data,
            menuId
        });

    } catch(err) {
        return next(err);
    }
};
