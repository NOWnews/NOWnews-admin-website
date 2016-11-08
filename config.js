
module.exports = {

    /*
     * redis 資料
     */
    redis: {
        host: process.env.NODE_ENV === 'production' ? 'localhost' : 'localhost',
        expireSeconds: 3600
    },

    /*
     * api Server
     */
    apiServer: process.env.NODE_ENV === 'production' ? 'http://192.168.20.65:5000' : 'http://v3.api.nownews.com:5000',

};
