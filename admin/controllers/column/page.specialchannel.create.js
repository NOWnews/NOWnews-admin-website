import Debug from 'debug';

const debug = Debug('NOWnews-admin-website: controllers:column:specialchannel:page.create');

module.exports = async (req, res, next) => {

    try {
        let { data: menus } = await axios.get('/menus?template=SPECIALCHANNEL');
        return res.render('column/page.specialchannel.create.html', {
        	menus
        });
    }
    catch(err) {
        return next(err);
    }
};
