module.exports = async (req, res, next) => {

    try {
        let checkPath = '/auth/department';
        await axios.get(`/policies/check?path=${checkPath}&roleId=${req.session.adminUser.Role._id}`);

        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/department/page.create.js');
        });

        return res.render('auth/department/page.create.html');
    }
    catch(err) {
        return next(err);
    }
};
