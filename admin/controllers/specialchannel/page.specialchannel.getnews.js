import Debug from 'debug';
import config from 'config';
import _ from 'lodash';
import moment from 'moment-timezone';
const debug = Debug('NOWnews-admin-website: controllers:page:indexpage.getnews');

module.exports = async (req, res, next) => {

    try {

        let { title, status, type }= req.query;
        let queryString = req._parsedUrl.query;

        debug('req.query = %j',req.query);

        let { data: {newsList} } = await axios.get(`/news?${queryString}&isScheduled=false`);

        debug('news = %j', newsList);

        _.map( newsList , (news)=>{
            news.formatStartedAt = moment.tz(news.formatStartedAt,'Asia/Taipei').format('YYYY-MM-DD HH:mm')
        });


        return res.json({
            newsList,
        });
    }
    catch(err) {
        return next(err);
    }
};
