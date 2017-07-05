import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:topic:page.list');
import config from 'config';
module.exports = async (req, res, next) => {

    try{
        let checkPath = '/topic';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);

        let userId = req.session.adminUser._id;
        let { data: topic } = await axios.get('/specialtopics');

        let topics = topic;
        topic.officialUrl = config.get('officialUrl');

        debug('topicList = %j', topics );

        return res.render('topic/page.list.html',topics);
    }
    catch(err) {
        return next(err);
    }
};
