import Debug from 'debug';
import config from 'config';

const debug = Debug('NOWnews-admin-website: controllers:indexpage:page.create');

module.exports = async (req, res, next) => {

    try{
        let baseURL = config.get('apiServer');
        let userId = req.session.adminUser._id;

        let results = await Promise.all([
            axios.get(baseURL+'/indexpage'),
            axios.get(baseURL+'/news?limit=20&status=RELEASE&type=NEWS'),
            axios.get(baseURL+'/specialtopics?limit=20'),
            axios.get(baseURL+'/specialchannels?limit=20'),
            axios.get(baseURL+'/news?limit=20&status=RELEASE&type=VIDEO')
        ]);

        let indexpage = results[0].data;
        let predata = results[1].data;
        let pretopic = results[2].data;
        let prespecialchannel = results[3].data;
        let prevideo = results[4].data;

        debug('indexpageList = %j', indexpage );
        return res.render('indexpage/page.create.html', {
            indexpage,
            predata,
            pretopic,
            prespecialchannel,
            prevideo
        });
    }
    catch(err) {
        return next(err);
    }
};
