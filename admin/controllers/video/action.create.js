import concat from 'concat-stream';
import Debug from 'debug';
import fs from 'fs';
const debug = Debug('NOWnews-admin-website: controllers:video:action.create');

module.exports = async (req, res, next) => {

    try {
        let { _id: userId } = req.session.adminUser;

        let { url, title, desc, Tags } = req.body;
        let data = req.body;

        debug('req.body = %j', req.body);

        data.CreatedBy = userId;
        data.type = ["NEWS"];

        if (!Tags) {
            delete data.Tags;
        }

        let { data: video } = await axios.post('/videos', data);

        debug('video = %j', video);

        return res.json( video );
    }
    catch(err) {
        return next(err);
    }
};
