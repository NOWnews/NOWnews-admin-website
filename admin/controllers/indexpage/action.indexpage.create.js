
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:indexPage:action.indexPage.create');

module.exports = async (req, res, next) => {

    try {
        let userId = req.session.adminUser._id;
        if(req.body.type === 'CAROUSELS') {

            let carousels = [];

            if(_.isArray(req.body.carousels)) {
                carousels = req.body.carousels;
            }

            if(req.body.carousels && !_.isArray(req.body.carousels)) {
                carousels = [ req.body.carousels ];
            }

            let data = {
                carousels,
                UpdatedBy: userId
            }
            let { data: indexpage } = await axios.put(`/indexpage/carousels/`, data);

            debug('createdIndexPageCarouselsData = %j', indexpage);

        }

        if(req.body.type === 'SPECIALTOPICS') {

            let specialTopics = [];

            if(_.isArray(req.body.specialTopics)) {
                specialTopics = req.body.specialTopics;
            }

            if(req.body.specialTopics && !_.isArray(req.body.specialTopics)) {
                specialTopics = [ req.body.specialTopics ];
            }

            let data = {
                specialTopics,
                UpdatedBy: userId
            }
            let { data: indexpage } = await axios.put(`/indexpage/specialTopics/`, data);

            debug('createdIndexPageSpecialTopicsData = %j', indexpage);

        }

        if(req.body.type === 'SPECIALCHANNELS') {

            let specialChannels = [];

            if(_.isArray(req.body.specialChannels)) {
                specialChannels = req.body.specialChannels;
            }

            if(req.body.specialChannels && !_.isArray(req.body.specialChannels)) {
                specialChannels = [ req.body.specialChannels ];
            }

            let data = {
                specialChannels,
                UpdatedBy: userId
            }
            let { data: indexpage } = await axios.put(`/indexpage/specialchannels/`, data);

            debug('createdIndexPageSpecialChannelsData = %j', indexpage);

        }

        if(req.body.type === 'VIDEOS') {
            let videos = [];

            if(_.isArray(req.body.videos)) {
                videos = req.body.videos;
            }

            if(req.body.videos && !_.isArray(req.body.videos)) {
                videos = [ req.body.videos ];
            }

            let data = {
                videos,
                UpdatedBy: userId
            }
            let { data: indexpage } = await axios.put(`/indexpage/videos/`, data);

            debug('createdIndexPageVideosData = %j', indexpage);

        }

        return res.redirect('/indexpage/create');

    }
    catch(err) {
        return next(err);
    }
};
