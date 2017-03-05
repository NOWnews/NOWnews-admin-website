import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:action.logout');

module.exports = async (req, res, next) => {

    try {

        debug('req.session.adminUser = %j', req.session.adminUser);

        await axios.post('/users/logout', {
            userId: req.session.adminUser.id,
        });

        req.session = null;

        return res.redirect('/auth/login');

    } catch(err) {
        return next(err);
    }

};
