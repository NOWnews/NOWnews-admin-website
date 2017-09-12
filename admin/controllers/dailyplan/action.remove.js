import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:dailyplan:action.remove');

module.exports = async (req, res, next) => {
    try {

        let { id } = req.params;
        let UpdatedBy = req.session.adminUser._id;
        let data = {UpdatedBy};

        let { data: removedDailyPlan } = await axios.delete( `/dailyPlan/${id}`, { data });

        debug('removedDailyPlan = %j', removedDailyPlan);

        return res.json({ removedDailyPlan });

    } catch(err) {
        return next(err);
    }

};
