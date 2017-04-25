import Debug from 'debug';
import config from 'config';
const debug = Debug('NOWnews-admin-website: controllers:page:indexpage.getnews');

module.exports = async (req, res, next) => {

    try {
        let {title}= req.query;
        let { data: {specialTopics} } = await axios.get(`/specialtopics?title=${encodeURIComponent(title)}`);

        debug('specialTopics = %j', specialTopics);
        return res.json({
            specialTopics,
        });
    }
    catch(err) {
        return next(err);
    }
};
