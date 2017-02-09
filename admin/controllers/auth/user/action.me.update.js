import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:user:action.me.update');

module.exports = async (req, res, next) => {

    try {

        let { avatarUrl, originAvatarId, ...data} = req.body;

        let userId = req.session.adminUser._id;

        data.UpdatedBy = userId;

        // 清除舊的圖片
        if (originAvatarId && originAvatarId !== data.Avatar) {
            await axios.delete(`/images/${originAvatarId}/realRemove`);
        }

        let { data: user } = await axios.put(`/users/${userId}`, data);

        debug('updatedUser = %j', user);

        req.session.adminUser.Avatar.url = avatarUrl;

        return res.redirect(`/auth/me`);

    } catch(err) {
        return next(err);
    }
};
