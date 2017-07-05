
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:page:topic.create');

module.exports = async (req, res, next) => {

    try {
        let checkPath = '/topic/create';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);

        return res.render('topic/page.create.html');
    }
    catch(err) {
        return next(err);
    }
};
