module.exports = async (req, res, next) => {

    try {

        let { data: defaultPolicies } = await axios.get('/policies/group');
        let { data: roleList } = await axios.get('/roles?limit=50');

        return res.render('auth/role/page.create.html', {
            defaultPolicies,
            roleList,
        });

    } catch (err) {
        return next(err);
    }
}
