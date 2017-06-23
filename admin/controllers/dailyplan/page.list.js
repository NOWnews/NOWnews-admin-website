import moment from 'moment-timezone';
import Debug from 'debug';
import qs from 'querystring';
const debug = Debug('NOWnews-admin-website: controllers:dailyplan:page.list');

module.exports = async (req, res, next) => {



    try {

        let qsObj = qs.parse(req._parsedUrl.query);

        if(qsObj.startedAt){
            qsObj.formatStartedAt = moment.tz(qsObj.startedAt, 'Asia/Taipei').format('YYYY-MM-DD');
        }
        else{
            qsObj.startedAt = moment.tz('Asia/Taipei').format('YYYY-MM-DD');
            qsObj.formatStartedAt = moment.tz('Asia/Taipei').format('YYYY-MM-DD');
        }

        if(!qsObj.limit){
            qsObj.limit = 40;
        }
        let queryString = qs.stringify(qsObj);

        let { data: {dailyPlans, pageData} } = await axios.get(`/dailyPlan?${queryString}`);;

        //只取新聞部底下的中心
        let { data : departments } = await axios.get('/departments');
        departments = _.filter(departments,(department)=>{
            return department.name.indexOf('新聞部')>-1;
        });

        let qsNoPage = qs.parse(req._parsedUrl.query);
        delete qsNoPage.page;
        qsNoPage = qs.stringify(qsNoPage);
        pageData.qsNoPage = qsNoPage?'&'+qsNoPage:'';

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
