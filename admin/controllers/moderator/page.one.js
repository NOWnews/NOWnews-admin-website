import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:moderator:page.one');

import moment from 'moment-timezone';
import _ from 'lodash';

module.exports = async (req, res, next) => {

    try {

        let { data: moderator} = await axios.get(`/moderator/512000000000000000000001`);

        debug('moderator = %j', moderator);

        let daysInMonth = moment.tz('Asia/Taipei').daysInMonth();
        let months = moment.months();
        let year = moment.tz('Asia/Taipei').toObject().years;
        let years = [ year - 1, year, year + 1 ]

        let schedule = [];
        _.forIn(moderator.schedule, function(value, key) {
            let index = key.replace('day', '');
            if (index > daysInMonth){
                return;
            }
            schedule[index - 1] = value;
        });

        moderator.schedule = schedule;

        let data = {
            years,
            months,
            daysInMonth,
            moderator
        };

        // return res.json({moderator});
        return res.render('moderator/page.one.html', data);

    }
    catch(err) {
        return next(err);
    }
};
