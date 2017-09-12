import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:image:action.realRemove');

module.exports = async (req, res, next) => {

    try {

        let url = `/images/${req.params.id}/realRemove`;
        let UpdatedBy = req.session.adminUser._id;
        let data = {UpdatedBy};

        let { data: image } = await axios.delete(url, { data });

        debug('removedImage = %j', image);

        return res.json({ image });
    } catch(err) {
        return next(err);
    }
};
