import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:column:specialchannel:action.create');

module.exports = async (req, res, next) => {

    try {

        const userId = req.session.adminUser._id;
        let { Menu, SubMenus } = req.body;
        const repeatMenuIndex = SubMenus.indexOf(Menu);

        //  避免主分類重複拉到子項
        if (repeatMenuIndex !== -1) {
            SubMenus.splice(repeatMenuIndex, 1);
        }

        const data = {
            Menu,
            SubMenus,
            CreatedBy: userId
        }
        
        let { data: menu } = await axios.post('/column/specialchannels', data);

        debug('createdMenu = %j', menu);

        return res.redirect('/column/specialchannel');

    }
    catch(err) {
        return next(err);
    }
};
