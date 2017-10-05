import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:column:specialchannel:page.edit');

module.exports = async (req, res, next) => {

    try {

        let { columnId } = req.params;

        let { data: menus } = await axios.get('/menus?template=SPECIALCHANNEL&sort=weight');
        
        let { data: column } = await axios.get(`/column/specialchannels/${columnId}`);

        debug('column = %j', column);

        return res.render('column/page.specialchannel.edit.html', {
            menus,
            column

        });
    } catch(err) {
        return next(err);
    }
};
