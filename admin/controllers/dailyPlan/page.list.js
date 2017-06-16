import moment from 'moment-timezone';
import Debug from 'debug';
import qs from 'querystring';
const debug = Debug('NOWnews-admin-website: controllers:postBoard:page.list');

module.exports = async (req, res, next) => {



    try {
        //預設startedAt是今天
        let today = moment().tz('Asia/Taipei').format('YYYY-MM-DD');
        let qsObj = qs.parse(req._parsedUrl.query);
        if(!qsObj.startedAt){
            qsObj.startedAt = today;
        }
        if(!qsObj.limit){
            qsObj.limit = 40;
        }
        let queryString = qs.stringify(qsObj);

        let { data: {dailyPlans, pageData} } = await axios.get(`/dailyPlan?${queryString}`);;

        //只取新聞部底下的中心
        let { data : departments } = await axios.get('/departments');
        departments = _.filter(departments,(department)=>{
            return department.name.indexOf("新聞部")>-1;
        });

        debug('dailyPlan = %j', dailyPlans);

        return res.render('dailyPlan/page.list.html', {
            qsObj,
            departments,
            dailyPlans,
            pageData
        });
    }
    catch(err) {
        return next(err);
    }
};
