import moment from 'moment-timezone';
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:postBoard:action.update');

module.exports = async (req, res, next) => {

    try {

        let { id } = req.params;

        let { title, startedAt, Center, content } = req.body;

        let UpdatedBy = req.session.adminUser._id;

        let { data: dailyPlan } = await axios.put(`/dailyPlan/${id}`,
        { title, startedAt, Center, content, UpdatedBy });

        debug('dailyPlan = %j', dailyPlan);

        return res.redirect('../dailyplan');

    } catch(err) {
        return next(err);
    }

};
