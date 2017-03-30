import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:statistics:page.departmentlist');

module.exports = async (req, res, next) => {

    try{
        let query = req.query;
        let queryString = req._parsedUrl.query;
        console.log(queryString,'L8');
        let userId = req.session.adminUser._id;
        let { data: departmentsList } = await axios.get('/statistics/departments');

        let departments = departmentsList;
        debug('departmentsList = %j', departments );

        return res.render('statistics/page.departments.html', {
            departments
        });
    }
    catch(err) {
        return next(err);
    }
};

