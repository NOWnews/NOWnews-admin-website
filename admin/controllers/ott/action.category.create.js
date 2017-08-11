import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:ott:category.action.create');

module.exports = async (req, res, next) => {

    try {



        let data = req.body;
        let userId = req.session.adminUser._id;

        data.CreatedBy = userId;
        let { data: categoryData } = await axios.post('/ott/categories', data);

        console.log(categoryData,"L16")

        debug('categoryData = %j', categoryData);

        return res.redirect('/ott/channels/list');

    }
    catch(err) {
        return next(err);
    }
};
