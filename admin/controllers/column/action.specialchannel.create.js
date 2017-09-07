import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:column:specialchannel:action.create');

module.exports = async (req, res, next) => {

    try {

        const userId = req.session.adminUser._id;
        let data = req.body;
        data.CreatedBy = userId;
        let { data: menu } = await axios.post('/column/specialchannels', data);

        debug('createdMenu = %j', menu);

        return res.redirect('/column/specialchannel');

    }
    catch(err) {
        return next(err);
    }
};
