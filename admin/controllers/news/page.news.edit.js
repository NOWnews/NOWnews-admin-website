
import Debug from 'debug';
import { NEWS_TYPES, NEWS_STATUS } from '../../util/constants';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.edit');

module.exports = async (req, res, next) => {

    try {

        let { newsId } = req.params;

        let { data: news } = await axios.get(`/news/${newsId}`);

        debug('news = %j', news);

        let { data: { users: userList, pageData } } = await axios.get('/users');
        let { data: menus } = await axios.get('/menus/struction');
        let { data: newsMemos } = await axios.get(`/newsmemo?News=${newsId}&sort=createdAt`);

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

        // Map 設定
        if (news.location !== null ){
            let [ lng, lat ] = news.location;
            let { data: { address } } = await axios.get( `/map/location`, {
                params: {
                    latlng: `${lat},${lng}`
                }
            });
            news.location = address;
        }

        debug('news = %j', news);

        return res.render('news/page.news.edit.html', {
            NEWS_TYPES,
            NEWS_STATUS,
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
