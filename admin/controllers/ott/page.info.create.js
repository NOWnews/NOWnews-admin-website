import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:ott:page.channel.create');

module.exports = async (req, res, next) => {

    try {

         return res.render('ott/page.info.html');

    }
    catch(err) {
        return next(err);
    }
};
