import moment from 'moment-timezone';
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:postBoard:page.list');

module.exports = async (req, res, next) => {

    try {
        let { id } = req.params;
        let { data: {dailyPlan} } = await axios.get(`/dailyPlan/${id}`);;

        // _.forEach(postBoard, (post) => {
        //     post.messages = _.map(post.messages, ( obj ) => {
        //         obj.createdAt = moment(obj.createdAt).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm');
        //         return obj;
        //     });
        // });

        debug('dailyPlan = %j', dailyPlan);

        return res.render('dailyPlan/page.one.html', {
            dailyPlan
        });
    }
    catch(err) {
        return next(err);
    }
};
