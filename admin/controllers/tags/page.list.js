import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:tags:page.list');

module.exports = async (req, res, next) => {

    try{
        let queryString = req._parsedUrl.query? "?" + req._parsedUrl.query: "";

        let userId = req.session.adminUser._id;
        let { data: {tags, pageData} } = await axios.get(`/tags${queryString}`);

        debug('tagsList = %j', tags );
        debug('pageData = %j', pageData );

        return res.render('tags/page.list.html', {
            tags,
            pageData
        });
    }
    catch(err) {
        return next(err);
    }
};
