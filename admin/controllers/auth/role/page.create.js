module.exports = async (req, res, next) => {

    try {

        let { data: defaultPolicies } = await axios.get('/policies/group');

        return res.render('auth/role/page.create.html', {
            defaultPolicies,
        });

    } catch (err) {
        return next(err);
    }
}
