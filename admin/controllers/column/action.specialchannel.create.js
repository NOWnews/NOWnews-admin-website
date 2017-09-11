import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:column:specialchannel:action.create');

module.exports = async (req, res, next) => {

    try {

        const userId = req.session.adminUser._id;
        let { Menu, SubMenus } = req.body;

        // Prevent it's string
        if (typeof SubMenus === 'string') {
            SubMenus = [SubMenus];
        }

        const repeatMenuIndex = SubMenus.indexOf(Menu);

        //  避免主分類重複拉到子項
        if (repeatMenuIndex !== -1) {
            SubMenus.splice(repeatMenuIndex, 1);
        }

        if (SubMenus.length === 0) {
            throw({ data: '子項不可以是空的 / 同一個分類不可同時設為主與子項' });
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
