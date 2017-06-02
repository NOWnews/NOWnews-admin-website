import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:video:page.list');

module.exports = async (req, res, next) => {

    try {
    	let queryString = req._parsedUrl.query? '?' + req._parsedUrl.query: '';

        let userId = req.session.adminUser._id;
        let { data: {videos, pageData} } = await axios.get(`/videos${queryString}`);

        let checkUrl = (url) => {
        	let isNnUrl = url.match(/img.nownews.com/);
        	let isYtUrl = url.match(/youtube.com/);
        	let isFbUrl = url.match(/facebook.com/);
        	let isIgUrl = url.match(/instagram.com/);

        	if (isNnUrl) { return '內部'; }
        	if (isYtUrl) { return 'YOUTUBE'; }
        	if (isFbUrl) { return 'FB'; }
        	if (isIgUrl) { return 'IG'; }
        	return 'OTHER';
        };

        videos = _.map(videos, (video)=>{
        	video.videoFrom = checkUrl(video.url);
        	return video;
        });
        debug('tagsList = %j', videos );
        debug('pageData = %j', pageData );

        return res.render('video/page.list.html', {
            videos,
            pageData
        });
    }
    catch(err) {
        return next(err);
    }
};
