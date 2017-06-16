
module.exports = async (req, res, next) => {

    try{
        let result = await new Promise((resolve, reject) => {
            return resolve('Demo');
        });

        return res.render('member/page.list.html');
    }
    catch(err) {
        return next(err);
    }
};