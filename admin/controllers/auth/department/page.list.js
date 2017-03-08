import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:department:page.list');

module.exports = async (req, res, next) => {

    try {

        let { data: departmentList } = await axios.get('/departments');

        debug('departmentList = %j', departmentList);

        return res.render('auth/department/page.list.html', {
            departmentList,
        });

    } catch(err) {
        return next(err);
    }
};
