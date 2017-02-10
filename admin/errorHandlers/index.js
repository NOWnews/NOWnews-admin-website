
module.exports = function(app) {

    app.use(function(err, req, res, next) {
        let { data, status } = err.response ? err.response : err;

        if (typeof data === 'string') data = { statusCode: status, message: data };

        var errObject = {
            ...data, //include meesage & status code
            stack: err.stack.split('\n')
        };

        console.log('-------------- ERROR --------------');
        console.log(errObject);
        console.log('-------------- ERROR --------------');

        res.status(400);
        return res.json(errObject);
        // return res.send('系統忙碌中');
    });

    return function(req, res, next) {
        return next();
    };
};
