import Debug from 'debug';
const debug = Debug('NOWnews-admin-website:controllers:app:action.notification');

module.exports = async (req, res, next) => {
    try{
        const CreatedBy = req.session.adminUser._id;
        const reqBody = req.body;
        const NewsId = reqBody.NewsId === '' ? null : reqBody.NewsId;
        let { os } = reqBody;
        const osArray = (typeof os === 'STRING') ? [os] : os;
        const options = {
            url: reqBody.newsUrl,
            title: reqBody.newsTitle,
            summary: reqBody.newsSummary,
            image: reqBody.newsImage
        };
        let notificationResult = [];
        debug('options = %j', options);


        // faild, successd
        if(osArray.indexOf('IOS') > -1) {
            let { data: result } = await axios.post('/app/notification/ios', options);
            notificationResult.push({
                NewsId,
                CreatedBy,
                os: 'IOS',
                successCount: result.successd,
                expectCount: result.successd + result.faild,
                ...options
            });
        }

        if(osArray.indexOf('ANDROID') > -1) {
            let { data: result } = await axios.post('/app/notification/android', options);
            notificationResult.push({
                NewsId,
                CreatedBy,
                os: 'ANDROID',
                successCount: result.successd,
                expectCount: result.successd + result.faild,
                ...options
            });
        }

        if(osArray.indexOf('WEB') > -1) {
            let { data: result } = await axios.post('/app/notification/web', options);
            notificationResult.push({
                NewsId,
                CreatedBy,
                os: 'WEB',
                successCount: result.successd,
                expectCount: result.successd + result.faild,
                ...options
            });
        }

        await axios.post('/notificationLog', notificationResult);

        return res.redirect('/app/notification');
    }
    catch(err) {
        return next(err);
    }
};
