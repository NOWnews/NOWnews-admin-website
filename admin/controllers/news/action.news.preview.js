import config from 'config';
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:news:action.news.preview');

module.exports = async (req, res, next) => {

    try {
        let officialUrl = config.get('officialUrl');
        let soureceTags = req.body.Tags === '' ? [] : req.body.Tags.split(',');

        // preview 格式
        let previewData = {
            startedAt: req.body.startedAt,
            createdAt: req.body.createdAt,
            title: req.body.title,
            MainMenu: {
                name: req.body.MainMenu,
            },
            type: req.body.type,
            newsBy: req.body.newsBy,
            MainPhoto: {
                url: req.body.MainPhotoUrl,
                width: req.body.MainPhotoWidth,
                desc: req.body.MainPhotoDesc
            },
            MainVideo: {
                url: req.body.MainVideoUrl,
                desc: req.body.MainVideoDesc
            },
            Photos: req.body.Photos ? JSON.parse(req.body.Photos) : null,
            content: req.body.content,
            traceCode: req.body.traceCode,
            freeContent: req.body.freeContent,
            Tags: _.map(soureceTags, (tag, index) => { return {sn: index, name: tag}; }),
        };

        if (previewData.type === 'NEWS'){
            delete previewData.MainVideo;
            delete previewData.Photos;
        }

        if (previewData.type === 'VIDEO'){
            delete previewData.Photos;
        }

        if (previewData.type === 'PHOTO'){
            delete previewData.MainVideo;
            let firstPhoto = previewData.Photos.shift()
            previewData.MainPhoto = {
                url: firstPhoto.url,
                width: 970,
                desc: firstPhoto.desc
            };
        }

        let { data: { redisKey } } = await axios.post('/previews', previewData);

        debug('redisKey = %j', redisKey);

        return res.json({
            previewUrl: `${officialUrl}/preview/${redisKey}`
        });
    }
    catch(err) {
        return next(err);
    }
};
