import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:image:action.update');

module.exports = async (req, res, next) => {
    try {

        let { data: updatedImage } = await axios.put(`/images/${req.params.id}`, {
            desc: req.body.desc,
            UpdatedBy: req.session.adminUser._id
        });

        debug('updatedImage = %j', updatedImage);

        return res.json(updatedImage);

    } catch (err) {
        return next(err);
    }
}
