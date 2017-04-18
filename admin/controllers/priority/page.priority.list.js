import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:priority:page.list');

module.exports = async (req, res, next) => {

    try {

        // res.send(200);

        return res.render('priority/page.list.html', {
            // menus
        });

    } catch(err) {
        return next(err);
    }
};
