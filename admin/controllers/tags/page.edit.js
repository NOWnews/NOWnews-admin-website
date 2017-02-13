import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:tags:page.edit');

module.exports = async (req, res, next) => {

    try {

        let { tagId } = req.params;

        let { data: tags } = await axios.get(`/tags/${tagId}`);

        debug('tags = %j', tags);

        return res.render('tags/page.edit.html', {
            tags
        });
    }
    catch(err) {
        return next(err);
    }
};
