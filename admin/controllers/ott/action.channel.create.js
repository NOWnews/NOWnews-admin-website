import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:ott:channel.action.create');

module.exports = async (req, res, next) => {

    try {

        let userId = req.session.adminUser._id;
        let data = req.body;
        data.providerId = data.categoryId.split('|')[0];
        data.categoryId = data.categoryId.split('|')[1];

        data.CreatedBy = userId;

        let { data: createChannel } = await axios.post('/ott/channels', data);

        return res.redirect('/ott/channels/list');

    }
    catch(err) {
        return next(err);
    }
};
