module.exports = async (req, res, next) => {

    try {

        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/user/page.create.js');
        });

        console.log(result);
        return res.render('auth/user/page.create.html');
    }
    catch(err) {
        return next(err);
    }
};
