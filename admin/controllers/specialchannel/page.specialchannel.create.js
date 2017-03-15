
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:specialchannel:action.specialchannel.create');

module.exports = async (req, res, next) => {

    try {

        return res.render('specialchannel/page.create.html');
    }
    catch(err) {
        return next(err);
    }
};
