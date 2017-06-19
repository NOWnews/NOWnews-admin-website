import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:dailyplan:action.create');

module.exports = async (req, res, next) => {

    try {

        let { title, startedAt, Center, content,  } = req.body;
        let CreatedBy = req.session.adminUser._id;
        let { data: dailyPlan } = await axios.post('/dailyPlan',
            { title, startedAt, Center, content, CreatedBy });

        debug('dailyPlan = %j', dailyPlan);

        return res.redirect('../dailyplan');

    } catch(err) {
        return next(err);
    }
};
