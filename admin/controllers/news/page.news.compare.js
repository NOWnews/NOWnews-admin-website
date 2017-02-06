import Debug from 'debug';
import htmldiff from 'htmldiff/src/htmldiff.js';
const debug = Debug('NOWnews-admin-website: controllers:news:page.news.compare');

module.exports = async (req, res, next) => {

    try {

        let { beforeLogId, afterLogId } = req.query;

        // let url = `/newslog/compare?beforeLogId=${beforeLogId}&afterLogId=${afterLogId}`;

        // let { data: { before, after} } = await axios.get(url);

        // temp code
        let before = {
            _id: 1,
            title: 123,
            content: '<p>this is some text 要消失的</p><br/><ul><li>1</li><li>增加</li></span>',
        };

        let after = {
            _id: 2,
            title: 456,
            content: '<p>this is some 要增加的 text</p><br/><ul><li>增加</li></span>',
        };

        let content = htmldiff(before.content, after.content);

        let result = {
            before,
            after,
            content,
        }

        debug('result = %j', result);

        return res.render('news/page.news.compare.html', result);
    }
    catch(err) {
        return next(err);
    }
};
