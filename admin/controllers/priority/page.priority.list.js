import Debug from 'debug';
import moment from 'moment-timezone';
const debug = Debug('NOWnews-admin-website: controllers:priority:page.list');

module.exports = async (req, res, next) => {

    try {
        let { menuId } = req.query;

        let { data: menus } = await axios.get('menus/struction');

        if (!menuId) {
            menuId = menus[0]._id;
        }

        let { data:menu } = await axios.get(`menus/${menuId}`);

        let defaultDays = menu.template === 'DEFAULT' ? -1 : -1095;

        let today = moment.tz('Asia/Taipei');
        let endedAt = today.format('YYYY-MM-DD');
        let startedAt = today.add(defaultDays,'day').format('YYYY-MM-DD');

        debug('endedAt = %s', endedAt );
        debug('startedAt = %s', startedAt );

        let { data } = await axios.get(`/scores?menuId=${menuId}&endedAt=${endedAt}&startedAt=${startedAt}`);

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
