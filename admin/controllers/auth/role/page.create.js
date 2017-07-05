module.exports = async (req, res, next) => {

    try {
        let checkPath = '/auth/role';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);

        let { data: defaultPolicies } = await axios.get('/policies/group');

        return res.render('auth/role/page.create.html', {
            defaultPolicies,
        });

    } catch (err) {
        return next(err);
    }
}
