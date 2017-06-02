import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:image:page.list');

module.exports = async (req, res, next) => {

    try {
        return res.render('image/page.list.html');
    }
    catch(err) {
        return next(err);
    }
};
