
import Debug from 'debug';
import moment from 'moment-timezone';
import { NEWS_TYPES, NEWS_STATUS, NEWS_TEMPLATES, NEWS_TEMPLATES_AD } from '../../util/constants';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.edit');
import checkSchedule from '../../util/checkSchedule.js';
module.exports = async (req, res, next) => {

    try {

        let { newsId } = req.params;

        let [
            { data: news },
            { data: { users: userList } },
            { data: menus },
            { data: newsMemos },
        ] = await Promise.all([
            axios.get(`/news/${newsId}`),
            axios.get('/users?limit=10000&isInitUser=true&sort=staffId'),
            axios.get('/menus/struction'),
            axios.get(`/newsmemo?News=${newsId}&sort=createdAt`),
        ]);

        let selectMenus = _.map( news.Menus, (menu) => {
            return menu._id;
        })

        _.forEach( menus, (menu) => {
            _.forEach( menu.child, (child) => {
                if(selectMenus.indexOf(child._id) > -1){
                    child.select = true;
                }
            });
        });

        news.Tags = _.map( news.Tags, (value) => {
            return value.name;
        })

        news.tags = news.Tags.join(',');

        // 時區設定
        news.startedAt = moment.tz(news.startedAt, 'Asia/Taipei').format('YYYY-MM-DD HH:mm');

        // Map 設定
        if ( news.location && news.location !== null ){
            let [ lng, lat ] = news.location;
            let { data: { address } } = await axios.get('/map/location', {
                params: {
                    latlng: `${lat},${lng}`
                }
            });
            news.location = address;
        }

        debug('news = %j', news);
        //是否為預約發稿
        let isScheduled = checkSchedule(news.startedAt);
        news.isScheduled = isScheduled;
        // 紀錄更新完要回去的網址
        req.session.prevUrl = req.headers.referer;

        return res.render('news/page.news.edit.html', {
            NEWS_TYPES,
            NEWS_STATUS,
            NEWS_TEMPLATES,
            NEWS_TEMPLATES_AD,
            news,
            newsMemos,
            menus,
            userList
        });

    }
    catch(err) {
        return next(err);
    }
};
