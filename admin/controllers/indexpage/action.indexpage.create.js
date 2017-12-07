
import Debug from 'debug';
import config from 'config';

const debug = Debug('NOWnews-admin-website: controllers:indexPage:action.indexPage.create');

module.exports = async (req, res, next) => {

    try {

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
            let { data: indexpage } = await axios.put('/indexpage/carousels/', data);

            debug('createdIndexPageCarouselsData = %j', indexpage);
        }

        if(type === 'ADD_CAROUSELS') {
            let addCarousels = req.body['addCarousels'] || req.body['addCarousels[]'];

            let formatCarousels = [];

            if (addCarousels) {
                formatCarousels = _.isArray(addCarousels) ? addCarousels : [ addCarousels ];
            }

            let data = {
                addCarousels: formatCarousels,
                hideCarousels: [],
                UpdatedAddBy: userId
            }
            let { data: indexpage } = await axios.put('/indexpage/addCarousels/', data);

            debug('createdIndexPageCarouselsData = %j', indexpage);

            return res.json(indexpage);
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
            let { data: indexpage } = await axios.put('/indexpage/specialTopics/', data);

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
            let { data: indexpage } = await axios.put('/indexpage/specialchannels/', data);

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
            let { data: indexpage } = await axios.put('/indexpage/videos/', data);

            debug('createdIndexPageVideosData = %j', indexpage);

        }

        return res.redirect('/indexpage/create');

    }
    catch(err) {
        return next(err);
    }
};
