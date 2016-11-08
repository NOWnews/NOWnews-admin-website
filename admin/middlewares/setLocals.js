/*
 * 設定變數到 nunjucks
 */

module.exports = () => {

    return (req, res, next) => {

        res.locals.NODE_ENV = process.env.NODE_ENV;
        return next();
    };
};
