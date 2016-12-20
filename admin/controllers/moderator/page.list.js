
module.exports = async (req, res, next) => {

    try{
        let result = await new Promise((resolve, reject) => {
            return resolve('Demo');
        });

        console.log(result);
        return res.render('moderator/page.list.html');
    }
    catch(err) {
        return next(err);
    }
};