import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:dailyPlan:action.comment.remove');

module.exports = async (req, res, next) => {

    try {
        let { id } = req.params;
        let { commentIndex } = req.body;
        let UpdatedBy = req.session.adminUser._id;
        let data = {UpdatedBy, commentIndex};

        let { data: removedComment } = await axios.delete(`/dailyPlan/${id}/comment`, { data });

        debug('removedComment = %j', removedComment);

        return res.json({ removedComment });

    } catch(err) {
        return next(err);
    }

};
