import Debug from 'debug';
import config from 'config';

const debug = Debug('NOWnews-admin-website: controllers:indexpage:page.create');

module.exports = async (req, res, next) => {

    try{
        let baseURL = config.get('apiServer');
        let userId = req.session.adminUser._id;
        let { data: indexpage } = await axios.get(baseURL+'/indexpage');
        debug('indexpageList = %j', indexpage );
        return res.render('indexpage/page.create.html', indexpage);
    }
    catch(err) {
        return next(err);
    }
};
