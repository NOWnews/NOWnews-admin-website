import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:action.me.update');

module.exports = async (req, res, next) => {

    try {

        let { avatarUrl, originAvatarId, ...data} = req.body;

        let userId = req.session.adminUser._id;

        data.UpdatedBy = userId;

        if (data.defaultAuthor === "") {
            data.defaultAuthor = null ;
        }

        // 清除舊的圖片
        if (originAvatarId && originAvatarId !== data.Avatar) {
            await axios.delete(`/images/${originAvatarId}/realRemove`);
        }

        let { data: user } = await axios.put(`/users/${userId}`, data);

        debug('updatedUser = %j', user);

        req.session.adminUser.avatarUrl = avatarUrl;

        if (!req.session.adminUser.defaultSettings) {
            req.session.adminUser.defaultSettings = {};
        }

        req.session.adminUser.defaultSettings.Menu = data.defaultMenu;

        req.session.adminUser.defaultSettings.Author = data.defaultAuthor;

        req.session.adminUser.defaultSettings.newsBy = data.defaultNewsBy;

        // 如果沒有前一頁，就在同一頁
        let redirectUrl = req.session.prevUrl || 'back';

        return res.redirect(redirectUrl);

    } catch(err) {
        return next(err);
    }
};
