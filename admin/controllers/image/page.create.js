import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:image:page.create');

module.exports = async (req, res, next) => {

    try {
        let checkPath = '/image/create';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);
        return res.render('image/page.create.html');
    }
    catch(err) {
        return next(err);
    }
};
