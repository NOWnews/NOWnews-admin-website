import moment from 'moment-timezone';
import Debug from 'debug';
import qs from 'querystring';
import _ from  'lodash';
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
            qsObj.limit = 1000;
        }
        let queryString = qs.stringify(qsObj);

        //只取新聞部底下的中心
        let { data : departments } = await axios.get('/departments');
        departments = _.filter(departments,(department)=>{
            return department.name.indexOf('新聞部')>-1;
        });
        let newsDepartmentId = departments[0] ? departments[0]._id : '';
        let centerId = qsObj.Center ? qsObj.Center : '';
        let [
            { data : { dailyPlans } },
            { data : { users }}
        ] = await Promise.all([
            axios.get(`/dailyPlan?${queryString}`),
            axios.get(`/users?Department=${newsDepartmentId}&Center=${centerId}&limit=1000`)
        ]);

        dailyPlans = _.groupBy(dailyPlans,"CreatedBy._id");
        users = _.forEach(users, ( user )=>{
            user.dailyPlans = dailyPlans[user._id] || [];
        });

        debug('dailyPlan = %j', dailyPlans);

        return res.render('dailyPlan/page.list.html', {
            users,
            qsObj,
            departments
        });
    }
    catch(err) {
        return next(err);
    }
};
