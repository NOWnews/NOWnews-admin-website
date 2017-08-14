import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:ott:page.channel.create');

module.exports = async (req, res, next) => {

    try {
        let { data: providerList } = await axios.get('ott/providers');

        return res.render('ott/page.channel.create.html', {
            providerList
        });

    }
    catch(err) {
        return next(err);
    }
};
