import Debug from 'debug';
import _ from 'lodash';
import { NEWS_TYPES, NEWS_STATUS } from '../../util/constants';

const debug = Debug('NOWnews-admin-website: controllers:news:page.news.compare');

module.exports = async (req, res, next) => {

    try {

        let { beforeLogId, afterLogId } = req.query;

        let url = `/newslog/compare?beforeLogId=${beforeLogId}&afterLogId=${afterLogId}`;

        let { data: { after, before } } = await axios.get(url);

        // 將 ArrayObject 轉成只有名字的字串 (aa,bb,cc)
        function generateArrayString (target, columnName) {

            let values = _.map(target[columnName], function(value) {
                return value.name;
            });
            target[columnName] = null;
            target[`${columnName}String`] = values.join(',');
        }

        generateArrayString(before, 'Tags');
        generateArrayString(after, 'Tags');
        generateArrayString(before, 'Menus');
        generateArrayString(after, 'Menus');


        let result = {
            after,
            before,
            NEWS_TYPES,
            NEWS_STATUS,
        }

        debug('result = %j', result);

        return res.render('news/page.news.compare.html', result);
    }
    catch(err) {
        return next(err);
    }
};
