
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:topic:action.topic.create');

module.exports = async (req, res, next) => {

    try {
        let userId = req.session.adminUser._id;
        let data = req.body;
        data.CreatedBy = userId;
        data.UpdatedBy = userId;


        let { data: topic } = await axios.post('/specialtopics', data);

        debug('createdTopic = %j', topic);

        return res.redirect('/topic');

    }
    catch(err) {
        return next(err);
    }
};
