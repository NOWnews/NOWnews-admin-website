import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:statistics:page.department');

module.exports = async (req, res, next) => {

    try {

        let url = `statistics/departments/${req.params.id}`;
        let { data: department } = await axios.get(url);

        debug('statisticsDepartment = %j', department);

        return res.render('statistics/page.department.html', {
            department
        });

    } catch(err) {
        return next(err);
    }
};
