import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:tags:page.create');

module.exports = async (req, res, next) => {

    try {

        return res.render('tags/page.create.html');
    }
    catch(err) {
        return next(err);
    }
};
