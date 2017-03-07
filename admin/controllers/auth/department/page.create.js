module.exports = async (req, res, next) => {

    try {

        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/department/page.create.js');
        });

        return res.render('auth/department/page.create.html');
    }
    catch(err) {
        return next(err);
    }
};
