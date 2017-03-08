import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:Topic:action.remove');

module.exports = async (req, res, next) => {

    try {
        let { topicId } = req.params;

        let userId = req.session.adminUser._id;
        console.log(userId,'L10')

        let data = req.body;

        data.UpdatedBy = userId;

        // let { data: topic } = await axios.delete( `/specialtopics/${topicId}`, data: );
        let { data: topic } = await axios({method: 'delete', url: `/specialtopics/${topicId}`, data: data});


        debug('removedTopic = %j', topic);

        return res.json({ topic });

    }
    catch(err) {
        return next(err);
    }
};
