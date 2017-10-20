import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:department:page.edit');

module.exports = async (req, res, next) => {

    try {
        let [
            { data: departmentList  },
            { data: roleList },
            { data: releaseRules }
        ] = await Promise.all([
            axios.get('/departments'),
            axios.get('/roles'),
            axios.get('/releaseRules')
        ]);

        let test = await axios.get('/releaseRules');
        departmentList = _.filter(departmentList,(department)=>{
            return department.name.indexOf("新聞部")>-1;
        });

        debug('releaseRules = %j', releaseRules);
        return res.render('auth/release/page.edit.html', {
            departmentList,
            roleList,
            releaseRules
        });

    } catch (err) {
        return next(err);
    }
};
