import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:auth:department:action.remove');

module.exports = async (req, res, next) => {

    try {

        let data = {
            UpdatedBy: req.session.adminUser._id,
        };

        let url = `/departments/${req.params.id}`;

        let { data: department } = await axios.delete(url, { data });

        debug('removedDepartment = %j', department);

        return res.json({ department });

    } catch(err) {
        return next(err);
    }
};
