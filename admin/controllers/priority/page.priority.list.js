import Debug from 'debug';
import moment from 'moment-timezone';
const debug = Debug('NOWnews-admin-website: controllers:priority:page.list');

module.exports = async (req, res, next) => {

    try {
        let { menuId }= req.query;
        let { data: menus } = await axios.get('menus/struction');

        if (!menuId) {
            menuId = menus[0]._id;
        }

        let today = moment();
        let endedAt = today.tz('Asia/Taipei').format('YYYY-MM-DD');
        let startedAt = today.day(-60).tz('Asia/Taipei').format('YYYY-MM-DD');

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
