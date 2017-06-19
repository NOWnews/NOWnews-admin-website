
/*
# 用來過濾 HTML 的 Tag
input - 輸入的 HTML
allowed - 永許留下的 HTML Tag
**/
import moment from 'moment-timezone';
import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: util:checkSchedule');

module.exports = (startedAt) =>{
    if (moment() - moment(startedAt) < 0){
    	return true;
    }
    return false;
};
