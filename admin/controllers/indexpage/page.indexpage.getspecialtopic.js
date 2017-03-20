import Debug from 'debug';
import config from 'config';
const debug = Debug('NOWnews-admin-website: controllers:page:indexpage.getnews');

module.exports = async (req, res, next) => {

    try {
        let baseURL = config.get('apiServer');
        let {title}= req.query;
        let { data: {specialTopics} } = await axios.get(baseURL+`/specialtopics?title=${title}`);

        debug('specialTopics = %j', specialTopics);
        return res.json({
            specialTopics,
        });
    }
    catch(err) {
        return next(err);
    }
};
