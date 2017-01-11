import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:center:page.one');

module.exports = async (req, res, next) => {

    try {

        let { data: center } = await axios.get(`/centers/${req.params.id}`);

        debug('center = %j', center);

        return res.render('auth/center/page.one.html', {
            center,
        });

    } catch (err) {
        return next(err);
    }
};
