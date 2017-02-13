import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:tags:action.update');

module.exports = async (req, res, next) => {

    try {

        let { tagId } = req.params;
        let userId = req.session.adminUser._id;
        let data = req.body;

        data.lastUpdatedBy = userId;

        debug('req.body = %j', data);

        let { data: tags } = await axios.put(`/tags/${tagId}`, data);

        debug('updatedTags = %j', tags);

        return res.redirect(`/tags/${tagsId}`);
    }
    catch(err) {
        return next(err);
    }
};
