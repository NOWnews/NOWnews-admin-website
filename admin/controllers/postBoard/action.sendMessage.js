import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:postBoard:action.sendMessage');

module.exports = async (req, res, next) => {

    try {

        let { id } = req.params;

        let { message, content } = req.body;
        let UpdatedBy = req.session.adminUser._id;

        let { data: postBoard } = await axios.put(`/postBoard/${id}`, { message, content, UpdatedBy });

        debug('postBoard = %j', postBoard);

        return res.redirect('/postBoard');

    } catch(err) {
        return next(err);
    }

};
