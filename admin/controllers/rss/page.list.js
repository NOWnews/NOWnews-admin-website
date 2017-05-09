
const _ = require('lodash');
const co = require('co');
const models = require('../../../models');
const libs = require('../../../libs');


module.exports = async (req, res, next) => {
     let rssList = await models.rss.find()
            .where('trashed').equals(false)
            .lean()
            .execAsync();

        _.forEach(rssList, (rss)=>{
            let startDate = libs.dateFormat(rss.startDate);
            let endDate = libs.dateFormat(rss.endDate);

            rss.dateRange = `${startDate} - ${endDate}`;
            // 列表時將 channelId 改成大寫
            rss.channelId = rss.channelId.toUpperCase();

            //確認是否過期
            rss.isExpired = libs.checkDateRange(rss.startDate, rss.endDate);
        });

        return res.render('rss/page.list.html', {
            rssList
        });

};
