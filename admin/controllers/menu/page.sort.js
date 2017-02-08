import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:menu:page.sort');

module.exports = async (req, res, next) => {

    try {

        // let { data: { users: userList, pageData } } = await axios.get('/users');

        // // return res.json(userList);
        return res.render('menu/page.menu.create.html');
    }
    catch(err) {
        return next(err);
    }
};
