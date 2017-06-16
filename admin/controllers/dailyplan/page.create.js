import Debug from 'debug';
import _ from 'lodash';
const debug = Debug('NOWnews-admin-website: controllers:dailyplan:page.create');

module.exports = async (req, res, next) => {

    try {
        let { data : departments } = await axios.get('/departments');
        departments = _.filter(departments,(department)=>{
            return department.name.indexOf("新聞部")>-1;
        });
        return res.render('dailyPlan/page.create.html',{
            departments
        });
    }
    catch(err) {
        return next(err);
    }
};
