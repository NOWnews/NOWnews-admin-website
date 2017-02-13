import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:menu:action.update');

module.exports = async (req, res, next) => {

    try {

        let { menuId } = req.params;
        let userId = req.session.adminUser._id;
        let data = req.body;

        data.lastUpdatedBy = userId;

        debug('req.body = %j', data);

        let { data: menu } = await axios.put(`/menus/${menuId}`, data);

        debug('updatedMenu = %j', menu);

        return res.redirect(`/menu/${menuId}`);
    }
    catch(err) {
        return next(err);
    }
};
