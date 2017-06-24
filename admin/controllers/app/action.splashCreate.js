import Debug from 'debug';
const debug = Debug('NOWnews-admin-website:controllers:app:action.splashCreate');
import concat from 'concat-stream';
import fs from 'fs';
import moment from 'moment-timezone';
import FormData from 'form-data';

module.exports = async (req, res, next) => {
    try{

        let { _id: userId } = req.session.adminUser;

        // 檔案路徑更名
        let { originalname, path } = req.file;
        let newPath = `uploads/${originalname}`;
        fs.renameSync(path, newPath);

        //取得 FormData 和 Headers
        let { formData, headers } = await new Promise((resolve) => {
            let fd = new FormData();
            fd.append('title', `app首圖-${moment.tz('Asia/Taipei').format('YYYYMMDDHHmmss')}`);
            fd.append('desc', `app首圖-${moment.tz('Asia/Taipei').format('YYYYMMDDHHmmss')}`);
            fd.append('type', 'SPLASH');
            fd.append('isDeliver', 'false');
            fd.append('CreatedBy', userId);
            fd.append('image', fs.createReadStream(newPath));
            fd.pipe(concat({ encoding: 'buffer' }, formData => resolve({ formData, headers: fd.getHeaders() })));
        });

        // 圖片上傳
        let { data: newImage } = await axios.post('/images/upload', formData, { headers });
        debug('newImage = %j', newImage);

        // 刪掉檔案
        await new Promise((resolve, reject) => {
            fs.exists(newPath, (isExists) => {
                if (!isExists) {
                    return resolve();
                }

                fs.unlink(newPath, (err, result) => {
                    if(err) {
                        return reject(err);
                    }
                    return resolve(result);
                });
            });
        });

        let options = {
            device: req.body.device,
            imageId: newImage._id,
            CreatedBy: userId
        };

        let { data: newSplash } = await axios.post('/app/splash', options);
        debug('new splash = %j', newSplash);

        return res.redirect('/app/splash');
    }
    catch(err) {
        return next(err);
    }
};