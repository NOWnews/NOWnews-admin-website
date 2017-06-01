import Debug from 'debug';
const debug = Debug('NOWnews-admin-website: controllers:video:page.demo');

module.exports = async (req, res, next) => {

    let videoHtml = (url) => {
        return '<video height="400" width="480" controls><source src="' + url + '" type="video/mp4"></video>';
    };
    let ytHtml = (id) => {
        return '<iframe src="https://www.youtube.com/embed/' + id + '?ecver=2" height="400" width="480" frameborder="0" allowfullscreen></iframe>';
    };
    let fbHtml = (id) => {
        return '<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fsunnyhundalorg%2Fvideos%2F' + id + '%2F&show_text=0" height="400" width="480" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>';
    };
    let IgHtml = (id) => {
        return '<blockquote class="instagram-media" data-instgrm-version="7"><p><a href="https://www.instagram.com/p/' + id + '" target="_blank"></a></p></blockquote><script async defer src="//platform.instagram.com/en_US/embeds.js"></script>';
    };
    let fbVId = (url) => {
        let exp = /^http(?:s?):\/\/(?:www\.|web\.|m\.)?facebook\.com\/([A-z0-9\.]+)\/videos(?:\/[0-9A-z].+)?\/(\d+)(?:.+)?$/;
        return (url.match(exp)) ? RegExp.$2 : false;
    };
    let ytVid = (url) => {
        let exp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (url.match(exp)) ? RegExp.$1 : false;
    };

    try {
    	let { videoId } = req.params;
        let { data: videos } = await axios.get(`/videos/${videoId}`);

        // 把影片變成 html
    	if (videos.videoFrom === 'INTERNAL') {
    		videos.html = videoHtml(videos.url);
    	} else {
    		videos.html = fbVId(videos.url)? fbHtml(fbVId(videos.url)) : videos.html;
    		videos.html = ytVid(videos.url)? ytHtml(ytVid(videos.url)) : videos.html;
    	}

        return res.render('video/page.demo.html', {
            videos
        });
    }
    catch(err) {
        return next(err);
    }
};
