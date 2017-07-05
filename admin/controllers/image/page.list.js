import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:image:page.list');

module.exports = async (req, res, next) => {

    try {
        let checkPath = '/image/list';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);
        return res.render('image/page.list.html');
    }
    catch(err) {
        return next(err);
    }
};
