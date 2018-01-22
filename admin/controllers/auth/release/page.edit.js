import Debug from 'debug';
const debug = Debug('NOWnews-admin-website:controllers:auth:release:page.edit');

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

        departmentList = _.filter(departmentList,(department)=>{
            return department._id === '540000000000000000000002';
        });

        debug('releaseRules = %j', releaseRules);

        if(releaseRules){
            releaseRules = releaseRules.rules;
        }

        return res.render('auth/release/page.edit.html', {
            departmentList,
            roleList,
            releaseRules
        });

    } catch (err) {
        return next(err);
    }
};
