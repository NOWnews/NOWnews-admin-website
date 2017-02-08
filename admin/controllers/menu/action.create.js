import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:menu:action.create');

module.exports = async (req, res, next) => {

    try {

        let userId = req.session.adminUser._id;
        let data = req.body;

        let { data: menu } = await axios.post('/menu', data);

        debug('createdMenu = %j', menu);

        return res.redirect(`/menu/${menu._id}`);

    }
    catch(err) {
        return next(err);
    }
};
