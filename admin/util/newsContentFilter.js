/*
# 用來過濾新聞內容HTML
**/
import cheerio from 'cheerio';
import Debug from 'debug';
import qs from 'querystring';
import { URL } from 'url';
const debug = Debug('NOWnews-admin-website: util: newsContentFilter');

module.exports = (content) =>{

    let $ = cheerio.load( content, { decodeEntities: false } );
    $('iframe').filter((i, el) => {
        if($(el).attr('src').startsWith('http://m.mlb.com/shared/video/embed/embed.html?')){
            let src = $(el).attr('src');
            let myurl = new URL(src);
            let qsObj = qs.parse(myurl.search.substr(1));
            let { content_id, topic_id, property, width, height } = qsObj;
            let newSrc = `https://securea.mlb.com/shared/video/embed/embed.html?content_id=${content_id}&topic_id=${topic_id}&property=${property}&width=${ width || '400' }&height=${ height || '224' }`;
            $(el).attr('src',newSrc);
        }
    });
    content = $.html();
    return content;

};
