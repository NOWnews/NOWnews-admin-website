
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:action.news.create');

import htmlToText from '../../util/htmlToText';

module.exports = async (req, res, next) => {

    try {
        let userId = req.session.adminUser._id;
        let data = req.body;

        data.CreatedBy = userId;
        data.UpdatedBy = userId;

        data.isDeliver = data.isDeliver ? true : false ;
        data.isSponsored = data.isSponsored ? true : false ;
        data.isAdult = data.isAdult ? true : false ;
        // 摘要大概是 120 - 150 字
        data.summary = htmlToText(data.content).slice(0,135);

        // MainPhoto 是字串就不傳
        if (data.MainPhoto === '') {
            delete data.MainPhoto;
        }

        // Tags 的處理
        let tags;
        if (data.tags !== ''){
            data.tags = {
                tags: data.tags.split(','),
                type: 'NEWS',
                CreatedBy: userId
            }
            tags = await axios.post('/tags', data.tags);
            data.Tags = _.map(tags.data, (value) => {
                return value.id;
            });
        }

        // Map 設定
        if (data.location !== ''){
            let { data: { location } } = await axios.get( `/map/location`, {
                params: {
                    address: data.location
                }
            });
            let [ lng, lat ] = location;
            data.location = [ lng, lat ];
        }
        let { data: news } = await axios.post('/news', data);

        debug('createdNews = %j', news);

        return res.redirect(`/news/${news._id}`);
    }
    catch(err) {
        return next(err);
    }
};
