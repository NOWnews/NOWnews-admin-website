import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:image:page.create');

module.exports = async (req, res, next) => {

    try {
        return res.render('image/page.create.html');
    }
    catch(err) {
        return next(err);
    }
};
