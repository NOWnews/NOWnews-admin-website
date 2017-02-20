module.exports = async (req, res, next) => {

    try {

        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/center/page.create.js');
        });

        return res.render('auth/center/page.create.html');
    }
    catch(err) {
        return next(err);
    }
};
