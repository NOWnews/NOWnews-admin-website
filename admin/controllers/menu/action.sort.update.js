import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:menu:action.sort.update');

module.exports = async (req, res, next) => {

    try {
        let userId = req.session.adminUser._id;
        let data = req.body;

        debug('updatedSort = %j', data);
        let { data: result } = await axios.put('menus/sort', { menus: data});

        return res.json({
            result
        });
    }
    catch(err) {
        return next(err);
    }
};
