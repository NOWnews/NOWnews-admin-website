import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:video:page.create');

module.exports = async (req, res, next) => {

    try {
        return res.render('video/page.create.html');
    }
    catch(err) {
        return next(err);
    }
};
