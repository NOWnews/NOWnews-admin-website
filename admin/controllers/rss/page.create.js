import path from 'path';
import _ from 'lodash';
import co from 'co';
import redis from '../../../redis'
module.exports = async (req, res, next) => {

    
    let mainCategories = await redis.getMainCategoriesRedis();
    
    let formData = {
            action: '/rss/create',
            method: 'post',
            formColumn: [{
                title: '名稱',
                name: 'name',
                type: 'text'
            },
            {
                title: '選擇語系',
                name: 'simplifiedChinese',
                data: [{
                    title: '繁體',
                    value: 'false',
                    attr: 'selected'
                },{
                    title: '簡體',
                    value: 'true'
                }],
                type: 'select'
            },
            {
                title: '分類',
                name: 'catogry',
                data: mainCategories,
                type: 'checkBox'
            },
            {
                title: '有效時間',
                name: 'dateRange',
                type: 'dateRange'
            },
            {
                title: '選擇版型',
                name: 'template',
                data: [{
                    title: '基本版型',
                    value: 'DEFAULT',
                    attr: 'selected'
                },{
                    title: 'Yahoo 版型',
                    value: 'YAHOO'
                },{
                    title: 'Facebook InstantArticle 版型',
                    value: 'FACEBOOK'
                },{
                    title: '台灣大哥大 版型',
                    value: 'TAIWANMOBILE'
                },{
                    title: '社群用 版型',
                    value: 'SOCIAL'
                }],
                type: 'select'
            },
            {
                title: '限定的IP',
                name: 'confirmIP',
                type: 'text'
            },
            {
                title: '聯絡人資料 ( ex. 吳OO - 09xx123456 )',
                name: 'contactPerson',
                type: 'text'
            }]
        };

    return res.render('rss/page.create.html', {
            formData
        });

          
    
};
