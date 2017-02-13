import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:tags:action.create');

module.exports = async (req, res, next) => {

    try {

        let userId = req.session.adminUser._id;
        let data = req.body;

        data.isExternal = data.isExternal ? true: false;
        data.CreatedBy = userId;

        // 暫時設定永遠開啟
        data.isPermanented = true;
        // 建立的權重都為 0
        data.weight = 0;

        let { data: tags } = await axios.post('/tags', data);

        debug('createdTags = %j', tags);

        return res.redirect(`/tags/${tags._id}`);

    }
    catch(err) {
        return next(err);
    }
};
