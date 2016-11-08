/*
 * 這個 middleware 是因為避免手機版，透過手機的切還桌面版功能時多了一個斜線(//)
 */

module.exports = (app) => {

    return (req, res, next) => {
        // 尋找有兩個斜線的情況 (//)
        let matches = req.path.match(/\/\//);

        // 移除多餘的 /
        if(matches !== null && matches.index === 0) {
            let splitArray = matches.input.split('//');
            return res.redirect(`/${splitArray[1]}`);
        }

        return next();
    };
};
