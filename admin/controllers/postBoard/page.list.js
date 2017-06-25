import moment from 'moment-timezone';
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:postBoard:page.list');

module.exports = async (req, res, next) => {

    try {

        let { data: {postBoard, pageData} } = await axios.get('/postBoard');;

        _.forEach(postBoard, (post) => {
            post.messages = _.map(post.messages, ( obj ) => {
                obj.createdAt = moment.tz(obj.createdAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm');
                return obj;
            });
        });

        debug('postBoard = %j', postBoard);

        return res.render('postBoard/page.list.html', {
            postBoard,
            pageData
        });
    }
    catch(err) {
        return next(err);
    }
};
