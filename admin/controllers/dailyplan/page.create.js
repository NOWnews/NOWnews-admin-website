import Debug from 'debug';
import _ from 'lodash';
import moment from 'moment-timezone';
const debug = Debug('NOWnews-admin-website: controllers:dailyplan:page.create');

module.exports = async (req, res, next) => {

    try {
        let { data : departments } = await axios.get('/departments');
        let taipeiTimeNow = moment.tz('Asia/Taipei').format('YYYY-MM-DDTHH:mm');
        departments = _.filter(departments,(department)=>{
            // 新聞部的 init 資料 id 是 540000000000000000000002
            return department._id === '540000000000000000000002';
        });
        return res.render('dailyPlan/page.create.html',{
            taipeiTimeNow,
            departments
        });
    }
    catch(err) {
        return next(err);
    }
};
