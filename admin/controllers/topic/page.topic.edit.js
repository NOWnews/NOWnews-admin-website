import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:topic:page.edit');

module.exports = async (req, res, next) => {

    try {
        let { topicId } = req.params;

        let { data: topic } = await axios.get(`/specialtopics/${topicId}`);

        debug('topic = %j', topic);

        return res.render('topic/page.edit.html', {
            topic
        });
    }
    catch(err) {
        return next(err);
    }
};
