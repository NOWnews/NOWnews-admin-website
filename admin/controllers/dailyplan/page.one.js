import moment from 'moment-timezone';
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:dailyplan:page.list');

module.exports = async (req, res, next) => {

    try {
        let { id } = req.params;
        let { data: {dailyPlan} } = await axios.get(`/dailyPlan/${id}`);;
        let currentUser = req.session.adminUser;

        debug('dailyPlan = %j', dailyPlan);

        return res.render('dailyPlan/page.one.html', {
            currentUser,
            dailyPlan
        });
    }
    catch(err) {
        return next(err);
    }
};
