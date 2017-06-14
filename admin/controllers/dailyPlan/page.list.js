import moment from 'moment-timezone';
import Debug from 'debug';
import qs from 'querystring';
const debug = Debug('NOWnews-admin-website: controllers:postBoard:page.list');

module.exports = async (req, res, next) => {



    try {

        let today = moment().tz('Asia/Taipei').format('YYYY-MM-DD');
        let queryStringObj = qs.parse(req._parsedUrl.query);
        if(!queryStringObj.startedAt){
            queryStringObj.startedAt = today;
        }
        let date = queryStringObj.startedAt;
        let queryString = qs.stringify(queryStringObj);

        let { data: {dailyPlans, pageData} } = await axios.get(`/dailyPlan?${queryString}`);;
        // _.forEach(postBoard, (post) => {
        //     post.messages = _.map(post.messages, ( obj ) => {
        //         obj.createdAt = moment(obj.createdAt).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm');
        //         return obj;
        //     });
        // });

        debug('dailyPlan = %j', dailyPlans);

        return res.render('dailyPlan/page.list.html', {
            date,
            dailyPlans,
            pageData
        });
    }
    catch(err) {
        return next(err);
    }
};
