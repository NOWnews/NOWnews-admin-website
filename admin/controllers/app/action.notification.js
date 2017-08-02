import Debug from 'debug';
const debug = Debug('NOWnews-admin-website:controllers:app:action.notification');

module.exports = async (req, res, next) => {
    try{

        let { os } = req.body;

        let options = {
            url: req.body.newsUrl,
            title: req.body.newsTitle,
            summary: req.body.newsSummary,
            image: req.body.newsImage
        };
        debug('options = %j', options);

        if(os === 'IOS') {
            let { data: result } = await axios.post('/app/notification/ios', options);
        }

        if(os === 'ANDROID') {
            let { data: result } = await axios.post('/app/notification/android', options);
        }

        if(os === 'WEB') {
            let { data: result } = await axios.post('/app/notification/web', options);
        }

        return res.redirect('/app/notification');
    }
    catch(err) {
        return next(err);
    }
};