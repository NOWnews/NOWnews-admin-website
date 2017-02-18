import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:action.news.update');

import htmlToText from '../../util/htmlToText';

module.exports = async (req, res, next) => {

    try {
        let { newsId } = req.params;
        let userId = req.session.adminUser._id;
        let data = req.body;

        debug('req.body = %j', data);

        data.isDeliver = data.isDeliver ? true : false ;
        data.isSponsored = data.isSponsored ? true : false ;
        data.isAdult = data.isAdult ? true : false ;

        // 摘要大概是 120 - 150 字
        data.summary = htmlToText(data.content).slice(0,135);

        data.UpdatedBy = userId;

        // Tags 的處理
        let tags;
        if (data.tags !== ''){
            data.tags = {
                tags: data.tags.split(','),
                type: 'NEWS',
                CreatedBy: userId
            }
            tags = await axios.post('/tags', data.tags);
        }

        data.Tags = _.map(tags.data, (value) => {
            return value.id;
        });

        let newsStatus = data.status.toLowerCase();
        let { data: news } = await axios.put(`/news/${newsId}/${newsStatus}`, data);

        debug('updatedNews = %j', news);

        return res.redirect(`/news/${newsId}`);
    }
    catch(err) {
        return next(err);
    }
};
