import Debug from 'debug';
import moment from 'moment';
const debug = Debug('NOWnews-admin-website: controllers:dailyplan:action.create');

module.exports = async (req, res, next) => {

    try {

        let { title, startedAt, Center, content,  } = req.body;
        startedAt = moment(startedAt).valueOf();
        let CreatedBy = req.session.adminUser._id;
        let { data: dailyPlan } = await axios.post('/dailyPlan',
            { title, startedAt, Center, content, CreatedBy });

        debug('dailyPlan = %j', dailyPlan);

        return res.redirect('../dailyplan');

    } catch(err) {
        return next(err);
    }
};
