import Debug from 'debug';
import moment from 'moment-timezone';

const debug = Debug('NOWnews-admin-website: controllers:statistics:page.centersList');



module.exports = async (req, res, next) => {

    try{
        let query = req.query;

        if (!query.startedAt) {
            query.startedAt = moment().tz('Asia/Taipei').format('YYYY-MM-DD');
            query.endedAt = moment().tz('Asia/Taipei').format('YYYY-MM-DD');
        }

        let queryString = req._parsedUrl.query;

        let userId = req.session.adminUser._id;
        let { data: centersList } = await axios.get(`/statistics/centers?${queryString}`);

        let centers = centersList.centersInfo;
        debug('centersList = %j', centers );

        return res.render('statistics/page.centers.html', {
            centers,
            query
        });
    }
    catch(err) {
        return next(err);
    }
};

