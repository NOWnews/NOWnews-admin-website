import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:topic:action.update');

module.exports = async (req, res, next) => {

    try {

        let { topicId } = req.params;
        let userId = req.session.adminUser._id;
        let data = req.body;

        data.UpdatedBy = userId;

        debug('req.body = %j', data);
        console.log(data,'L15');
        let { data: topic } = await axios.put(`/specialtopics/${topicId}`, data);

        debug('updatedTopic = %j', topic);

        return res.redirect(`/topic/${topicId}`);
    }
    catch(err) {
        return next(err);
    }
};
