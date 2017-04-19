import Debug from 'debug';
import Promise from 'bluebird';
const debug = Debug('NOWnews-admin-website: controllers:priority:page.list');

module.exports = async (req, res, next) => {

    try {
        let { menuId }= req.query;

        let { data: menus } = await axios.get('menus/struction');
        let { data } = await axios.get(`/scores?menuId=${menus[0]._id}`);

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
