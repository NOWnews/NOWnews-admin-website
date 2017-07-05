import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:statistics:page.center');

module.exports = async (req, res, next) => {

    try {
        let checkPath = '/statistics/centers';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);

        let query = req.query;
        let queryString = req._parsedUrl.query;

        let url = `statistics/centers/${req.params.id}?${queryString}`;
        let { data: center } = await axios.get(url);

        debug('statisticscenter = %j', center);

        return res.render('statistics/page.center.html', {
            center,
            query
        });

    } catch(err) {
        return next(err);
    }
};
