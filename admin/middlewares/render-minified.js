
import Minifier from 'html-minifier';

module.exports = (req, res, next) => {
    // XML做html minify會造成格式錯誤 所以/rss開頭的都跳過
    if(req.path.startsWith('/rss')){
        next();
        return;
    }
    res.oldRender = res.render;
    res.render = function(view, options) {
        this.oldRender(view, options, (err, html) => {
            if (err) { throw err; }
            html = Minifier.minify(html, {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeEmptyAttributes: true
            });
            res.send(html);
        });
    };
    next();
};
