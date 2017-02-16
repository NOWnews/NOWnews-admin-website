import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:tags:action.create');

module.exports = async (req, res, next) => {

    try {

        let userId = req.session.adminUser._id;
        let data = req.body;
        data.tags = _.isString(data.name) ?data.name.split(','): data.name;
        data.CreatedBy = userId;

        let { data: tags } = await axios.post('/tags', data);

        debug('createdTags = %j', tags);

        return res.redirect(`/tags`);

    }
    catch(err) {
        return next(err);
    }
};
