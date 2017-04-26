
module.exports = function(app) {

    app.use(function(err, req, res, next) {
        let { data, status } = err.response ? err.response : err;

        if (typeof data === 'string'){
            data = { statusCode: status, message: data };
        }

        let errObject = {
            ...data, //include meesage & status code
            stack: err.stack.split('\n')
        };

        console.log('-------------- ERROR --------------');
        console.log(errObject);
        console.log('-------------- ERROR --------------');

        res.status(errObject.statusCode || 500);
        res.locals.errObject = errObject;

        return res.render('error/error.html');
    });

    return function(req, res, next) {
        return next();
    };
};
