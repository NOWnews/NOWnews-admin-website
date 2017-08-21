import Debug from 'debug';
import config from 'config';

const debug = Debug('NOWnews-admin-website: controllers:indexpage:page.create');

import moment from 'moment-timezone';

module.exports = async (req, res, next) => {

    try{
        let userId = req.session.adminUser._id;

        let results = await Promise.all([
            axios.get('/indexpage'),
            axios.get('/news?limit=40&status=RELEASE&isScheduled=false&select=title sn startedAt&noSponsored=true'),
            axios.get('/specialtopics?limit=20&select=title createdAt'),
            axios.get('/specialchannels?limit=20&select=title createdAt'),
            axios.get('/news?limit=20&status=RELEASE&type=VIDEO&isScheduled=false&select=title sn startedAt&noSponsored=true')
        ]);

        let indexpage = results[0].data;
        let predata = results[1].data;
        let pretopic = results[2].data;
        let prespecialchannel = results[3].data;
        let prevideo = results[4].data;

        predata.newsList = _.map(predata.newsList, (news, index) => {
            news.completeUrl = `/news/${news._id}`;
            news.formatStartedAt = moment.tz(news.formatStartedAt, 'Asia/Taipei').format('YYYYMMDD HH:MM');
            return news;
        });

        prevideo.newsList = _.map(prevideo.newsList, (news, index) => {
            news.completeUrl = `/news/${news._id}`;
            news.formatStartedAt = moment.tz(news.formatStartedAt, 'Asia/Taipei').format('YYYYMMDD HH:MM');
            return news;
        });

        pretopic.specialTopics = _.map(pretopic.specialTopics, (news, index) => {
            news.completeUrl = `/topic/${news._id}`;
            news.formatStartedAt = moment.tz(news.createdAt, 'Asia/Taipei').format('YYYYMMDD HH:MM');
            return news;
        });

        prespecialchannel.specialChannels = _.map(prespecialchannel.specialChannels , (news, index) => {
            news.completeUrl = `/specialchannel/${news._id}`;
            news.formatStartedAt = moment.tz(news.createdAt, 'Asia/Taipei').format('YYYYMMDD HH:MM');
            return news;
        });

        let data = {
            indexpage,
            predata,
            pretopic,
            prespecialchannel,
            prevideo
        };

        debug('indexpageList = %j', indexpage );
        return res.render('indexpage/page.create.html', data);
    }
    catch(err) {
        return next(err);
    }
};
