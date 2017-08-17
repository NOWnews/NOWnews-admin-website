import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:ott:channel.action.create');

module.exports = async (req, res, next) => {

    try {
        let userId = req.session.adminUser._id;
        let data = req.body;
        data.CreatedBy = userId;

        let { data: ottinfo } = await axios.post('/ott/providers', data);

        return res.redirect('/ott/providers/list');
    }
    catch(err) {
        return next(err);
    }
};
