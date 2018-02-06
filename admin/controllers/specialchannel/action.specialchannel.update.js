import Debug from 'debug';
import config from 'config';

const debug = Debug('NOWnews-admin-website: controllers:specialchannel:action.update');

module.exports = async (req, res, next) => {

    try {
        let { specialchannelId } = req.params;
        let userId = req.session.adminUser._id;
        let {title, MainPhoto, newsList} = req.body;
        debug('req.body = %j', req.body);
        newsList = _.isArray(newsList)? newsList : [newsList];

        //依照時間從新到舊排序  @leomax 
        newsList.sort(function(a,b){
            return a < b;
        });

        let data = {
            title,
            MainPhoto,
            newsList,
            UpdatedBy: userId
        };

        let { data: specialchannel } = await axios.put(`/specialchannels/${specialchannelId}`, data);

        debug('updatedSpecialchannel = %j', specialchannel);

        return res.redirect(`/specialchannel/${specialchannelId}`);
    }
    catch(err) {
        return next(err);
    }
};
