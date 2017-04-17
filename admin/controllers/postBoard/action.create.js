import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:postBoard:action.create');

module.exports = async (req, res, next) => {

    try {

        let { content } = req.body;
        let CreatedBy = req.session.adminUser._id;

        let { data: postBoard } = await axios.post('/postBoard', { content, CreatedBy });

        debug('postBoard = %j', postBoard);

        return res.redirect('/postBoard');

    } catch(err) {
        return next(err);
    }
};
