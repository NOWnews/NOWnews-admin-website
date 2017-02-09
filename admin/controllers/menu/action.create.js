import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:menu:action.create');

module.exports = async (req, res, next) => {

    try {

        let userId = req.session.adminUser._id;
        let data = req.body;

        data.isExternal = data.isExternal ? true: false;
        data.createdBy = userId;

        // 暫時設定永遠開啟
        data.isPermanented = true;
        // 建立的權重都為 0
        data.weight = 0;

        console.log(data)
        // let { data: menu } = await axios.post('/menu', data);

        // debug('createdMenu = %j', menu);

        return res.redirect(`/menu/${menu._id}`);

    }
    catch(err) {
        return next(err);
    }
};
