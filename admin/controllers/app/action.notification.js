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

        const osArray = (typeof os === 'STRING') ? [os] : os;

        if(osArray.indexOf('IOS') > -1) {
            let { data: result } = await axios.post('/app/notification/ios', options);
        }

        if(osArray.indexOf('ANDROID') > -1) {
            let { data: result } = await axios.post('/app/notification/android', options);
        }

        if(osArray.indexOf('WEB') > -1) {
            let { data: result } = await axios.post('/app/notification/web', options);
        }

        return res.redirect('/app/notification');
    }
    catch(err) {
        return next(err);
    }
};