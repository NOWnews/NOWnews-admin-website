import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:video:page.create');

module.exports = async (req, res, next) => {

    try {
        let checkPath = '/video/create';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);
        return res.render('video/page.create.html');
    }
    catch(err) {
        return next(err);
    }
};
