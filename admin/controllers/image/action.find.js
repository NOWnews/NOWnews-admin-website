import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:image:action.find');

module.exports = async (req, res, next) => {

    try {

        let query = req.query;

        let queryString = req._parsedUrl.query;

        if (queryString === null) {
            queryString = "";
        }


        let { data: imageList } = await axios.get('/images');

        // let { data: { users: userList, pageData } } = await axios.get(`/users?${queryString}`);

        debug('imageList = %j', imageList);

        return res.json({
            imageList,
            // pageData,
        });
    }
    catch(err) {
        return next(err);
    }
};
