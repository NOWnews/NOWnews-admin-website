import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:column:specialchannel:page.list');

module.exports = async (req, res, next) => {

    try{
        let userId = req.session.adminUser._id;
        let { data: columns } = await axios.get('/column/specialchannels');

        let pageData = columns.pageData;

        debug('columnsList = %j', columns );

        return res.render('column/page.specialchannel.list.html', {
            columns,
            pageData
        });
    }
    catch(err) {
        return next(err);
    }
};