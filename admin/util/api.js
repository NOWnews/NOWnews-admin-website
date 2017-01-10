import config from 'config';
import fetch from 'node-fetch';

module.exports = (url, options = {}) => {
    let apiServer = config.get('apiServer');
    let headers = config.get('headers');
    let timeout = 10000;
    let fetchUrl = `${apiServer}/${url}`;

    // 如果 url 有中文字，建議 encode 會比較沒有問題
    fetchUrl = encodeURI(fetchUrl);

    return fetch(fetchUrl, { headers, timeout, ...options })
        .then((res) => res.json())
        .then((json) => Promise.resolve(json));
};
