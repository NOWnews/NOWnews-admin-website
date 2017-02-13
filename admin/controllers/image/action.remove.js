import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:image:action.remove');

module.exports = async (req, res, next) => {

    try {

        let url = `/images/${req.params.id}`;

        let { data: image } = await axios.delete(url);

        debug('removedImage = %j', image);

        return res.json({ image });
    } catch(err) {
        return next(err);
    }
};
