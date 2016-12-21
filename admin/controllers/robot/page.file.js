import path from 'path';
const resolve = file => path.resolve(__dirname, file);

module.exports = async (req, res, next) => {
    return res.sendFile(resolve('./robots.txt'));
}
