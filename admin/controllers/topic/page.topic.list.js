import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:topic:page.list');

module.exports = async (req, res, next) => {

    try{

        let userId = req.session.adminUser._id;
        let { data: topic } = await axios.get('/specialtopics');

        let topics = topic;
        debug('topicList = %j', topics );

        return res.render('topic/page.list.html', topics);
    }
    catch(err) {
        return next(err);
    }
};
