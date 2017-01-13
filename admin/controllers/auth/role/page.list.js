import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:role:page.list');

module.exports = async (req, res, next) => {

    try {

        // let { data: roleList } = await axios.get('/roles');

        let roleList = []

        debug('roleList = %j', roleList);

        return res.render('auth/role/page.list.html', {
            roleList,
        });
    }
    catch(err) {
        return next(err);
    }
};
