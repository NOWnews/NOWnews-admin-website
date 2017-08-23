import concat from 'concat-stream';
import Debug from 'debug';
import fs from 'fs';
import FormData from 'form-data';
const debug = Debug('NOWnews-admin-website: controllers:video:action.upload');

module.exports = async (req, res, next) => {
    try {
        // 影片檔案若太大等太久連線會斷 延長斷線時間至30分鐘
        req.socket.setTimeout(30 * 60 * 1000);
        req.socket.addListener('timeout', function() {
          req.socket.destroy();
        });

        let { _id: userId } = req.session.adminUser;

        let { originalname, path } = req.file;
        let newPath = `uploads/${originalname}`;
        fs.renameSync(path, newPath);

        debug('req.body = %j', req.body);

        //取得 FormData 和 Headers
        let { formData, headers } = await new Promise((resolve) => {
            let { title, desc, type, isDeliver } = req.body;
            let fd = new FormData();
            fd.append('title', title);
            fd.append('desc', desc);
            fd.append('type', type);
            fd.append('isDeliver', isDeliver);
            fd.append('CreatedBy', userId);
            fd.append('video', fs.createReadStream(newPath));
            fd.pipe(concat(
                { encoding: 'buffer' },
                formData => resolve({ formData, headers: fd.getHeaders() })
            ));
        });

        let { data: video } = await axios.post('/videos/upload', formData, {
            headers,
            timeout: 20000000
        });

        debug('video = %j', video);

        // 刪掉檔案
        await new Promise((resolve, reject) => {
            fs.unlink(newPath, (err, result) => {
                if(err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });

        return res.json( video );
    }
    catch(err) {
        console.error('err....',err);
        return next(err);
    }
};
