import concat from 'concat-stream';
import Debug from 'debug';
import fs from 'fs';
import FormData from 'form-data';

const debug = Debug('NOWnews-admin-website: controllers:image:action.upload');

module.exports = async (req, res, next) => {

    try {
        let { _id: userId } = req.session.adminUser;
        // 檔案路徑更名
        let { originalname, path } = req.file;
        let newPath = `uploads/${originalname}`;
        fs.renameSync(path, newPath);

        //取得 FormData 和 Headers
        let { formData, headers } = await new Promise((resolve) => {
            let { title, desc, type, isDeliver, isWatermark, keyword } = req.body;
            let fd = new FormData();
            if (isWatermark === 'true') {
                fd.append('isWatermark', isWatermark);
            }
            fd.append('title', title);
            fd.append('desc', desc);
            fd.append('keyword', keyword);
            fd.append('type', type);
            fd.append('isDeliver', isDeliver);
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

        return res.json(newImage);

    }
    catch (err) {
        return next(err);
    }
}
