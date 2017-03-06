import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:image:action.clone');

module.exports = async (req, res, next) => {
    try {

        console.log(req.body);

        let { data: newImage } = await axios.post('/images/clone', {
            id: req.params.id,
            desc: req.body.desc,
            CreatedBy: req.session.adminUser._id
        });

        debug('newImage = %j', newImage);

        return res.json(newImage);

    } catch (err) {
        return next(err);
    }
}
