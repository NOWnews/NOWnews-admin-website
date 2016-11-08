import fetch from 'node-fetch';

module.exports = function(url) {
    let fetchUrl = `${config.apiServer}/${url}`;

    // 如果 url 有中文字，建議 encode 會比較沒有問題
    fetchUrl = encodeURI(fetchUrl);

    return fetch(fetchUrl, {
            timeout: 10000,
            headers: {
                'X-NOWnews-API': 'NOWnewsTaiwanNumberOne'
            }
        })
        .then((res) => res.json())
        .then((json) => Promise.resolve(json));
};
