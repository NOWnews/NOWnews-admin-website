import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:menu:page.create');

module.exports = async (req, res, next) => {

    try {

        return res.render('menu/page.create.html');
    }
    catch(err) {
        return next(err);
    }
};
