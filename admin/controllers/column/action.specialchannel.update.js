import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:column:specialchannel:action.update');

module.exports = async (req, res, next) => {

    try {

        let { columnId } = req.params;
        let userId = req.session.adminUser._id;
        let { Menu, SubMenus } = req.body;

        const repeatMenuIndex = SubMenus.indexOf(Menu);

        //  避免主分類重複拉到子項
        if (repeatMenuIndex !== -1) {
            SubMenus.splice(repeatMenuIndex, 1);
        }

        const data = {
            Menu,
            SubMenus,
            UpdatedBy: userId
        }

        debug('req.body = %j', data);

        let { data: column } = await axios.put(`/column/specialchannels/${columnId}`, data);

        debug('updatedColumn = %j', column);

        return res.redirect(`/column/specialchannel/${columnId}`);
    }
    catch(err) {
        return next(err);
    }
};
