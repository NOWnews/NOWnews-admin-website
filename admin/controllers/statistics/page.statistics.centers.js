import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:statistics:page.centersList');

module.exports = async (req, res, next) => {

    try{
        let query = req.query;
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

