import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:menu:page.list');

module.exports = async (req, res, next) => {

    try{
        let userId = req.session.adminUser._id;
        let { data: menus } = await axios.get('/menus');

        let pageData = menus.pageData;

        debug('menusList = %j', menus );

        return res.render('menu/page.list.html', {
            menus
        });
    }
    catch(err) {
        return next(err);
    }
};