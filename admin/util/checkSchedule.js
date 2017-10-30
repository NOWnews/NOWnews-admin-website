import moment from 'moment-timezone';
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: util:checkSchedule');

module.exports = (startedAt) =>{
    let now = moment.tz('Asia/Taipei');
    startedAt = moment.tz(startedAt, 'Asia/Taipei');

    if ( startedAt.isAfter(now) ){
        return true;
    }

    return false;
};
