import Debug from 'debug';
import config from 'config';

const debug = Debug('NOWnews-admin-website: controllers:indexpage:page.create');

module.exports = async (req, res, next) => {

    try{
        let baseURL = config.get('apiServer');
        let userId = req.session.adminUser._id;
        let { data: indexpage } = await axios.get(baseURL+'/indexpage');

        let { data: predata } = await axios.get(baseURL+'/news?limit=20&status=RELEASE&type=NEWS');
        let { data: pretopic } = await axios.get(baseURL+'/specialtopics?limit=20');
        let { data: prespecialchannel } = await axios.get(baseURL+'/specialchannels?limit=20');
        let { data: prevideo } = await axios.get(baseURL+'/news?limit=20&status=RELEASE&type=VIDEO');

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
