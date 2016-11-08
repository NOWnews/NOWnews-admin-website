import express from 'express';
let router = express.Router();

const debug = require('debug')('NOWmobile:controllers:about');

router.route('/about')
    .get((req, res, next) => {
        let timelines = [
            {
                date: '2008年4月',
                event: '併購原東森「ETtoday.com」更名為「NOWnews.com」。'
            }, {
                date: '2008年4月',
                event: 'NOWnews.com正式上線。'
            }, {
                date: '2008年12月',
                event: '推出「WEnews」全民新聞平台，結合全台公民記者，原生內容更上一層樓。'
            }, {
                date: '2009年10月',
                event: '推出「美人幫」女性資訊平台，創造單月200萬使用者，流量高達600萬。'
            }, {
                date: '2013年1月',
                event: '跨足電子商務領域並成立電商部門推出NOWshopping購物網站與省錢＄導購大聯盟。'
            }, {
                date: '2013年7月',
                event: '發行紙本《今日新聞報》，於各大捷運站發行，8月起更與遠東航空合作供機上乘客閱讀。'
            }, {
                date: '2013年12月',
                event: 'NDMT 於美國正式掛牌上市。',
            }, {
                date: '2014年3月',
                event: '將主機群從So-net及AWS升級至中華電信國際高速骨幹機房資料中心。'
            }, {
                date: '2015年3月',
                event: '公司位址（原於瑞光路550號）搬遷至堤頂大道。'
            }
        ];

        return res.render('about/about', { timelines });

    });

module.exports = router;
