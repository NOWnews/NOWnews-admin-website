import Debug from 'debug';
import moment from 'moment-timezone';
const debug = Debug('NOWnews-admin-website: controllers:dailyplan:action.create');

module.exports = async (req, res, next) => {

    try {

        let { title, startedAt, Center, content,  } = req.body;
        startedAt = moment.tz(startedAt,'YYYY-MM-DDTHH:mm:ss','Asia/Taipei');
        let CreatedBy = req.session.adminUser._id;
        let { data: dailyPlan } = await axios.post('/dailyPlan',
            { title, startedAt, Center, content, CreatedBy });

        debug('dailyPlan = %j', dailyPlan);

        return res.redirect('../dailyplan');

    } catch(err) {
        return next(err);
    }
};
