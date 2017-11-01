import Debug from 'debug';
const debug = Debug('NOWnews-admin-website:controllers:app:page.notificationLog');

module.exports = async (req, res, next) => {
    try{
        const qs = req.query;
        const queryString = req._parsedUrl.query;
        const result = await axios.get(`/notificationLog?${queryString}`);
        const { notificationLogs, pageData } = result.data;
        return res.render('app/page.notificationLog.html', {
            notificationLogs,
            pageData,
            OSs: ['IOS', 'ANDROID', 'WEB'],
            qs
        });
    }
    catch (err) {
        return next(err);
    }
};
