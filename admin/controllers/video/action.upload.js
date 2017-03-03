import concat from 'concat-stream';
import Debug from 'debug';
import fs from 'fs';
import FormData from 'form-data';
const debug = Debug('NOWnews-admin-website: controllers:video:action.upload');

module.exports = async (req, res, next) => {

    try {
        let { _id: userId } = req.session.adminUser;

        let { originalname, path } = req.file;
        let newPath = `uploads/${originalname}`;
        fs.renameSync(path, newPath);

        console.log('L19', originalname)
        console.log('L20', path)
        console.log('L21', newPath)
        console.log('L22', req.body)

        //取得 FormData 和 Headers
        let { formData, headers } = await new Promise((resolve) => {
            let { title, desc, type, isDeliver } = req.body;
            var fd = new FormData();
            fd.append('title', title);
            fd.append('desc', desc);
            fd.append('type', type);
            fd.append('isDeliver', isDeliver);
            fd.append('CreatedBy', userId);
            fd.append('image', fs.createReadStream(newPath));
            fd.pipe(concat(
                { encoding: 'buffer' },
                formData => resolve({ formData, headers: fd.getHeaders() })
            ));
        });
        return false;

        // 刪掉檔案
        // await new Promise((resolve, reject) => {
        //     fs.unlink(newPath, (err, result) => {
        //         if(err) {
        //             return reject(err);
        //         }
        //         return resolve(result);
        //     });
        // });

        // return res.json(newImage);

        // let { data: { video } } = await axios.post(`/video/upload`);

        // debug('video = %j', video);

        return res.json({ video });
    }
    catch(err) {
        return next(err);
    }
};
