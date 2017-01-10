module.exports = async (req, res, next) => {

    try {

        let result = await new Promise((resolve, reject) => {
            return resolve('controllers/auth/role/page.create.js');
        });

        let defaultPolicies = [{
            "_id": "選單",
            "policies": [{
                "_id": "510000000000000000000003",
                "group": "選單",
                "desc": "",
                "type": "ADMIN",
                "method": "get",
                "path": "/menu"
            }]
        }, {
            "_id": "新聞",
            "policies": [{
                "_id": "510000000000000000000002",
                "group": "新聞",
                "desc": "",
                "type": "ADMIN",
                "method": "post",
                "path": "/user"
            }, {
                "_id": "510000000000000000000001",
                "group": "新聞",
                "desc": "",
                "type": "ADMIN",
                "method": "get",
                "path": "/user"
            }]
        }];
        console.log(result);
        return res.render('auth/role/page.create.html', {
            defaultPolicies,
        });
    } catch (err) {
        return next(err);
    }
};
