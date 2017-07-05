import Debug from 'debug';
import config from 'config';

const debug = Debug('NOWnews-admin-website: controllers:indexpage:page.create');

module.exports = async (req, res, next) => {

    try{
        let checkPath = '/indexpage/create';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);

        let userId = req.session.adminUser._id;

        let results = await Promise.all([
            axios.get('/indexpage'),
            axios.get('/news?limit=20&status=RELEASE&isScheduled=false'),
            axios.get('/specialtopics?limit=20'),
            axios.get('/specialchannels?limit=20'),
            axios.get('/news?limit=20&status=RELEASE&type=VIDEO&isScheduled=false')
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
