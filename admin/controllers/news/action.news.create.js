
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:action.news.create');

import htmlToText from '../../util/htmlToText';

module.exports = async (req, res, next) => {

    try {
        let userId = req.session.adminUser._id;
        let data = req.body;

        data.CreatedBy = userId;
        data.UpdatedBy = userId;
        // 摘要大概是 120 - 150 字
        data.summary = htmlToText(data.content).slice(0,135);

        // 暫時還沒有圖片功能
        delete data.MainPhoto;

        let { data: news } = await axios.post('/news', data);

        debug('createdNews = %j', news);

        return res.redirect(`/news/${news._id}`);
    }
    catch(err) {
        return next(err);
    }
};
