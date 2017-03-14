import concat from 'concat-stream';
import Debug from 'debug';
import fs from 'fs';
const debug = Debug('NOWnews-admin-website: controllers:video:action.update');

module.exports = async (req, res, next) => {

    try {
        let { _id: userId } = req.session.adminUser;

        let { title, desc } = req.body;
        let updateData = {title, desc};

        updateData.UpdatedBy = userId;

        debug('updateData = %j', updateData);

        let { data: video } = await axios.put(`/videos/${req.params.id}`, updateData);

        debug('video = %j', video);

        return res.json( video );
    }
    catch(err) {
        return next(err);
    }
};
