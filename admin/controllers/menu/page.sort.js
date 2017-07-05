import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:menu:page.sort');

module.exports = async (req, res, next) => {

    try {
        let checkPath = '/menu/sort';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);

        let userId = req.session.adminUser._id;
        let { data: struction } = await axios.get('/menus/struction');

        debug('menuSort = %j', struction );

        return res.render('menu/page.sort.html', {
            struction
        });
    }
    catch(err) {
        return next(err);
    }
};
