
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:specialchannel:page.specialchannel.create');

module.exports = async (req, res, next) => {

    try {
        let checkPath = '/specialchannel/create';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);

        return res.render('specialchannel/page.create.html');
    }
    catch(err) {
        return next(err);
    }
};
