
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:page:topic.create');

module.exports = async (req, res, next) => {

    try {

        return res.render('topic/page.create.html');
    }
    catch(err) {
        return next(err);
    }
};
