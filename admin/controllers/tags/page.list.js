import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:tags:page.list');

module.exports = async (req, res, next) => {

    try{
        let userId = req.session.adminUser._id;
        let { data: {tags, pageData} } = await axios.get('/tags');

        debug('tagsList = %j', tags );

        return res.render('tags/page.list.html', {
            tags
        });
    }
    catch(err) {
        return next(err);
    }
};