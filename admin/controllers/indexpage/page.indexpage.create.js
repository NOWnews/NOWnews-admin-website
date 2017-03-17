import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:indexpage:page.create');

module.exports = async (req, res, next) => {

    try{
        let userId = req.session.adminUser._id;
        let { data: indexpage } = await axios.get('/indexpage');
        debug('indexpageList = %j', indexpage );
        return res.render('indexpage/page.create.html', indexpage);
    }
    catch(err) {
        return next(err);
    }
};
