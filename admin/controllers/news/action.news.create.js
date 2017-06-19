
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:action.news.create');

import htmlToText from '../../util/htmlToText';

module.exports = async (req, res, next) => {

    try {
        let userId = req.session.adminUser._id;
        let { newsMemoContent, ...data } = req.body;
        let newsStatus = data.status.toLowerCase();
        let redirectUrl = '/news/myList';

        debug('req.body = %j', req.body);

        data.CreatedBy = userId;
        data.UpdatedBy = userId;

        data.isDeliver = data.isDeliver ? true : false ;
        data.isSponsored = data.isSponsored ? true : false ;
        data.isAdult = data.isAdult ? true : false ;
        data.title = data.mainTitle;
        // 摘要大概是 120 - 150 字
        data.summary = htmlToText(data.content).slice(0,135);

        // news 如果是圖片新聞 就做 Photos 的處理
        if (data.type === 'PHOTO') {
            data.Photos = data['Photos[]'];
            data.MainPhoto = data.MainPhoto ? data.MainPhoto : data.Photos[0];
            delete data['Photos[]'];
        }
        // MainPhoto 是字串就不傳
        if (data.MainPhoto === '') {
            data.MainPhoto = null;
        }
        // news 如果不是影音新聞 且 MainVideo 是字串就不傳
        if (data.type !== 'VIDEO' || data.MainVideo === '') {
            data.MainVideo = null;
        }

        // news 如果不是業配文，刪掉這兩個業務欄位
        if (!data.isSponsored) {
            data.traceCode = null;
            data.freeContent = null;
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

        if (data.location === '') {
            data.location = null;
        }

        // 發稿狀態
        switch (newsStatus) {
            case 'draft':
                delete data.LastReviewer;
                break;
            case 'review':
                redirectUrl = '/news/reviewList';
                break;
            case 'release':
                // TODO
                break;
            case 'close':
                delete data.LastReviewer;
                break;
        }

        debug('FinalCreatedNewsData = %j', data);

        let { data: news } = await axios.post('/news', data);

        if (newsMemoContent.trim() !== '') {
            let { data: newsMemo } = await axios.post('/newsmemo', {
                News: news._id,
                content: newsMemoContent,
                CreatedBy: userId,
            });
            debug('createdNewsMemo = %j', newsMemo);
        }

        debug('createdNews = %j', news);

        return res.redirect(redirectUrl);
    }
    catch(err) {
        return next(err);
    }
};
