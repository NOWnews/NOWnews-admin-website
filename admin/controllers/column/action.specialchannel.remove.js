import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:column:specialchannel:action.remove');

module.exports = async (req, res, next) => {

    try {
        let { columnId } = req.params;
        let UpdatedBy = req.session.adminUser._id;
        let data = {UpdatedBy};

        let { data: column } = await axios.delete( `/column/specialchannels/${columnId}`, { data });

        debug('removedColumn = %j', column);

        return res.json({ column });

    }
    catch(err) {
        return next(err);
    }
};
