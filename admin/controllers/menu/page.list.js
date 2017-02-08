import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:menu:page.list');

module.exports = async (req, res, next) => {

    try{
        let result = await new Promise((resolve, reject) => {
            return resolve('Demo');
        });

        console.log(result);
        return res.render('menu/page.list.html');
    }
    catch(err) {
        return next(err);
    }
};