import Debug from 'debug';
import _ from 'lodash';
const debug = Debug('NOWnews-admin-website: controllers:dailyplan:page.create');

module.exports = async (req, res, next) => {

    try {
        let { id } = req.params;
        let { data: {dailyPlan} } = await axios.get(`/dailyPlan/${id}`);;

        let { data : departments } = await axios.get('/departments');
        departments = _.filter(departments,(department)=>{
            // 新聞部的 init 資料 id 是 540000000000000000000002
            return department._id === '540000000000000000000002';
        });

        return res.render('dailyPlan/page.update.html',{
            dailyPlan,
            departments
        });
    }
    catch(err) {
        return next(err);
    }
};
