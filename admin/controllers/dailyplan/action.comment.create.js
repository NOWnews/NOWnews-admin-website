import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:dailyPlan:action.comment.create');

module.exports = async (req, res, next) => {

    try {

        let { id } = req.params;

        let { content } = req.body;
        let createdBy = req.session.adminUser._id;
        let name = req.session.adminUser.name;

        let { data: dailyPlan } = await axios.post(`/dailyplan/${id}/comment`, { content,name, createdBy });

        debug('dailyPlan = %j', dailyPlan);

        return res.redirect(`/dailyplan/view/${id}`);

    } catch(err) {
        return next(err);
    }

};
