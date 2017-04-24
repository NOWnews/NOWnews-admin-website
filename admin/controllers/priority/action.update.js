import Debug from 'debug';
import Promise from 'bluebird';
const debug = Debug('NOWnews-admin-website: controllers:priority:action.update');

module.exports = async (req, res, next) => {

    try {

        let date = req.body;

        return res.redirect(req.originalUrl);

    } catch(err) {
        return next(err);
    }
};
