import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:statistics:page.users');

module.exports = async (req, res, next) => {

    try {

        let url = `statistics/users/${req.params.id}`;
        let { data: user } = await axios.get(url);

        debug('statisticsUser = %j', user);

        return res.render('statistics/page.users.html', {
            user
        });

    } catch(err) {
        return next(err);
    }
};
