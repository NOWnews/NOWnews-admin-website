import moment from 'moment-timezone';
import Debug from 'debug';
import qs from 'querystring';
const debug = Debug('NOWnews-admin-website: controllers:postBoard:page.list');

module.exports = async (req, res, next) => {



    try {
        //預設startedAt是今天
        let today = moment().tz('Asia/Taipei').format('YYYY-MM-DD');
        let queryStringObj = qs.parse(req._parsedUrl.query);
        if(!queryStringObj.startedAt){
            queryStringObj.startedAt = today;
        }
        if(!queryStringObj.limit){
            queryStringObj.limit = 40;
        }
        let date = queryStringObj.startedAt;
        let queryString = qs.stringify(queryStringObj);
        let query = req.query;

        let { data: {dailyPlans, pageData} } = await axios.get(`/dailyPlan?${queryString}`);;

        let { data : departments } = await axios.get('/departments');
        departments = _.filter(departments,(department)=>{
            return department.name.indexOf("新聞部")>-1;
        });
        // _.forEach(postBoard, (post) => {
        //     post.messages = _.map(post.messages, ( obj ) => {
        //         obj.createdAt = moment(obj.createdAt).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm');
        //         return obj;
        //     });
        // });

        debug('dailyPlan = %j', dailyPlans);

        return res.render('dailyPlan/page.list.html', {
            query,
            date,
            departments,
            dailyPlans,
            pageData
        });
    }
    catch(err) {
        return next(err);
    }
};
