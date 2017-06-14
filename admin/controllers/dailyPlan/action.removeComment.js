import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:postBoard:action.removeMessage');

module.exports = async (req, res, next) => {

    try {

        let { id } = req.params;

        let { messageId } = req.body;
        let UpdatedBy = req.session.adminUser._id;

        let data = {messageId, UpdatedBy};

        debug('removedRemovedData = %j', data);

        let { data: removedMessage } = await axios.delete( `/postBoard/${id}/message`, { data } );

        debug('removedRemovedMessage = %j', removedMessage);

        return res.json({ removedMessage });

    } catch(err) {
        return next(err);
    }

};
