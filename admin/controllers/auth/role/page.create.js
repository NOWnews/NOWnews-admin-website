module.exports = async (req, res, next) => {

    try {

        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/role/page.create.js');
        });

        console.log(result);
        return res.render('auth/role/page.create.html');
    }
    catch(err) {
        return next(err);
    }
};
