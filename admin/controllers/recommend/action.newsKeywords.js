import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:ott:recommend.action.newsKeywords');

module.exports = async (req, res, next) => {
    try {

        let data = req.body;

        let { data: recommendKeywords } = await axios.post( `/recommend/newskeywords`, data);

        return res.json(recommendKeywords);
    }
    catch(err) {
        return next(err);
    }
};
