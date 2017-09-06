import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:moderator:page.one');

import moment from 'moment-timezone';
import _ from 'lodash';

module.exports = async (req, res, next) => {

    try {
        let { year, month, ...scheduleData } = req.body;
        let schedule = {};

        debug('req.body = %j', { year, month, ...scheduleData });

        month = parseInt(month);
        year = parseInt(year);

        let UpdatedBy = req.session.adminUser._id;
        _.forIn(scheduleData, function(value, key) {
            let scheduleKey = key.split('_').shift();
            let scheduleIndex = key.split('_').pop();
            schedule[scheduleKey] = schedule[scheduleKey] ? schedule[scheduleKey] :[];
            schedule[scheduleKey][scheduleIndex] = value;
        });

        let { data } = await axios.put('/moderator/512000000000000000000001', {
            year,
            month,
            schedule,
            UpdatedBy
        });

        req.session.moderator = data;

        debug('moderator = %j', data);

        return res.redirect('/moderator');
    }
    catch(err) {
        return next(err);
    }
};
