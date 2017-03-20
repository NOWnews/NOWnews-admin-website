
import Debug from 'debug';
import config from 'config';

const debug = Debug('NOWnews-admin-website: controllers:indexPage:action.indexPage.create');

module.exports = async (req, res, next) => {

    try {

        let baseURL = 'http://localhost:10000';
        let userId = req.session.adminUser._id;
        let { type, carousels, specialTopics, specialChannels, videos } = req.body;

        if(type === 'CAROUSELS') {

            let formatCarousels = [];

            if (carousels) {
                formatCarousels = _.isArray(carousels) ? carousels : [ carousels ];
            }

            let data = {
                carousels: formatCarousels,
                UpdatedBy: userId
            }
            let { data: indexpage } = await axios.put(baseURL+`/indexpage/carousels/`, data);

            debug('createdIndexPageCarouselsData = %j', indexpage);

        }

        if(type === 'SPECIALTOPICS') {

            let formatSpecialTopics = [];

            if (specialTopics) {
                formatSpecialTopics = _.isArray(specialTopics) ? specialTopics : [ specialTopics ];
            }

            let data = {
                specialTopics: formatSpecialTopics,
                UpdatedBy: userId
            }
            let { data: indexpage } = await axios.put(baseURL+`/indexpage/specialTopics/`, data);

            debug('createdIndexPageSpecialTopicsData = %j', indexpage);

        }

        if(type === 'SPECIALCHANNELS') {

            let formatSpecialChannels = [];

            if (specialChannels) {
                formatSpecialChannels = _.isArray(specialChannels) ? specialChannels : [ specialChannels ];
            }

            let data = {
                specialChannels: formatSpecialChannels,
                UpdatedBy: userId
            }
            let { data: indexpage } = await axios.put(baseURL+`/indexpage/specialchannels/`, data);

            debug('createdIndexPageSpecialchannelsData = %j', indexpage);

        }

        if(type === 'VIDEOS') {

            let formatVideos = [];

            if (videos) {
                formatVideos = _.isArray(videos) ? videos : [ videos ];
            }

            let data = {
                videos: formatVideos,
                UpdatedBy: userId
            }
            let { data: indexpage } = await axios.put(baseURL+`/indexpage/videos/`, data);

            debug('createdIndexPageVideosData = %j', indexpage);

        }

        return res.redirect('/indexpage/create');

    }
    catch(err) {
        return next(err);
    }
};
