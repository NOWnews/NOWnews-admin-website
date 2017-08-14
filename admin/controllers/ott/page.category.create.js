import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:ott:page.group.create');

module.exports = async (req, res, next) => {
    let { data: platform } = await axios.get('/ott/providers/');

    try {
        return res.render('ott/page.category.create.html',{
            platform
        });
    }
    catch(err) {
        return next(err);
    }
};
