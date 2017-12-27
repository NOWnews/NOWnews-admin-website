import Debug from 'debug';
import moment from 'moment-timezone';

const debug = Debug('NOWnews-admin-website: controllers:statistics:page.categories');



module.exports = async(req, res, next) => {

    try {
        let query = req.query;

        if (!query.startedAt) {
            query.startedAt = moment.tz('Asia/Taipei').format('YYYY-MM-DD');
            query.endedAt = moment.tz('Asia/Taipei').format('YYYY-MM-DD');
        }

        let queryString = req._parsedUrl.query;

        let {
            data: {
                categoiresNewsInfo,
                allCategoriesNewsTotalNumber,
                allCategoriesNewsTotalPageviews
            }
        } = await axios.get(`/statistics/categories?${queryString}`);

        return res.render('statistics/page.categories.html', {
            categoiresNewsInfo,
            allCategoriesNewsTotalNumber,
            allCategoriesNewsTotalPageviews,
            query
        });
    } catch (err) {
        return next(err);
    }
};