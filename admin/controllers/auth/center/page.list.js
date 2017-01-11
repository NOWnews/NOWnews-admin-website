import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:center:page.list');

module.exports = async (req, res, next) => {

    try {

        let { data: centerList } = await axios.get('/centers');

        debug('centerList = %j', centerList);

        return res.render('auth/center/page.list.html', {
            centerList,
        });

    } catch(err) {
        return next(err);
    }
};
