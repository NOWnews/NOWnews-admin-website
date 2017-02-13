import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:menu:action.remove');

module.exports = async (req, res, next) => {

    try {
        let { menuId } = req.params;

        let { data: menu } = await axios.delete( `/menus/${menuId}` );

        debug('removedMenu = %j', menu);

        return res.json({ menu });

    }
    catch(err) {
        return next(err);
    }
};
